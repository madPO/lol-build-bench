package champion

import (
	"encoding/json"
	"lol-build-bench/entities/champion"
	"lol-build-bench/features/applicationScope"
)

// OpenChampionQueue creates a batch insertion queue for champion events
func OpenChampionQueue(scope applicationScope.Scope) (func(champion.CreateChampionEvent) error, func() error, error) {
	var insertQuery = `
		INSERT INTO champions (event_id, oid, pid, created_time, source, specversion, type, datacontenttype, subject, data)
	`

	builder := func() (func(applicationScope.Scope, champion.CreateChampionEvent) error, func(applicationScope.Scope) error, error) {
		batch, err := scope.Connection.PrepareBatch(scope.Context, insertQuery)
		if err != nil {
			return nil, nil, err
		}

		return func(scope applicationScope.Scope, event champion.CreateChampionEvent) error {
				jsonData, err := json.Marshal(event.Data)
				if err != nil {
					return err
				}

				return batch.Append(
					event.EventId,
					event.OID,
					event.PID,
					event.CreatedTime,
					event.Source,
					event.SpecVersion,
					event.Type,
					event.DataContentType,
					event.Subject,
					string(jsonData))
			},
			func(scope applicationScope.Scope) error {
				return batch.Send()
			}, nil
	}

	return applicationScope.OpenQueue(scope, builder)
}
