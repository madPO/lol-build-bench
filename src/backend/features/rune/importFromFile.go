package rune

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"lol-build-bench/entities/dragontail"
	"lol-build-bench/entities/patch"
	"lol-build-bench/entities/rune"
	"lol-build-bench/features/applicationScope"
)

func ImportFromFile(rootPath string, patchInfo patch.Patch, scope applicationScope.Scope) error {
	runeDataPath := filepath.Join(rootPath, "data", patchInfo.Language, "runesReforged.json")

	runesData, err := readRuneData(runeDataPath)
	if err != nil {
		return err
	}

	push, commit, err := OpenRuneQueue(scope)
	if err != nil {
		return err
	}

	for _, runePath := range runesData {
		flatRune := rune.BuildFlatRune(runePath, nil, -1)
		event, err := rune.CreateEventFromRune(flatRune, patchInfo.OID)
		if err != nil {
			return err
		}

		err = push(event)
		if err != nil {
			return err
		}

		for slotNumber, slot := range runePath.Slots {
			for _, runeData := range slot.Runes {
				flatRune = rune.BuildFlatRune(runePath, &runeData, slotNumber)
				event, err := rune.CreateEventFromRune(flatRune, patchInfo.OID)
				if err != nil {
					return err
				}

				err = push(event)
				if err != nil {
					return err
				}
			}
		}
	}

	err = commit()
	if err != nil {
		return err
	}

	return nil
}

// todo: move this read from file to dragontail features
func readRuneData(filePath string) ([]dragontail.RunePathData, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to open file %s: %w", filePath, err)
	}
	defer file.Close()

	var data []dragontail.RunePathData
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&data); err != nil {
		return nil, fmt.Errorf("failed to decode JSON from %s: %w", filePath, err)
	}

	return data, nil
}
