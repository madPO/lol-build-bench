package applicationScope

import (
	"context"
	"lol-build-bench/entities/cloudEvent"

	"github.com/ClickHouse/clickhouse-go/v2"
	"github.com/ClickHouse/clickhouse-go/v2/lib/driver"
)

type Scope struct {
	Context context.Context

	Connection driver.Conn
}

func Create(constext context.Context) (Scope, func() error, error) {
	connection, err := clickhouse.Open(&clickhouse.Options{
		Addr: []string{"127.0.0.1:9000"},
		Auth: clickhouse.Auth{
			Database: "default",
			Username: "default",
			Password: "123",
		},
	})

	if err != nil {
		return Scope{
			Context: constext,
		}, nil, err
	}

	var scope = Scope{
		Context:    constext,
		Connection: connection,
	}

	return scope, connection.Close, err
}

func OpenQueue[T cloudEvent.CloudEventer](scope Scope, builder func() (func(Scope, T) error, func(Scope) error, error)) (func(T) error, func() error, error) {
	internalPush, internallCommit, err := builder()

	if err != nil {
		return nil, nil, err
	}

	return func(event T) error {
			return internalPush(scope, event)
		},
		func() error {
			return internallCommit(scope)
		}, nil
}
