package datadragon

import (
	"archive/tar"
	"bytes"
	"compress/gzip"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"os"
	"strings"
)

var (
	ErrFileNotFound   = errors.New("file not found in archive")
	ErrInvalidArchive = errors.New("invalid archive")
)

type ArchiveReader struct {
	files map[string][]byte
}

func NewArchiveReader(path string) (*ArchiveReader, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("failed to open file: %w", err)
	}
	defer f.Close()

	gz, err := gzip.NewReader(f)
	if err != nil {
		return nil, fmt.Errorf("%w: failed to create gzip reader: %v", ErrInvalidArchive, err)
	}
	defer gz.Close()

	tr := tar.NewReader(gz)
	files := make(map[string][]byte)

	wanted := []string{"manifest.json", "champion.json", "item.json", "runesReforged.json"}

	for {
		header, err := tr.Next()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, fmt.Errorf("%w: failed to read tar header: %v", ErrInvalidArchive, err)
		}

		if header.Typeflag == tar.TypeReg {
			for _, w := range wanted {
				if strings.HasSuffix(header.Name, w) {
					if _, exists := files[w]; !exists {
						data, err := io.ReadAll(tr)
						if err != nil {
							return nil, fmt.Errorf("failed to read file %s: %v", header.Name, err)
						}
						files[w] = data
					}
				}
			}
		}

		if len(files) == len(wanted) {
			break
		}
	}

	return &ArchiveReader{files: files}, nil
}

func (a *ArchiveReader) Close() error {
	return nil
}

type nopCloser struct {
	io.Reader
}

func (nopCloser) Close() error { return nil }

func (a *ArchiveReader) OpenJSON(fileName string) (io.ReadCloser, error) {
	for name, data := range a.files {
		if strings.HasSuffix(name, fileName) {
			return nopCloser{bytes.NewReader(data)}, nil
		}
	}
	return nil, fmt.Errorf("%w: %s", ErrFileNotFound, fileName)
}

func (a *ArchiveReader) GetVersion() (string, error) {
	rc, err := a.OpenJSON("manifest.json")
	if err != nil {
		return "", err
	}
	defer rc.Close()

	decoder := GetDecoder(rc)
	var manifest Manifest
	if err := decoder.Decode(&manifest); err != nil {
		return "", fmt.Errorf("failed to decode manifest.json: %w", err)
	}

	if manifest.Version == "" {
		return "", fmt.Errorf("version not found in manifest.json")
	}

	return manifest.Version, nil
}

func GetDecoder(rc io.ReadCloser) *json.Decoder {
	return json.NewDecoder(rc)
}
