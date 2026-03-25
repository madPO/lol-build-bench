package actions

import (
	"context"
	"encoding/json"
	"fmt"
	"import-cli/internal/data/clickhouse"
	"import-cli/internal/data/datadragon"
	"import-cli/internal/domain"
	"import-cli/internal/transformation"
)

func ImportItems(ctx context.Context, repo *clickhouse.Repository, archive *datadragon.ArchiveReader, version string) (int, error) {
	rc, err := archive.OpenJSON("item.json")
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

	var items []domain.Item
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
		items = append(items, item)
	}

	// Read closing brace of data map
	if _, err := decoder.Token(); err != nil {
		return 0, fmt.Errorf("failed to read closing brace of data map: %w", err)
	}

	// Read closing brace of root object
	if _, err := decoder.Token(); err != nil {
		// It's possible we hit EOF or other fields, but for now just ensure we don't error out on valid end
	}

	if err := repo.SaveItems(ctx, items); err != nil {
		return 0, fmt.Errorf("failed to save items: %w", err)
	}

	return len(items), nil
}
