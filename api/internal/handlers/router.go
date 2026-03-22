package handlers

import (
	"log"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"import-cli/api/internal/repository"
)

func NewRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(CorsMiddleware)

	db, err := repository.GetDB()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	repo := repository.NewRepository(db)

	r.Route("/api/{version}", func(r chi.Router) {
		r.Mount("/champions", ChampionHandlers(repo.Champions()))
		r.Mount("/items", ItemHandlers(repo.Items()))
		r.Get("/runes", GetRunesHandler(repo.Runes()))
		r.Get("/rune-branches", GetRuneBranchesHandler(repo.Runes()))
	})

	return r
}
