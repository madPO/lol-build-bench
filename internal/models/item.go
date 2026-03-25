package models

type Item struct {
	ID          string             `json:"id"`
	Name        string             `json:"name"`
	Description string             `json:"description"`
	Image       string             `json:"image"`
	Version     string             `json:"version"`
	Tags        []string           `json:"tags"`
	Gold        ItemGold           `json:"gold"`
	Stats       map[string]float64 `json:"stats"`
}

type ItemGold struct {
	Base        int32 `json:"base"`
	Total       int32 `json:"total"`
	Sell        int32 `json:"sell"`
	Purchasable bool  `json:"purchasable"`
}
