package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"import-cli/internal/data/clickhouse"
	"import-cli/internal/handlers"
	"import-cli/internal/repository"
)

func main() {
	dbHost := flag.String("db-host", "localhost:9000", "ClickHouse host")
	dbUser := flag.String("db-user", "default", "ClickHouse user")
	dbPass := flag.String("db-password", "default", "ClickHouse password")
	dbName := flag.String("db-name", "default", "ClickHouse database name")

	flag.Parse()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Connect to ClickHouse
	conn, err := clickhouse.Connect(context.Background(), *dbHost, *dbUser, *dbPass, *dbName)
	if err != nil {
		log.Fatalf("could not connect to database: %v", err)
	}
	defer conn.Close()

	repo := repository.NewRepository(conn)
	r := handlers.NewRouter(repo)

	fmt.Printf("Starting server on port %s...\n", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatalf("could not start server: %v", err)
	}
}
