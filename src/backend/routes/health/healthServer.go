package health

import (
	"context"
)

type HealthServerImplementation struct {
	UnimplementedHealthServer
}

func (s *HealthServerImplementation) Check(ctx context.Context, req *HealthCheckRequest) (*HealthCheckResponse, error) {
    return &HealthCheckResponse{Status: "OK"}, nil
}