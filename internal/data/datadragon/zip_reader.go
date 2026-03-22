package datadragon

import (
	"archive/zip"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"strings"
)

var (
	ErrFileNotFound = errors.New("file not found in zip archive")
	ErrInvalidZip   = errors.New("invalid zip archive")
)

type ZipReader struct {
	reader *zip.ReadCloser
}

func NewZipReader(path string) (*ZipReader, error) {
	rc, err := zip.OpenReader(path)
	if err != nil {
		return nil, fmt.Errorf("%w: %v", ErrInvalidZip, err)
	}
	return &ZipReader{reader: rc}, nil
}

func (z *ZipReader) Close() error {
	return z.reader.Close()
}

func (z *ZipReader) OpenJSON(fileName string) (io.ReadCloser, error) {
	for _, f := range z.reader.File {
		if strings.HasSuffix(f.Name, fileName) {
			return f.Open()
		}
	}
	return nil, fmt.Errorf("%w: %s", ErrFileNotFound, fileName)
}

func (z *ZipReader) GetVersion() (string, error) {
	rc, err := z.OpenJSON("manifest.json")
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
