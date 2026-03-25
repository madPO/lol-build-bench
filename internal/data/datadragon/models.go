package datadragon

type ChampionResponse struct {
	Type    string                      `json:"type"`
	Format  string                      `json:"format"`
	Version string                      `json:"version"`
	Data    map[string]ChampionDataData `json:"data"`
}

type ChampionDataData struct {
	ID      string        `json:"id"`
	Key     string        `json:"key"`
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

type ItemResponse struct {
	Type    string              `json:"type"`
	Version string              `json:"version"`
	Data    map[string]ItemData `json:"data"`
}

type ItemData struct {
	Name        string             `json:"name"`
	Description string             `json:"description"`
	Plaintext   string             `json:"plaintext"`
	Gold        ItemGold           `json:"gold"`
	Tags        []string           `json:"tags"`
	Stats       map[string]float64 `json:"stats"`
}

type ItemGold struct {
	Base        int  `json:"base"`
	Purchasable bool `json:"purchasable"`
	Total       int  `json:"total"`
	Sell        int  `json:"sell"`
}

type RuneResponse []RuneTree

type RuneTree struct {
	ID    int        `json:"id"`
	Key   string     `json:"key"`
	Icon  string     `json:"icon"`
	Name  string     `json:"name"`
	Slots []RuneSlot `json:"slots"`
}

type RuneSlot struct {
	Runes []RuneData `json:"runes"`
}

type RuneData struct {
	ID        int    `json:"id"`
	Key       string `json:"key"`
	Icon      string `json:"icon"`
	Name      string `json:"name"`
	ShortDesc string `json:"shortDesc"`
	LongDesc  string `json:"longDesc"`
}

type Manifest struct {
	Version string `json:"v"`
}
