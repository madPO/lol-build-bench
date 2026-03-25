package handlers

import (
	"context"
	"net/http"

	internalgql "import-cli/internal/graphql"
	"import-cli/internal/repository"

	"github.com/go-chi/chi/v5"
	"github.com/graphql-go/graphql"
)

func ChampionHandlers(cr repository.ChampionRepository) http.Handler {
	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		version := chi.URLParam(r, "version")
		queryParam := r.URL.Query().Get("query")

		champions, err := cr.GetAll(r.Context(), version)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		if queryParam == "" {
			RespondWithJSON(w, http.StatusOK, map[string]interface{}{
				"data": map[string]interface{}{"champions": champions},
			})
			return
		}

		gqlQuery := internalgql.SelectionSetToQuery("champions", "", queryParam)
		schema, err := internalgql.BuildSchema(internalgql.GetChampionQueryFields())
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		result := executeGql(r.Context(), schema, gqlQuery, map[string]interface{}{"champions": champions})
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

		champion, err := cr.GetByID(r.Context(), version, id)
		if err != nil {
			RespondWithError(w, http.StatusNotFound, "Champion not found")
			return
		}

		if queryParam == "" {
			RespondWithJSON(w, http.StatusOK, map[string]interface{}{
				"data": map[string]interface{}{"champion": champion},
			})
			return
		}

		gqlQuery := internalgql.SelectionSetToQuery("champion", id, queryParam)
		schema, err := internalgql.BuildSchema(internalgql.GetChampionQueryFields())
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		result := executeGql(r.Context(), schema, gqlQuery, map[string]interface{}{"champion": champion})
		if len(result.Errors) > 0 {
			RespondWithJSON(w, http.StatusBadRequest, result)
			return
		}
		RespondWithJSON(w, http.StatusOK, result)
	})

	return r
}

func executeGql(ctx context.Context, schema graphql.Schema, query string, rootValue map[string]interface{}) *graphql.Result {
	params := graphql.Params{
		Schema:        schema,
		RequestString: query,
		RootObject:    rootValue,
		Context:       ctx,
	}
	return graphql.Do(params)
}
