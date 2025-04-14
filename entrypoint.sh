#!/bin/bash

set -e

echo "Installing dotnet-ef..."
dotnet tool install --global dotnet-ef
export PATH="$PATH:/root/.dotnet/tools"

echo "Removing previous migration"
dotnet ef migrations remove || echo  "No migration to remove"

echo "Applying EF migrations..."
dotnet ef migrations add InitialCreate \
  --project ./ZooApi/ZooApi.csproj \
  --startup-project ./ZooApi \
  || echo "Migration already exists, skipping..."

dotnet ef database update \
  --project ./ZooApi/ZooApi.csproj \
  --startup-project ./ZooApi

echo "Starting ZooApi..."
dotnet ./ZooApi/bin/Release/net9.0/ZooApi.dll
