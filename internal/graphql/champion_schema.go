package graphql

import (
	"github.com/graphql-go/graphql"
)

var championStatsType = graphql.NewObject(graphql.ObjectConfig{
	Name: "ChampionStats",
	Fields: graphql.Fields{
		"hp":                   &graphql.Field{Type: graphql.Float},
		"hpperlevel":           &graphql.Field{Type: graphql.Float},
		"mp":                   &graphql.Field{Type: graphql.Float},
		"mpperlevel":           &graphql.Field{Type: graphql.Float},
		"movespeed":            &graphql.Field{Type: graphql.Float},
		"armor":                &graphql.Field{Type: graphql.Float},
		"armorperlevel":        &graphql.Field{Type: graphql.Float},
		"spellblock":           &graphql.Field{Type: graphql.Float},
		"spellblockperlevel":   &graphql.Field{Type: graphql.Float},
		"attackrange":          &graphql.Field{Type: graphql.Float},
		"hpregen":              &graphql.Field{Type: graphql.Float},
		"hpregenperlevel":      &graphql.Field{Type: graphql.Float},
		"mpregen":              &graphql.Field{Type: graphql.Float},
		"mpregenperlevel":      &graphql.Field{Type: graphql.Float},
		"crit":                 &graphql.Field{Type: graphql.Float},
		"critperlevel":         &graphql.Field{Type: graphql.Float},
		"attackdamage":         &graphql.Field{Type: graphql.Float},
		"attackdamageperlevel": &graphql.Field{Type: graphql.Float},
		"attackspeedperlevel":  &graphql.Field{Type: graphql.Float},
		"attackspeed":          &graphql.Field{Type: graphql.Float},
	},
})

var ChampionType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Champion",
	Fields: graphql.Fields{
		"id":        &graphql.Field{Type: graphql.String},
		"key":       &graphql.Field{Type: graphql.String},
		"name":      &graphql.Field{Type: graphql.String},
		"title":     &graphql.Field{Type: graphql.String},
		"tags":      &graphql.Field{Type: graphql.NewList(graphql.String)},
		"version":   &graphql.Field{Type: graphql.String},
		"image":     &graphql.Field{Type: graphql.String},
		"avatarUrl": &graphql.Field{Type: graphql.String},
		"stats":     &graphql.Field{Type: championStatsType},
	},
})

func GetChampionQueryFields() graphql.Fields {
	return graphql.Fields{
		"champions": &graphql.Field{
			Type: graphql.NewList(ChampionType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return p.Info.RootValue.(map[string]interface{})["champions"], nil
			},
		},
		"champion": &graphql.Field{
			Type: ChampionType,
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{Type: graphql.String},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return p.Info.RootValue.(map[string]interface{})["champion"], nil
			},
		},
	}
}
