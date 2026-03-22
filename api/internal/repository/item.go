package repository

import (
	"context"
	"fmt"
	"import-cli/api/internal/models"

	"github.com/ClickHouse/clickhouse-go/v2/lib/driver"
)

type itemRepository struct {
	conn driver.Conn
}

func NewItemRepository(conn driver.Conn) ItemRepository {
	return &itemRepository{conn: conn}
}

func (r *itemRepository) GetAll(ctx context.Context, version string) ([]models.Item, error) {
	query := `SELECT 
		id, name, description, version, gold_base, gold_purchasable, gold_total, gold_sell, stats, tags
	FROM items 
	WHERE version = ?`

	rows, err := r.conn.Query(ctx, query, version)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []models.Item
	for rows.Next() {
		var i models.Item
		var g models.ItemGold
		if err := rows.Scan(
			&i.ID, &i.Name, &i.Description, &i.Version, &g.Base, &g.Purchasable, &g.Total, &g.Sell, &i.Stats, &i.Tags,
		); err != nil {
			return nil, err
		}
		i.Gold = g
		i.Image = fmt.Sprintf("%s.png", i.ID)
		items = append(items, i)
	}

	return items, nil
}

func (r *itemRepository) GetByID(ctx context.Context, version string, id string) (*models.Item, error) {
	query := `SELECT 
		id, name, description, version, gold_base, gold_purchasable, gold_total, gold_sell, stats, tags
	FROM items 
	WHERE version = ? AND id = ?`

	var i models.Item
	var g models.ItemGold
	err := r.conn.QueryRow(ctx, query, version, id).Scan(
		&i.ID, &i.Name, &i.Description, &i.Version, &g.Base, &g.Purchasable, &g.Total, &g.Sell, &i.Stats, &i.Tags,
	)
	if err != nil {
		return nil, err
	}
	i.Gold = g
	i.Image = fmt.Sprintf("%s.png", i.ID)

	return &i, nil
}
