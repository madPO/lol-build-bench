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

func ImportRunes(ctx context.Context, repo *clickhouse.Repository, archive *datadragon.ArchiveReader, version string) (int, error) {
	rc, err := archive.OpenJSON("runesReforged.json")
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

	var runes []domain.Rune
	for decoder.More() {
		var tree datadragon.RuneTree
		if err := decoder.Decode(&tree); err != nil {
			return 0, fmt.Errorf("failed to decode rune tree: %w", err)
		}

		for _, slot := range tree.Slots {
			for _, r := range slot.Runes {
				runeObj := transformation.ToRuneDomain(r, tree.ID, version)
				runes = append(runes, runeObj)
			}
		}
	}

	// Read closing bracket of root array
	if _, err := decoder.Token(); err != nil {
		return 0, fmt.Errorf("failed to read closing bracket of rune array: %w", err)
	}

	if err := repo.SaveRunes(ctx, runes); err != nil {
		return 0, fmt.Errorf("failed to save runes: %w", err)
	}

	return len(runes), nil
}
