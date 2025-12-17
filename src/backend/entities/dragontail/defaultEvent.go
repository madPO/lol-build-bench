package dragontail

import "lol-build-bench/entities/cloudEvent"

const (
	DragontailUrl         = "https://ddragon.leagueoflegends.com"
	DragontailEventPrefix = "com.leagueoflegends.ddragon."
)

func CreateDefaultEvent(eventType string, subject string) cloudEvent.CloudEvent {
	return cloudEvent.CreateDefaultCloudEvent(DragontailUrl, DragontailEventPrefix+eventType, "application/json", subject)
}
