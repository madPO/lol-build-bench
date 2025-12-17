package dragontail

// LevelStats represents per-level scaling coefficients
type LevelStats struct {
	HPPerLevel           float64 `json:"hpperlevel"`
	MPPerLevel           float64 `json:"mpperlevel"`
	ArmorPerLevel        float64 `json:"armorperlevel"`
	SpellBlockPerLevel   float64 `json:"spellblockperlevel"`
	HPRegenPerLevel      float64 `json:"hpregenperlevel"`
	MPRegenPerLevel      float64 `json:"mpregenperlevel"`
	CritPerLevel         float64 `json:"critperlevel"`
	AttackDamagePerLevel float64 `json:"attackdamageperlevel"`
	AttackSpeedPerLevel  float64 `json:"attackspeedperlevel"`
}

// Spell represents an active ability (Q, W, E, or R)
type Spell struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Tooltip     string    `json:"tooltip"`
	MaxRank     int       `json:"maxrank"`
	Cooldown    []float64 `json:"cooldown"`
	Cost        []int     `json:"cost"`
	Range       []int     `json:"range"`
	Image       Image     `json:"image"`
}

// Passive represents the passive ability
type Passive struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       Image  `json:"image"`
}

// Stats represents all champion statistics (base and per-level)
type Stats struct {
	// Base Stats
	HP           float64 `json:"hp"`
	MP           float64 `json:"mp"`
	MoveSpeed    float64 `json:"movespeed"`
	Armor        float64 `json:"armor"`
	SpellBlock   float64 `json:"spellblock"`
	AttackRange  float64 `json:"attackrange"`
	HPRegen      float64 `json:"hpregen"`
	MPRegen      float64 `json:"mpregen"`
	Crit         float64 `json:"crit"`
	AttackDamage float64 `json:"attackdamage"`
	AttackSpeed  float64 `json:"attackspeed"`

	// Per-level Stats
	HPPerLevel           float64 `json:"hpperlevel"`
	MPPerLevel           float64 `json:"mpperlevel"`
	ArmorPerLevel        float64 `json:"armorperlevel"`
	SpellBlockPerLevel   float64 `json:"spellblockperlevel"`
	HPRegenPerLevel      float64 `json:"hpregenperlevel"`
	MPRegenPerLevel      float64 `json:"mpregenperlevel"`
	CritPerLevel         float64 `json:"critperlevel"`
	AttackDamagePerLevel float64 `json:"attackdamageperlevel"`
	AttackSpeedPerLevel  float64 `json:"attackspeedperlevel"`
}

// Champion represents a League of Legends champion with all attributes
type Champion struct {
	ID      string  `json:"id"`
	Key     string  `json:"key"`
	Name    string  `json:"name"`
	Title   string  `json:"title"`
	ParType string  `json:"partype"`
	Image   Image   `json:"image"`
	Stats   Stats   `json:"stats"`
	Spells  []Spell `json:"spells"`
	Passive Passive `json:"passive"`
}
