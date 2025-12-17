package item

import (
	"time"

	"github.com/google/uuid"
)

type Item struct {
	IID         uuid.UUID
	OID         string
	CreatedTime time.Time
	Name        string
	PID         string
}
