package repository

import (
	"context"
	"import-cli/api/internal/models"
)

type ChampionRepository interface {
	GetAll(ctx context.Context, version string) ([]models.Champion, error)
	GetByID(ctx context.Context, version string, id string) (*models.Champion, error)
}

type ItemRepository interface {
	GetAll(ctx context.Context, version string) ([]models.Item, error)
	GetByID(ctx context.Context, version string, id string) (*models.Item, error)
}

type RuneRepository interface {
	GetAll(ctx context.Context, version string) ([]models.Rune, error)
	GetBranches(ctx context.Context, version string) ([]models.RuneBranch, error)
}

type Repository interface {
	Champions() ChampionRepository
	Items() ItemRepository
	Runes() RuneRepository
}
