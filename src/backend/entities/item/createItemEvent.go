package item

import (
	"lol-build-bench/entities/cloudEvent"
	"lol-build-bench/entities/dragontail"
)

type CreateItemEvent struct {
	cloudEvent.CloudEvent
	OID  string
	PID  string
	Data dragontail.Item
}

func CreateEventFromItemData(itemID string, itemData dragontail.Item, patchPID string) (CreateItemEvent, error) {
	var defaultEvent = dragontail.CreateDefaultEvent("item.created", itemData.Name)

	return CreateItemEvent{
		CloudEvent: defaultEvent,
		OID:        itemID,
		PID:        patchPID,
		Data:       itemData,
	}, nil
}
