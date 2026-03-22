package e2e

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"import-cli/api/internal/handlers"
)

func TestRuneEndpoint(t *testing.T) {
	r := handlers.NewRouter()
	ts := httptest.NewServer(r)
	defer ts.Close()

	res, err := http.Get(ts.URL + "/api/16.1.2/runes")
	if err != nil {
		t.Fatalf("Failed to send request: %v", err)
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		t.Errorf("Expected status 200, got %d", res.StatusCode)
	}

	var resp struct {
		Data struct {
			Runes []interface{} `json:"runes"`
		} `json:"data"`
	}
	if err := json.NewDecoder(res.Body).Decode(&resp); err != nil {
		t.Fatalf("Failed to decode response: %v", err)
	}
}
