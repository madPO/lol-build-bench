package main

import (
	"fmt"
	"net"

	"lolbuildbench/services/health"

	"google.golang.org/grpc"
)

func main() {
	listener, err := net.Listen("tcp", ":8080")
	if err != nil {
		fmt.Printf("Failed to listen: %v\n", err)
		return
	}

	grpcServer := grpc.NewServer()
	health.RegisterHealthServer(grpcServer, &health.HealthServiceImplementation{})

	fmt.Println("Starting gRPC server on :8080")
	if err := grpcServer.Serve(listener); err != nil {
		fmt.Printf("Failed to serve: %v\n", err)
	}
}
