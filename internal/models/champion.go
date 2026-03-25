package models

type Champion struct {
	ID        string        `json:"id" ch:"id"`
	Key       string        `json:"key"`
	Name      string        `json:"name" ch:"name"`
	Title     string        `json:"title" ch:"title"`
	Tags      []string      `json:"tags" ch:"tags"`
	Version   string        `json:"version" ch:"version"`
	Image     string        `json:"image"`
	AvatarURL string        `json:"avatarUrl"`
	Stats     ChampionStats `json:"stats"`
}

type ChampionStats struct {
	HP                   float64 `json:"hp" ch:"hp"`
	HPPerLevel           float64 `json:"hpperlevel" ch:"hpperlevel"`
	MP                   float64 `json:"mp" ch:"mp"`
	MPPerLevel           float64 `json:"mpperlevel" ch:"mpperlevel"`
	MoveSpeed            float64 `json:"movespeed" ch:"movespeed"`
	Armor                float64 `json:"armor" ch:"armor"`
	ArmorPerLevel        float64 `json:"armorperlevel" ch:"armorperlevel"`
	SpellBlock           float64 `json:"spellblock" ch:"spellblock"`
	SpellBlockPerLevel   float64 `json:"spellblockperlevel" ch:"spellblockperlevel"`
	AttackRange          float64 `json:"attackrange" ch:"attackrange"`
	HPRegen              float64 `json:"hpregen" ch:"hpregen"`
	HPRegenPerLevel      float64 `json:"hpregenperlevel" ch:"hpregenperlevel"`
	MPRegen              float64 `json:"mpregen" ch:"mpregen"`
	MPRegenPerLevel      float64 `json:"mpregenperlevel" ch:"mpregenperlevel"`
	Crit                 float64 `json:"crit" ch:"crit"`
	CritPerLevel         float64 `json:"critperlevel" ch:"critperlevel"`
	AttackDamage         float64 `json:"attackdamage" ch:"attackdamage"`
	AttackDamagePerLevel float64 `json:"attackdamageperlevel" ch:"attackdamageperlevel"`
	AttackSpeedPerLevel  float64 `json:"attackspeedperlevel" ch:"attackspeedperlevel"`
	AttackSpeed          float64 `json:"attackspeed" ch:"attackspeed"`
}
