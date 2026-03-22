package handlers

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	internalgql "import-cli/api/internal/graphql"
	"import-cli/api/internal/repository"
)

func GetRunesHandler(rr repository.RuneRepository) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		version := chi.URLParam(r, "version")
		queryParam := r.URL.Query().Get("query")

		runes, err := rr.GetAll(r.Context(), version)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		if queryParam == "" {
			RespondWithJSON(w, http.StatusOK, map[string]interface{}{
				"data": map[string]interface{}{"runes": runes},
			})
			return
		}

		gqlQuery := internalgql.SelectionSetToQuery("runes", "", queryParam)
		schema, err := internalgql.BuildSchema(internalgql.GetRuneQueryFields())
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		result := executeGql(r.Context(), schema, gqlQuery, map[string]interface{}{"runes": runes})
		if len(result.Errors) > 0 {
			RespondWithJSON(w, http.StatusBadRequest, result)
			return
		}
		RespondWithJSON(w, http.StatusOK, result)
	}
}

func GetRuneBranchesHandler(rr repository.RuneRepository) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		version := chi.URLParam(r, "version")
		queryParam := r.URL.Query().Get("query")

		branches, err := rr.GetBranches(r.Context(), version)
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		if queryParam == "" {
			RespondWithJSON(w, http.StatusOK, map[string]interface{}{
				"data": map[string]interface{}{"runeBranches": branches},
			})
			return
		}

		gqlQuery := internalgql.SelectionSetToQuery("runeBranches", "", queryParam)
		schema, err := internalgql.BuildSchema(internalgql.GetRuneQueryFields())
		if err != nil {
			RespondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		result := executeGql(r.Context(), schema, gqlQuery, map[string]interface{}{"runeBranches": branches})
		if len(result.Errors) > 0 {
			RespondWithJSON(w, http.StatusBadRequest, result)
			return
		}
		RespondWithJSON(w, http.StatusOK, result)
	}
}
