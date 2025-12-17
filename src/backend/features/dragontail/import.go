package dragontail

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

func readFromFile(rootPath string, filePath string, data any) error {
	file, err := os.Open(filepath.Join(rootPath, filePath))
	if err != nil {
		return fmt.Errorf("failed to open file: %w", err)
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	if err := decoder.Decode(data); err != nil {
		return fmt.Errorf("failed to decode JSON: %w", err)
	}

	return nil
}
