package champion

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"lol-build-bench/entities/champion"
	"lol-build-bench/entities/dragontail"
	"lol-build-bench/entities/patch"
	"lol-build-bench/features/applicationScope"
)

// ImportFromFile loads champion data from individual JSON files in a directory and persists to ClickHouse.
// The champion files are expected to be located at: basePath/patch.OID/data/patch.Language/champions/
// Each champion is stored as a separate JSON file (e.g., Annie.json, Ahri.json).
//
// Example:
//
//	p := &patch.Patch{
//	    PID:      uuid.New(),
//	    OID:      "patch_15_24_1",
//	    Language: "en_US",
//	}
//	err := ImportFromFile("/data/champions", p, scope)
func ImportFromFile(rootPath string, patchInfo patch.Patch, scope applicationScope.Scope) error {
	championsDir := filepath.Join(rootPath, "data", patchInfo.Language, "champion")

	// Scan directory for JSON files
	files, err := os.ReadDir(championsDir)
	if err != nil {
		return err
	}

	if len(files) == 0 {
		return fmt.Errorf("no champion files found in directory: %s", championsDir)
	}

	// Open insertion queue
	push, commit, err := OpenChampionQueue(scope)
	if err != nil {
		return err
	}

	// Process each champion file
	for _, file := range files {
		if file.IsDir() {
			continue
		}

		if filepath.Ext(file.Name()) != ".json" {
			continue
		}

		filePath := filepath.Join(championsDir, file.Name())
		championData, err := parseChampionFile(filePath)
		if err != nil {
			return err
		}

		// Create CloudEvent from champion data
		event, err := champion.CreateEventFromChampionData(championData, patchInfo.OID)
		if err != nil {
			return err
		}

		// Add to batch
		err = push(event)
		if err != nil {
			return err
		}
	}

	// Commit all changes
	err = commit()
	if err != nil {
		return err
	}

	return nil
}

// parseChampionFile reads and unmarshals a champion JSON file
func parseChampionFile(filePath string) (dragontail.Champion, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return dragontail.Champion{}, err
	}
	defer file.Close()

	var championData struct {
		Type    string                         `json:"type"`
		Format  string                         `json:"format"`
		Version string                         `json:"version"`
		Data    map[string]dragontail.Champion `json:"data"`
	}
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&championData); err != nil {
		return dragontail.Champion{}, fmt.Errorf("failed to decode JSON: %w", err)
	}

	for _, champion := range championData.Data {
		return champion, nil
	}

	return dragontail.Champion{}, nil
}
