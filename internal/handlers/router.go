package handlers

import (
	"import-cli/internal/repository"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func NewRouter(repo repository.Repository) *chi.Mux {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(CorsMiddleware)

	r.Route("/api/{version}", func(r chi.Router) {
		r.Mount("/champions", ChampionHandlers(repo.Champions()))
		r.Mount("/items", ItemHandlers(repo.Items()))
		r.Get("/runes", GetRunesHandler(repo.Runes()))
		r.Get("/rune-branches", GetRuneBranchesHandler(repo.Runes()))
	})

	return r
}
