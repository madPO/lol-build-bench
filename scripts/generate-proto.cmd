protoc --proto_path ./api/proto/well-known --proto_path ./api/proto --go_out=./src/backend/services --go-grpc_out=./src/backend/services ./api/proto/health.proto
protoc --proto_path ./api/proto/well-known --proto_path ./api/proto --go_out=./src/backend/services --go-grpc_out=./src/backend/services ./api/proto/query.proto
