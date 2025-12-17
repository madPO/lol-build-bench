package champion

import (
	"lol-build-bench/entities/cloudEvent"
	"lol-build-bench/entities/dragontail"
)

// CreateChampionEvent wraps champion data as a CloudEvent for storage
type CreateChampionEvent struct {
	cloudEvent.CloudEvent
	OID  string
	PID  string
	Data dragontail.Champion
}

// CreateEventFromChampionData converts champion data to a CloudEvent wrapper
func CreateEventFromChampionData(championData dragontail.Champion, patchPID string) (CreateChampionEvent, error) {
	var defaultEvent = dragontail.CreateDefaultEvent("champion.created", championData.ID)

	return CreateChampionEvent{
		CloudEvent: defaultEvent,
		OID:        championData.ID,
		PID:        patchPID,
		Data:       championData,
	}, nil
}
