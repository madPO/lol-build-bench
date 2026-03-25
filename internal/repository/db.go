package repository

import (
	"github.com/ClickHouse/clickhouse-go/v2/lib/driver"
)

type repositoryImpl struct {
	champions ChampionRepository
	items     ItemRepository
	runes     RuneRepository
}

func (r *repositoryImpl) Champions() ChampionRepository { return r.champions }
func (r *repositoryImpl) Items() ItemRepository         { return r.items }
func (r *repositoryImpl) Runes() RuneRepository         { return r.runes }

func NewRepository(conn driver.Conn) Repository {
	return &repositoryImpl{
		champions: NewChampionRepository(conn),
		items:     NewItemRepository(conn),
		runes:     NewRuneRepository(conn),
	}
}
