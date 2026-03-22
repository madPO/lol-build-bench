package graphql

import (
	"fmt"
	"strings"
)

// SelectionSetToQuery wraps a selection set into a full GraphQL query.
// fieldName is the root query field name (e.g. "champions" or "champion").
// id is optional, if provided it adds an id parameter to the query field.
func SelectionSetToQuery(fieldName string, id string, selectionSet string) string {
	selectionSet = strings.TrimSpace(selectionSet)
	if selectionSet == "" {
		selectionSet = "{ id name }"
	}

	if !strings.HasPrefix(selectionSet, "{") {
		selectionSet = "{" + selectionSet + "}"
	}

	if id != "" {
		return fmt.Sprintf("query { %s(id: \"%s\") %s }", fieldName, id, selectionSet)
	}

	return fmt.Sprintf("query { %s %s }", fieldName, selectionSet)
}
