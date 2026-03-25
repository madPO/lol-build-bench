package graphql

import (
	"github.com/graphql-go/graphql"
)

func BuildSchema(fields graphql.Fields) (graphql.Schema, error) {
	rootQuery := graphql.ObjectConfig{Name: "RootQuery", Fields: fields}
	schemaConfig := graphql.SchemaConfig{Query: graphql.NewObject(rootQuery)}
	return graphql.NewSchema(schemaConfig)
}

func GetAllQueryFields() graphql.Fields {
	fields := graphql.Fields{}
	for k, v := range GetChampionQueryFields() {
		fields[k] = v
	}
	for k, v := range GetItemQueryFields() {
		fields[k] = v
	}
	for k, v := range GetRuneQueryFields() {
		fields[k] = v
	}
	return fields
}

// Global schema for the whole API
var MainSchema graphql.Schema

func init() {
	var err error
	fields := GetAllQueryFields()
	MainSchema, err = BuildSchema(fields)
	if err != nil {
		// For simplicity, panic in init if schema is invalid
		panic(err)
	}
}
