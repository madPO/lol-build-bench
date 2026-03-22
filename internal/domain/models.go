package domain

type Champion struct {
	ID      string        `json:"id"`
	Key     int           `json:"key"`
	Name    string        `json:"name"`
	Title   string        `json:"title"`
	Tags    []string      `json:"tags"`
	Stats   ChampionStats `json:"stats"`
	Version string        `json:"version"`
}

type ChampionStats struct {
	HP                   float64 `json:"hp"`
	HPPerLevel           float64 `json:"hpperlevel"`
	MP                   float64 `json:"mp"`
	MPPerLevel           float64 `json:"mpperlevel"`
	MoveSpeed            float64 `json:"movespeed"`
	Armor                float64 `json:"armor"`
	ArmorPerLevel        float64 `json:"armorperlevel"`
	SpellBlock           float64 `json:"spellblock"`
	SpellBlockPerLevel   float64 `json:"spellblockperlevel"`
	AttackRange          float64 `json:"attackrange"`
	HPRegen              float64 `json:"hpregen"`
	HPRegenPerLevel      float64 `json:"hpregenperlevel"`
	MPRegen              float64 `json:"mpregen"`
	MPRegenPerLevel      float64 `json:"mpregenperlevel"`
	Crit                 float64 `json:"crit"`
	CritPerLevel         float64 `json:"critperlevel"`
	AttackDamage         float64 `json:"attackdamage"`
	AttackDamagePerLevel float64 `json:"attackdamageperlevel"`
	AttackSpeedPerLevel  float64 `json:"attackspeedperlevel"`
	AttackSpeed          float64 `json:"attackspeed"`
}

type Item struct {
	ID          string             `json:"id"`
	Name        string             `json:"name"`
	Description string             `json:"description"`
	Plaintext   string             `json:"plaintext"`
	Gold        ItemGold           `json:"gold"`
	Stats       map[string]float64 `json:"stats"`
	Version     string             `json:"version"`
}

type ItemGold struct {
	Base        int  `json:"base"`
	Purchasable bool `json:"purchasable"`
	Total       int  `json:"total"`
	Sell        int  `json:"sell"`
}

type Rune struct {
	ID        int    `json:"id"`
	Key       string `json:"key"`
	Icon      string `json:"icon"`
	Name      string `json:"name"`
	ShortDesc string `json:"shortDesc"`
	LongDesc  string `json:"longDesc"`
	TreeID    int    `json:"treeId"`
	Version   string `json:"version"`
}
