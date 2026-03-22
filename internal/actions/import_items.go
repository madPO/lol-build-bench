package actions

import (
	"context"
	"encoding/json"
	"fmt"
	"import-cli/internal/data/clickhouse"
	"import-cli/internal/data/datadragon"
	"import-cli/internal/transformation"
	"time"

	cloudevents "github.com/cloudevents/sdk-go/v2"
	"github.com/google/uuid"
)

func ImportItems(ctx context.Context, repo *clickhouse.Repository, zip *datadragon.ZipReader, version string) (int, error) {
	rc, err := zip.OpenJSON("item.json")
	if err != nil {
		return 0, err
	}
	defer rc.Close()

	decoder := datadragon.GetDecoder(rc)

	// Stream until we find "data" key
	for {
		t, err := decoder.Token()
		if err != nil {
			return 0, fmt.Errorf("failed to parse item.json: %w", err)
		}
		if s, ok := t.(string); ok && s == "data" {
			break
		}
	}

	// Now we are at the start of the "data" map
	t, err := decoder.Token()
	if err != nil || t != json.Delim('{') {
		return 0, fmt.Errorf("expected '{' after 'data' key")
	}

	var events []cloudevents.Event
	for decoder.More() {
		// ID
		idToken, err := decoder.Token()
		if err != nil {
			return 0, err
		}
		id := idToken.(string)

		var raw datadragon.ItemData
		if err := decoder.Decode(&raw); err != nil {
			return 0, fmt.Errorf("failed to decode item entry %s: %w", id, err)
		}

		item := transformation.ToItemDomain(id, raw, version)

		// Create CloudEvent
		evt, err := transformation.NewItemEvent(item, uuid.New().String(), time.Now())
		if err != nil {
			return 0, fmt.Errorf("failed to create item event: %w", err)
		}

		events = append(events, evt)
	}

	// Read closing brace of data map
	if _, err := decoder.Token(); err != nil {
		return 0, fmt.Errorf("failed to read closing brace of data map: %w", err)
	}

	// Read closing brace of root object
	if _, err := decoder.Token(); err != nil {
		// It's possible we hit EOF or other fields, but for now just ensure we don't error out on valid end
	}

	if err := repo.SaveItems(ctx, events); err != nil {
		return 0, fmt.Errorf("failed to save items: %w", err)
	}

	return len(events), nil
}
