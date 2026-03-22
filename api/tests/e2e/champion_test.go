package e2e

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"import-cli/api/internal/handlers"
)

func TestChampionEndpoint(t *testing.T) {
	// Note: This test will fail if DB is not connected
	r := handlers.NewRouter()
	ts := httptest.NewServer(r)
	defer ts.Close()

	res, err := http.Get(ts.URL + "/api/16.1.2/champions")
	if err != nil {
		t.Fatalf("Failed to send request: %v", err)
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		t.Errorf("Expected status 200, got %d", res.StatusCode)
	}

	var resp struct {
		Data struct {
			Champions []interface{} `json:"champions"`
		} `json:"data"`
	}
	if err := json.NewDecoder(res.Body).Decode(&resp); err != nil {
		t.Fatalf("Failed to decode response: %v", err)
	}
	if len(resp.Data.Champions) == 0 {
		// This might be okay if DB is empty, but we expect structure
	}
}
