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

func ImportChampions(ctx context.Context, repo *clickhouse.Repository, zip *datadragon.ZipReader, version string) (int, error) {
	rc, err := zip.OpenJSON("champion.json")
	if err != nil {
		return 0, err
	}
	defer rc.Close()

	decoder := datadragon.GetDecoder(rc)

	// Stream until we find "data" key
	for {
		t, err := decoder.Token()
		if err != nil {
			return 0, fmt.Errorf("failed to parse champion.json: %w", err)
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

	var champions []domain.Champion
	for decoder.More() {
		// Key (champion ID)
		_, err := decoder.Token()
		if err != nil {
			return 0, err
		}

		var raw datadragon.ChampionDataData
		if err := decoder.Decode(&raw); err != nil {
			return 0, fmt.Errorf("failed to decode champion entry: %w", err)
		}

		champion := transformation.ToChampionDomain(raw, version)
		champions = append(champions, champion)
	}

	// Read closing brace of data map
	if _, err := decoder.Token(); err != nil {
		return 0, fmt.Errorf("failed to read closing brace of data map: %w", err)
	}

	// Read closing brace of root object
	if _, err := decoder.Token(); err != nil {
		// It's possible we hit EOF or other fields, but for now just ensure we don't error out on valid end
	}

	if err := repo.SaveChampions(ctx, champions); err != nil {
		return 0, fmt.Errorf("failed to save champions: %w", err)
	}

	return len(champions), nil
}
