package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"import-cli/internal/actions"
	"import-cli/internal/data/clickhouse"
	"import-cli/internal/data/datadragon"
	"log"
	"os"
)

func main() {
	dbHost := flag.String("db-host", "localhost:9000", "ClickHouse host")
	dbUser := flag.String("db-user", "default", "ClickHouse user")
	dbPass := flag.String("db-password", "", "ClickHouse password")
	dbName := flag.String("db-name", "default", "ClickHouse database name")

	flag.Parse()

	if flag.NArg() < 1 {
		fmt.Println("Usage: import-cli [options] <path-to-datadragon-zip>")
		flag.PrintDefaults()
		os.Exit(1)
	}

	zipPath := flag.Arg(0)

	// Check if file exists
	if _, err := os.Stat(zipPath); os.IsNotExist(err) {
		log.Printf("Error: file %s does not exist", zipPath)
		os.Exit(2)
	}

	ctx := context.Background()

	// Open Zip
	zip, err := datadragon.NewZipReader(zipPath)
	if err != nil {
		if errors.Is(err, datadragon.ErrInvalidZip) {
			log.Printf("Fatal: %v", err)
			os.Exit(2)
		}
		log.Printf("Failed to open zip: %v", err)
		os.Exit(2)
	}
	defer zip.Close()

	// Extract Version from manifest.json
	version, err := zip.GetVersion()
	if err != nil {
		log.Printf("Warning: failed to extract version from manifest.json: %v. Falling back to path extraction.", err)
		version = datadragon.ExtractVersion(zipPath)
	}

	log.Printf("Starting DataDragon import for version: %s", version)
	log.Printf("Archive: %s", zipPath)

	// Connect to ClickHouse
	conn, err := clickhouse.Connect(ctx, *dbHost, *dbUser, *dbPass, *dbName)
	if err != nil {
		log.Printf("Failed to connect to ClickHouse: %v", err)
		os.Exit(3)
	}
	defer conn.Close()

	repo := clickhouse.NewRepository(conn)

	// Create Schema
	if err := repo.CreateSchema(ctx); err != nil {
		log.Printf("Failed to create schema: %v", err)
		os.Exit(3)
	}

	// Import Champions
	log.Println("Importing champions...")
	count, err := actions.ImportChampions(ctx, repo, zip, version)
	if err != nil {
		log.Printf("Error importing champions: %v", err)
		if errors.Is(err, datadragon.ErrFileNotFound) {
			// Missing files should log warning and continue (per contracts/cli.md)
		} else {
			os.Exit(4)
		}
	} else {
		log.Printf("Inserted %d champions.", count)
	}

	// Import Items
	log.Println("Importing items...")
	count, err = actions.ImportItems(ctx, repo, zip, version)
	if err != nil {
		log.Printf("Error importing items: %v", err)
		if !errors.Is(err, datadragon.ErrFileNotFound) {
			os.Exit(4)
		}
	} else {
		log.Printf("Inserted %d items.", count)
	}

	// Import Runes
	log.Println("Importing runes...")
	count, err = actions.ImportRunes(ctx, repo, zip, version)
	if err != nil {
		log.Printf("Error importing runes: %v", err)
		if !errors.Is(err, datadragon.ErrFileNotFound) {
			os.Exit(4)
		}
	} else {
		log.Printf("Inserted %d runes.", count)
	}

	log.Println("SUCCESS: Import complete.")
}
