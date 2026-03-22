package clickhouse

import (
	"context"
	"fmt"
	"import-cli/internal/domain"

	"github.com/ClickHouse/clickhouse-go/v2/lib/driver"
	cloudevents "github.com/cloudevents/sdk-go/v2"
)

type Repository struct {
	conn driver.Conn
}

func NewRepository(conn driver.Conn) *Repository {
	return &Repository{conn: conn}
}

func (r *Repository) CreateSchema(ctx context.Context) error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS champions (
			id String,
			key Int32,
			name String,
			title String,
			tags Array(String),
			version String,
			hp Float64,
			hpperlevel Float64,
			mp Float64,
			mpperlevel Float64,
			movespeed Float64,
			armor Float64,
			armorperlevel Float64,
			spellblock Float64,
			spellblockperlevel Float64,
			attackrange Float64,
			hpregen Float64,
			hpregenperlevel Float64,
			mpregen Float64,
			mpregenperlevel Float64,
			crit Float64,
			critperlevel Float64,
			attackdamage Float64,
			attackdamageperlevel Float64,
			attackspeedperlevel Float64,
			attackspeed Float64
		) ENGINE = ReplacingMergeTree() ORDER BY (id, version)`,

		`CREATE TABLE IF NOT EXISTS items (
			id String,
			name String,
			description String,
			plaintext String,
			version String,
			gold_base Int32,
			gold_purchasable Boolean,
			gold_total Int32,
			gold_sell Int32,
			stats Map(String, Float64)
		) ENGINE = ReplacingMergeTree() ORDER BY (id, version)`,

		`CREATE TABLE IF NOT EXISTS runes (
			id Int32,
			key String,
			icon String,
			name String,
			shortDesc String,
			longDesc String,
			treeId Int32,
			version String
		) ENGINE = ReplacingMergeTree() ORDER BY (id, version)`,
	}

	for _, q := range queries {
		if err := r.conn.Exec(ctx, q); err != nil {
			return fmt.Errorf("failed to execute schema query: %w", err)
		}
	}

	return nil
}

func (r *Repository) SaveChampions(ctx context.Context, events []cloudevents.Event) error {
	batch, err := r.conn.PrepareBatch(ctx, "INSERT INTO champions")
	if err != nil {
		return err
	}

	for _, e := range events {
		var c domain.Champion
		if err := e.DataAs(&c); err != nil {
			fmt.Printf("Warning: failed to unmarshal champion event data: %v\n", err)
			continue
		}

		err := batch.Append(
			c.ID, c.Key, c.Name, c.Title, c.Tags, c.Version,
			c.Stats.HP, c.Stats.HPPerLevel, c.Stats.MP, c.Stats.MPPerLevel,
			c.Stats.MoveSpeed, c.Stats.Armor, c.Stats.ArmorPerLevel,
			c.Stats.SpellBlock, c.Stats.SpellBlockPerLevel, c.Stats.AttackRange,
			c.Stats.HPRegen, c.Stats.HPRegenPerLevel, c.Stats.MPRegen, c.Stats.MPRegenPerLevel,
			c.Stats.Crit, c.Stats.CritPerLevel, c.Stats.AttackDamage, c.Stats.AttackDamagePerLevel,
			c.Stats.AttackSpeedPerLevel, c.Stats.AttackSpeed,
		)
		if err != nil {
			return err
		}
	}

	return batch.Send()
}

func (r *Repository) SaveItems(ctx context.Context, events []cloudevents.Event) error {
	batch, err := r.conn.PrepareBatch(ctx, "INSERT INTO items")
	if err != nil {
		return err
	}

	for _, e := range events {
		var i domain.Item
		if err := e.DataAs(&i); err != nil {
			fmt.Printf("Warning: failed to unmarshal item event data: %v\n", err)
			continue
		}

		err := batch.Append(
			i.ID, i.Name, i.Description, i.Plaintext, i.Version,
			i.Gold.Base, i.Gold.Purchasable, i.Gold.Total, i.Gold.Sell,
			i.Stats,
		)
		if err != nil {
			return err
		}
	}

	return batch.Send()
}

func (r *Repository) SaveRunes(ctx context.Context, events []cloudevents.Event) error {
	batch, err := r.conn.PrepareBatch(ctx, "INSERT INTO runes")
	if err != nil {
		return err
	}

	for _, e := range events {
		var run domain.Rune
		if err := e.DataAs(&run); err != nil {
			fmt.Printf("Warning: failed to unmarshal rune event data: %v\n", err)
			continue
		}

		err := batch.Append(
			run.ID, run.Key, run.Icon, run.Name, run.ShortDesc, run.LongDesc, run.TreeID, run.Version,
		)
		if err != nil {
			return err
		}
	}

	return batch.Send()
}
