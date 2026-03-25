# Quickstart: Game Data Webserver

This guide explains how to run and test the Game Data Webserver.

## Prerequisites

- Go 1.21+ installed.
- Access to the ClickHouse database populated by the `007-datadragon-importer` feature.
- Make sure ClickHouse is running on the default port or specified via environment variables.

## Running the Webserver

1. Navigate to the backend directory where the webserver code resides (e.g., `cmd/server` or root).
2. Start the server:
   ```bash
   go run ./cmd/server/main.go
   ```
   *The server will start, typically on port 8080 (or as configured via `PORT` env var).*

## Testing the Endpoints

You can use `curl` or any HTTP client to test the hybrid REST-GraphQL endpoints.

**1. Fetch all items (default fields):**
```bash
curl http://localhost:8080/api/16.1.2/items
```

**2. Fetch all items with specific fields using the GraphQL query param:**
```bash
curl -g 'http://localhost:8080/api/16.1.2/items?query={id name gold{total}}'
```

**3. Fetch a specific champion with selected fields:**
```bash
curl -g 'http://localhost:8080/api/16.1.2/champions/Aatrox?query={id name stats{hp}}'
```

## Integrating with the Frontend

In the Qwik frontend, you can construct requests dynamically:

```typescript
const fetchItem = async (version: string, itemId: string) => {
  const query = `{ id name gold { total } }`;
  const response = await fetch(`http://localhost:8080/api/${version}/items/${itemId}?query=${encodeURIComponent(query)}`);
  const json = await response.json();
  return json.data.item;
};
```
