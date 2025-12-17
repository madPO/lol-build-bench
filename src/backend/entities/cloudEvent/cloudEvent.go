package cloudEvent

import (
	"time"

	"github.com/google/uuid"
)

type CloudEventer interface{}

type CloudEvent struct {
	CreatedTime     time.Time
	Source          string
	SpecVersion     string
	Type            string
	DataContentType string
	Subject         string
	EventId         uuid.UUID
}

func CreateDefaultCloudEvent(source string, eventType string, contentType string, subject string) CloudEvent {
	var eventId, _ = uuid.NewV6()
	return CloudEvent{
		CreatedTime:     time.Now().UTC(),
		Source:          source,
		SpecVersion:     "1.0",
		Type:            eventType,
		DataContentType: contentType,
		Subject:         subject,
		EventId:         eventId,
	}
}
