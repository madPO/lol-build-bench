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

func ImportRunes(ctx context.Context, repo *clickhouse.Repository, zip *datadragon.ZipReader, version string) (int, error) {
	rc, err := zip.OpenJSON("runesReforged.json")
	if err != nil {
		return 0, err
	}
	defer rc.Close()

	decoder := datadragon.GetDecoder(rc)

	// Top level is an array
	t, err := decoder.Token()
	if err != nil || t != json.Delim('[') {
		return 0, fmt.Errorf("expected '[' at start of runesReforged.json")
	}

	var events []cloudevents.Event
	for decoder.More() {
		var tree datadragon.RuneTree
		if err := decoder.Decode(&tree); err != nil {
			return 0, fmt.Errorf("failed to decode rune tree: %w", err)
		}

		for _, slot := range tree.Slots {
			for _, r := range slot.Runes {
				runeObj := transformation.ToRuneDomain(r, tree.ID, version)

				// Create CloudEvent
				evt, err := transformation.NewRuneEvent(runeObj, uuid.New().String(), time.Now())
				if err != nil {
					return 0, fmt.Errorf("failed to create rune event: %w", err)
				}

				events = append(events, evt)
			}
		}
	}

	// Read closing bracket of root array
	if _, err := decoder.Token(); err != nil {
		return 0, fmt.Errorf("failed to read closing bracket of rune array: %w", err)
	}

	if err := repo.SaveRunes(ctx, events); err != nil {
		return 0, fmt.Errorf("failed to save runes: %w", err)
	}

	return len(events), nil
}
