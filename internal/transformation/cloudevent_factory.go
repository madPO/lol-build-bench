package transformation

import (
	"fmt"
	"time"

	cloudevents "github.com/cloudevents/sdk-go/v2"
	"import-cli/internal/domain"
)

const (
	Source = "lolbench/datadragon-importer"

	TypeChampionImported = "lolbench.datadragon.champion.imported"
	TypeItemImported     = "lolbench.datadragon.item.imported"
	TypeRuneImported     = "lolbench.datadragon.rune.imported"
)

func NewChampionEvent(champion domain.Champion, id string, t time.Time) (cloudevents.Event, error) {
	return newEvent(TypeChampionImported, champion.ID, champion, id, t)
}

func NewItemEvent(item domain.Item, id string, t time.Time) (cloudevents.Event, error) {
	return newEvent(TypeItemImported, item.ID, item, id, t)
}

func NewRuneEvent(rune domain.Rune, id string, t time.Time) (cloudevents.Event, error) {
	return newEvent(TypeRuneImported, fmt.Sprintf("%d", rune.ID), rune, id, t)
}

func newEvent(eventType, subject string, data interface{}, id string, t time.Time) (cloudevents.Event, error) {
	event := cloudevents.NewEvent()
	event.SetID(id)
	event.SetSource(Source)
	event.SetType(eventType)
	event.SetSubject(subject)
	event.SetTime(t)

	if err := event.SetData(cloudevents.ApplicationJSON, data); err != nil {
		return event, fmt.Errorf("failed to set event data: %w", err)
	}

	return event, nil
}
