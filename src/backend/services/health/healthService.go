package health

import (
	"context"
)

type HealthServiceImplementation struct {
	UnimplementedHealthServer
}

func (s *HealthServiceImplementation) Check(ctx context.Context, req *HealthCheckRequest) (*HealthCheckResponse, error) {
    return &HealthCheckResponse{Status: "OK"}, nil
}