package rune

import (
	"time"

	"github.com/google/uuid"
)

type Rune struct {
	RID         uuid.UUID
	OID         string
	Name        string
	Key         string
	Icon        string
	ShortDesc   string
	LongDesc    string
	PID         string
	CreatedTime time.Time
}
