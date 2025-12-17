package item

import (
	"encoding/json"
	"lol-build-bench/entities/item"
	"lol-build-bench/features/applicationScope"
)

func OpenItemQueue(scope applicationScope.Scope) (func(item.CreateItemEvent) error, func() error, error) {
	var insertQuery = `
		INSERT INTO items (event_id, oid, pid, created_time, source, specversion, type, datacontenttype, subject, data)
	`

	builder := func() (func(applicationScope.Scope, item.CreateItemEvent) error, func(applicationScope.Scope) error, error) {
		batch, err := scope.Connection.PrepareBatch(scope.Context, insertQuery)
		if err != nil {
			return nil, nil, err
		}

		return func(scope applicationScope.Scope, event item.CreateItemEvent) error {
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
