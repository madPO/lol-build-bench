package transformation

import (
	"import-cli/internal/data/datadragon"
	"import-cli/internal/domain"
	"strconv"
)

func ToChampionDomain(raw datadragon.ChampionDataData, version string) domain.Champion {
	key, _ := strconv.Atoi(raw.Key)
	return domain.Champion{
		ID:      raw.ID,
		Key:     key,
		Name:    raw.Name,
		Title:   raw.Title,
		Tags:    raw.Tags,
		Version: version,
		Stats: domain.ChampionStats{
			HP:                   raw.Stats.HP,
			HPPerLevel:           raw.Stats.HPPerLevel,
			MP:                   raw.Stats.MP,
			MPPerLevel:           raw.Stats.MPPerLevel,
			MoveSpeed:            raw.Stats.MoveSpeed,
			Armor:                raw.Stats.Armor,
			ArmorPerLevel:        raw.Stats.ArmorPerLevel,
			SpellBlock:           raw.Stats.SpellBlock,
			SpellBlockPerLevel:   raw.Stats.SpellBlockPerLevel,
			AttackRange:          raw.Stats.AttackRange,
			HPRegen:              raw.Stats.HPRegen,
			HPRegenPerLevel:      raw.Stats.HPRegenPerLevel,
			MPRegen:              raw.Stats.MPRegen,
			MPRegenPerLevel:      raw.Stats.MPRegenPerLevel,
			Crit:                 raw.Stats.Crit,
			CritPerLevel:         raw.Stats.CritPerLevel,
			AttackDamage:         raw.Stats.AttackDamage,
			AttackDamagePerLevel: raw.Stats.AttackDamagePerLevel,
			AttackSpeedPerLevel:  raw.Stats.AttackSpeedPerLevel,
			AttackSpeed:          raw.Stats.AttackSpeed,
		},
	}
}

func ToItemDomain(id string, raw datadragon.ItemData, version string) domain.Item {
	return domain.Item{
		ID:          id,
		Name:        raw.Name,
		Description: raw.Description,
		Plaintext:   raw.Plaintext,
		Version:     version,
		Gold: domain.ItemGold{
			Base:        raw.Gold.Base,
			Purchasable: raw.Gold.Purchasable,
			Total:       raw.Gold.Total,
			Sell:        raw.Gold.Sell,
		},
		Stats: raw.Stats,
	}
}

func ToRuneDomain(raw datadragon.RuneData, treeID int, version string) domain.Rune {
	return domain.Rune{
		ID:        raw.ID,
		Key:       raw.Key,
		Icon:      raw.Icon,
		Name:      raw.Name,
		ShortDesc: raw.ShortDesc,
		LongDesc:  raw.LongDesc,
		TreeID:    treeID,
		Version:   version,
	}
}
