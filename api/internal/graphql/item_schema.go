package graphql

import (
	"github.com/graphql-go/graphql"
)

var ItemGoldType = graphql.NewObject(graphql.ObjectConfig{
	Name: "ItemGold",
	Fields: graphql.Fields{
		"base":        &graphql.Field{Type: graphql.Int},
		"total":       &graphql.Field{Type: graphql.Int},
		"sell":        &graphql.Field{Type: graphql.Int},
		"purchasable": &graphql.Field{Type: graphql.Boolean},
	},
})

var ItemType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Item",
	Fields: graphql.Fields{
		"id":          &graphql.Field{Type: graphql.String},
		"name":        &graphql.Field{Type: graphql.String},
		"description": &graphql.Field{Type: graphql.String},
		"image":       &graphql.Field{Type: graphql.String},
		"version":     &graphql.Field{Type: graphql.String},
		"tags":        &graphql.Field{Type: graphql.NewList(graphql.String)},
		"gold":        &graphql.Field{Type: ItemGoldType},
		// Stats are handled as a map for now, simplified to a few fields if needed.
		// For now we expose just the gold and basic fields.
	},
})

func GetItemQueryFields() graphql.Fields {
	return graphql.Fields{
		"items": &graphql.Field{
			Type: graphql.NewList(ItemType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return p.Info.RootValue.(map[string]interface{})["items"], nil
			},
		},
		"item": &graphql.Field{
			Type: ItemType,
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{Type: graphql.String},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return p.Info.RootValue.(map[string]interface{})["item"], nil
			},
		},
	}
}
