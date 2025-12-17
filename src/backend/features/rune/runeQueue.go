package rune

import (
	"encoding/json"
	"lol-build-bench/entities/rune"
	"lol-build-bench/features/applicationScope"
)

func OpenRuneQueue(scope applicationScope.Scope) (func(rune.CreateRuneEvent) error, func() error, error) {
	var insertQuery = `
		INSERT INTO runes (event_id, oid, pid, created_time, source, specversion, type, datacontenttype, subject, data)
	`

	builder := func() (func(applicationScope.Scope, rune.CreateRuneEvent) error, func(applicationScope.Scope) error, error) {
		batch, err := scope.Connection.PrepareBatch(scope.Context, insertQuery)
		if err != nil {
			return nil, nil, err
		}

		return func(scope applicationScope.Scope, event rune.CreateRuneEvent) error {
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
