package handlers

import (
	"encoding/json"
	"net/http"
)

type ErrorResponse struct {
	Errors []ErrorMessage `json:"errors"`
}

type ErrorMessage struct {
	Message string `json:"message"`
}

func RespondWithError(w http.ResponseWriter, code int, message string) {
	RespondWithJSON(w, code, ErrorResponse{
		Errors: []ErrorMessage{{Message: message}},
	})
}

func RespondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}
