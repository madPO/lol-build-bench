package patch

import (
	"encoding/json"
	"lol-build-bench/entities/patch"
	"lol-build-bench/features/applicationScope"
)

func OpenPatchQueue(scope applicationScope.Scope) (func(patch.CreatePatchEvent) error, func() error, error) {
	var insertQuery = `
		INSERT INTO patches (event_id, oid, created_time, source, specversion, type, datacontenttype, subject, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	builder := func() (func(applicationScope.Scope, patch.CreatePatchEvent) error, func(applicationScope.Scope) error, error) {
		return func(scope applicationScope.Scope, event patch.CreatePatchEvent) error {
				jsonData, err := json.Marshal(event.Data)
				if err != nil {
					return err
				}

				return scope.Connection.Exec(scope.Context, insertQuery, event.EventId,
					event.OID,
					event.CreatedTime,
					event.Source,
					event.SpecVersion,
					event.Type,
					event.DataContentType,
					event.Subject,
					string(jsonData))
			},
			func(scope applicationScope.Scope) error {
				return nil
			}, nil
	}

	return applicationScope.OpenQueue(scope, builder)
}
