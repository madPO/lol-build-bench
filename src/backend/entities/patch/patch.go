package patch

import (
	"time"

	"github.com/google/uuid"
)

type Patch struct {
	PID         uuid.UUID
	OID         string
	CreatedTime time.Time
	Version     string
	Language    string
}
