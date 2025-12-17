package rune

import (
	"strconv"

	"lol-build-bench/entities/cloudEvent"
	"lol-build-bench/entities/dragontail"
)

type CreateRuneEvent struct {
	cloudEvent.CloudEvent
	OID  string
	PID  string
	Data FlatRune
}

type FlatRune struct {
	Id        int
	Name      string
	Key       string
	Icon      string
	ShortDesc string
	LongDesc  string
	PartOf    int
	Slot      int
}

func CreateEventFromRune(rune FlatRune, patchId string) (CreateRuneEvent, error) {
	var defaultEvent = dragontail.CreateDefaultEvent("rune.created", rune.Name)

	return CreateRuneEvent{
		CloudEvent: defaultEvent,
		OID:        strconv.Itoa(rune.Id),
		PID:        patchId,
		Data:       rune,
	}, nil
}

func BuildFlatRune(runePath dragontail.RunePathData, rune *dragontail.RuneData, slot int) FlatRune {
	if rune == nil {
		return FlatRune{
			Id:   runePath.ID,
			Name: runePath.Name,
			Key:  runePath.Key,
			Icon: runePath.Icon,
			Slot: -1,
		}
	}

	return FlatRune{
		Id:        rune.ID,
		Name:      rune.Name,
		Key:       rune.Key,
		Icon:      rune.Icon,
		ShortDesc: rune.ShortDesc,
		LongDesc:  rune.LongDesc,
		PartOf:    runePath.ID,
		Slot:      slot,
	}
}
