package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"import-cli/api/internal/handlers"
	"import-cli/api/internal/repository"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Initialize DB
	_, err := repository.GetDB()
	if err != nil {
		log.Fatalf("could not connect to database: %v", err)
	}

	r := handlers.NewRouter()

	fmt.Printf("Starting server on port %s...\n", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatalf("could not start server: %v", err)
	}
}
