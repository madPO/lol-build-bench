package dragontail

import (
	"lol-build-bench/entities/dragontail"
)

const (
	ManifestRelativePath = "manifest.json"
)

func ReadManifest(rootPath string) (*dragontail.Manifest, error) {
	var manifest dragontail.Manifest
	err := readFromFile(rootPath, ManifestRelativePath, &manifest)
	if err != nil {
		return nil, err
	}

	return &manifest, nil
}
