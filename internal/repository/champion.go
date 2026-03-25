package repository

import (
	"context"
	"fmt"
	"import-cli/internal/models"

	"github.com/ClickHouse/clickhouse-go/v2/lib/driver"
)

type championRepository struct {
	conn driver.Conn
}

func NewChampionRepository(conn driver.Conn) ChampionRepository {
	return &championRepository{conn: conn}
}

func (r *championRepository) GetAll(ctx context.Context, version string) ([]models.Champion, error) {
	query := `SELECT
		id, key, name, title, tags, version,
		hp, hpperlevel, mp, mpperlevel, movespeed, armor, armorperlevel,
		spellblock, spellblockperlevel, attackrange, hpregen, hpregenperlevel,
		mpregen, mpregenperlevel, crit, critperlevel, attackdamage,
		attackdamageperlevel, attackspeedperlevel, attackspeed
	FROM champions
	WHERE version = ?`

	rows, err := r.conn.Query(ctx, query, version)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var champions []models.Champion
	for rows.Next() {
		var c models.Champion
		var s models.ChampionStats
		var keyInt int32
		if err := rows.Scan(
			&c.ID, &keyInt, &c.Name, &c.Title, &c.Tags, &c.Version,
			&s.HP, &s.HPPerLevel, &s.MP, &s.MPPerLevel, &s.MoveSpeed, &s.Armor, &s.ArmorPerLevel,
			&s.SpellBlock, &s.SpellBlockPerLevel, &s.AttackRange, &s.HPRegen, &s.HPRegenPerLevel,
			&s.MPRegen, &s.MPRegenPerLevel, &s.Crit, &s.CritPerLevel, &s.AttackDamage,
			&s.AttackDamagePerLevel, &s.AttackSpeedPerLevel, &s.AttackSpeed,
		); err != nil {
			return nil, err
		}
		c.Key = fmt.Sprintf("%d", keyInt)
		c.Stats = s
		// Populate derived fields
		c.Image = fmt.Sprintf("%s.png", c.ID)
		c.AvatarURL = fmt.Sprintf("http://ddragon.leagueoflegends.com/cdn/%s/img/champion/%s.png", c.Version, c.ID)
		champions = append(champions, c)
	}

	return champions, nil
}

func (r *championRepository) GetByID(ctx context.Context, version string, id string) (*models.Champion, error) {
	query := `SELECT
		id, key, name, title, tags, version,
		hp, hpperlevel, mp, mpperlevel, movespeed, armor, armorperlevel,
		spellblock, spellblockperlevel, attackrange, hpregen, hpregenperlevel,
		mpregen, mpregenperlevel, crit, critperlevel, attackdamage,
		attackdamageperlevel, attackspeedperlevel, attackspeed
	FROM champions
	WHERE version = ? AND id = ?`

	var c models.Champion
	var s models.ChampionStats
	var keyInt int32
	err := r.conn.QueryRow(ctx, query, version, id).Scan(
		&c.ID, &keyInt, &c.Name, &c.Title, &c.Tags, &c.Version,
		&s.HP, &s.HPPerLevel, &s.MP, &s.MPPerLevel, &s.MoveSpeed, &s.Armor, &s.ArmorPerLevel,
		&s.SpellBlock, &s.SpellBlockPerLevel, &s.AttackRange, &s.HPRegen, &s.HPRegenPerLevel,
		&s.MPRegen, &s.MPRegenPerLevel, &s.Crit, &s.CritPerLevel, &s.AttackDamage,
		&s.AttackDamagePerLevel, &s.AttackSpeedPerLevel, &s.AttackSpeed,
	)
	if err != nil {
		return nil, err
	}
	c.Key = fmt.Sprintf("%d", keyInt)
	c.Stats = s
	// Populate derived fields
	c.Image = fmt.Sprintf("%s.png", c.ID)
	c.AvatarURL = fmt.Sprintf("http://ddragon.leagueoflegends.com/cdn/%s/img/champion/%s.png", c.Version, c.ID)

	return &c, nil
}
