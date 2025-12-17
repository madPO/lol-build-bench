package main

import (
	"context"
	"log"
	"lol-build-bench/features/applicationScope"
	"lol-build-bench/features/champion"
	"lol-build-bench/features/item"
	patchFeature "lol-build-bench/features/patch"
	"lol-build-bench/features/rune"
)

type BuildData struct {
	ID        int      `json:"id"`
	Champion  string   `json:"champion"`
	Role      string   `json:"role"`
	Items     []string `json:"items"`
	WinRate   float64  `json:"winRate"`
	Timestamp string   `json:"timestamp"`
}

func main() {
	context := context.Background()
	rootPath := "C:\\Users\\Simon\\Downloads\\dragontail-15.24.1\\15.24.1"
	scope, dispose, err := applicationScope.Create(context)
	if err != nil {
		log.Fatalf("failed to create application scope: %v", err)
	}

	defer dispose()

	// Import patch first
	patch, err := patchFeature.ImportFromFile(rootPath, scope)
	if err != nil {
		log.Fatalf("failed to import patch from file: %v", err)
	}

	// Import items
	err = item.ImportFromFile(rootPath, patch, scope)
	if err != nil {
		log.Fatalf("failed to import items from file: %v", err)
	}

	// Import runes
	err = rune.ImportFromFile(rootPath, patch, scope)
	if err != nil {
		log.Fatalf("failed to import runes from file: %v", err)
	}

	// Import champions
	err = champion.ImportFromFile(rootPath, patch, scope)
	if err != nil {
		log.Fatalf("failed to import champions from file: %v", err)
	}
}
