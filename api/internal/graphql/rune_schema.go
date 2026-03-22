package graphql

import (
	"github.com/graphql-go/graphql"
)

var RuneType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Rune",
	Fields: graphql.Fields{
		"id":          &graphql.Field{Type: graphql.String},
		"branchId":    &graphql.Field{Type: graphql.String},
		"name":        &graphql.Field{Type: graphql.String},
		"description": &graphql.Field{Type: graphql.String},
		"iconUrl":     &graphql.Field{Type: graphql.String},
		"tier":        &graphql.Field{Type: graphql.Int},
	},
})

var RuneBranchType = graphql.NewObject(graphql.ObjectConfig{
	Name: "RuneBranch",
	Fields: graphql.Fields{
		"id":      &graphql.Field{Type: graphql.String},
		"name":    &graphql.Field{Type: graphql.String},
		"iconUrl": &graphql.Field{Type: graphql.String},
		"color":   &graphql.Field{Type: graphql.String},
	},
})

func GetRuneQueryFields() graphql.Fields {
	return graphql.Fields{
		"runes": &graphql.Field{
			Type: graphql.NewList(RuneType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return p.Info.RootValue.(map[string]interface{})["runes"], nil
			},
		},
		"runeBranches": &graphql.Field{
			Type: graphql.NewList(RuneBranchType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return p.Info.RootValue.(map[string]interface{})["runeBranches"], nil
			},
		},
	}
}
