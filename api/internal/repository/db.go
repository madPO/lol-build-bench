package repository

import (
	"context"
	"fmt"
	"os"
	"sync"

	"github.com/ClickHouse/clickhouse-go/v2/lib/driver"
	"import-cli/internal/data/clickhouse"
)

var (
	instance driver.Conn
	once     sync.Once
)

// GetDB returns a singleton ClickHouse connection
func GetDB() (driver.Conn, error) {
	var err error
	once.Do(func() {
		host := getEnv("CLICKHOUSE_HOST", "localhost:9000")
		user := getEnv("CLICKHOUSE_USER", "default")
		password := getEnv("CLICKHOUSE_PASSWORD", "")
		database := getEnv("CLICKHOUSE_DATABASE", "default")

		instance, err = clickhouse.Connect(context.Background(), host, user, password, database)
		if err != nil {
			err = fmt.Errorf("failed to connect to ClickHouse: %w", err)
		}
	})
	return instance, err
}

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

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
