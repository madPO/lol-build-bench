package repository

import (
	"context"
	"fmt"
	"import-cli/api/internal/models"

	"github.com/ClickHouse/clickhouse-go/v2/lib/driver"
)

type runeRepository struct {
	conn driver.Conn
}

func NewRuneRepository(conn driver.Conn) RuneRepository {
	return &runeRepository{conn: conn}
}

func (r *runeRepository) GetAll(ctx context.Context, version string) ([]models.Rune, error) {
	query := `SELECT 
		id, treeId, name, longDesc, icon
	FROM runes 
	WHERE version = ?`

	rows, err := r.conn.Query(ctx, query, version)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var runes []models.Rune
	for rows.Next() {
		var run models.Rune
		var icon string
		var idInt, branchIdInt int32
		if err := rows.Scan(
			&idInt, &branchIdInt, &run.Name, &run.Description, &icon,
		); err != nil {
			return nil, err
		}
		run.ID = fmt.Sprintf("%d", idInt)
		run.BranchID = fmt.Sprintf("%d", branchIdInt)
		run.IconURL = fmt.Sprintf("http://ddragon.leagueoflegends.com/cdn/img/%s", icon)
		runes = append(runes, run)
	}

	return runes, nil
}

func (r *runeRepository) GetBranches(ctx context.Context, version string) ([]models.RuneBranch, error) {
	// Simple mapping for common rune branches since they aren't in the DB
	branchNames := map[string]string{
		"8000": "Precision",
		"8100": "Domination",
		"8200": "Sorcery",
		"8300": "Inspiration",
		"8400": "Resolve",
	}
	branchColors := map[string]string{
		"8000": "#c89b3c",
		"8100": "#ca3e3f",
		"8200": "#6c75f5",
		"8300": "#49adad",
		"8400": "#a1d287",
	}

	query := `SELECT DISTINCT treeId FROM runes WHERE version = ?`

	rows, err := r.conn.Query(ctx, query, version)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var branches []models.RuneBranch
	for rows.Next() {
		var idInt int32
		if err := rows.Scan(&idInt); err != nil {
			return nil, err
		}
		idStr := fmt.Sprintf("%d", idInt)
		name := branchNames[idStr]
		if name == "" {
			name = fmt.Sprintf("Branch %s", idStr)
		}
		branches = append(branches, models.RuneBranch{
			ID:    idStr,
			Name:  name,
			Color: branchColors[idStr],
		})
	}

	return branches, nil
}
