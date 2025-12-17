package patch

import (
	"fmt"

	"lol-build-bench/entities/cloudEvent"
)

func BuildFromEvents(events []cloudEvent.CloudEventer) (Patch, error) {
	var patch Patch

	for _, event := range events {
		switch patchEvent := event.(type) {
		case *CreatePatchEvent:
			patch = Patch{
				PID:         patchEvent.EventId,
				OID:         patchEvent.OID,
				CreatedTime: patchEvent.CreatedTime,
				Version:     patchEvent.Subject,
				Language:    patchEvent.Data.Language,
			}
		default:
			return Patch{}, fmt.Errorf("unknown event type: %T", event)
		}
	}

	return patch, nil
}
