package item

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"lol-build-bench/entities/dragontail"
	"lol-build-bench/entities/item"
	"lol-build-bench/entities/patch"
	"lol-build-bench/features/applicationScope"
)

func ImportFromFile(rootPath string, patchInfo patch.Patch, scope applicationScope.Scope) error {
	itemDataPath := filepath.Join(rootPath, "data", patchInfo.Language, "item.json")
	itemsData, err := readItemData(itemDataPath)
	if err != nil {
		return err
	}

	push, commit, err := OpenItemQueue(scope)
	if err != nil {
		return err
	}

	for itemID, itemData := range itemsData {
		if !itemData.Maps[dragontail.SummonersRift] {
			continue
		}

		if itemData.InStore != nil && !*itemData.InStore {
			continue
		}

		event, err := item.CreateEventFromItemData(itemID, itemData, patchInfo.OID)
		if err != nil {
			return err
		}

		err = push(event)
		if err != nil {
			return err
		}
	}

	err = commit()
	if err != nil {
		return err
	}

	return nil
}

func readItemData(filePath string) (map[string]dragontail.Item, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to open file: %w", err)
	}
	defer file.Close()

	var data dragontail.ItemData
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&data); err != nil {
		return nil, fmt.Errorf("failed to decode JSON: %w", err)
	}

	return data.Data, nil
}
