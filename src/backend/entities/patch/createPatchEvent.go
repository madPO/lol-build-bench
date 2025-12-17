package patch

import (
	"lol-build-bench/entities/cloudEvent"
	"lol-build-bench/entities/dragontail"
)

type CreatePatchEvent struct {
	cloudEvent.CloudEvent
	OID  string
	Data dragontail.Manifest
}

func CreateEventFromManifest(manifest dragontail.Manifest) CreatePatchEvent {
	var defaultEvent = dragontail.CreateDefaultEvent("patch.create", manifest.Version)
	return CreatePatchEvent{
		CloudEvent: defaultEvent,
		OID:        manifest.Version,
		Data:       manifest,
	}
}
