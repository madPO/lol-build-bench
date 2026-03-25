package handlers

import (
	"net/http"

	internalgql "import-cli/internal/graphql"
	"import-cli/internal/repository"

	"github.com/go-chi/chi/v5"
)

func ItemHandlers(ir repository.ItemRepository) http.Handler {
	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		version := chi.URLParam(r, "version")
		queryParam := r.URL.Query().Get("query")

		items, err := ir.GetAll(r.Context(), version)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		if queryParam == "" {
			RespondWithJSON(w, http.StatusOK, map[string]interface{}{
				"data": map[string]interface{}{"items": items},
			})
			return
		}

		gqlQuery := internalgql.SelectionSetToQuery("items", "", queryParam)
		schema, err := internalgql.BuildSchema(internalgql.GetItemQueryFields())
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		result := executeGql(r.Context(), schema, gqlQuery, map[string]interface{}{"items": items})
		if len(result.Errors) > 0 {
			RespondWithJSON(w, http.StatusBadRequest, result)
			return
		}
		RespondWithJSON(w, http.StatusOK, result)
	})

	r.Get("/{id}", func(w http.ResponseWriter, r *http.Request) {
		version := chi.URLParam(r, "version")
		id := chi.URLParam(r, "id")
		queryParam := r.URL.Query().Get("query")

		item, err := ir.GetByID(r.Context(), version, id)
		if err != nil {
			RespondWithError(w, http.StatusNotFound, "Item not found")
			return
		}

		if queryParam == "" {
			RespondWithJSON(w, http.StatusOK, map[string]interface{}{
				"data": map[string]interface{}{"item": item},
			})
			return
		}

		gqlQuery := internalgql.SelectionSetToQuery("item", id, queryParam)
		schema, err := internalgql.BuildSchema(internalgql.GetItemQueryFields())
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		result := executeGql(r.Context(), schema, gqlQuery, map[string]interface{}{"item": item})
		if len(result.Errors) > 0 {
			RespondWithJSON(w, http.StatusBadRequest, result)
			return
		}
		RespondWithJSON(w, http.StatusOK, result)
	})

	return r
}
