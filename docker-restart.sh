#!/bin/bash

# Script to rebuild and restart Flipt Docker containers
# This will rebuild the Docker images and restart the services

set -e

echo "🛑 Stopping existing containers..."
docker-compose down

echo "🔨 Rebuilding Docker images..."
docker-compose build --no-cache

echo "🚀 Starting containers..."
docker-compose up -d

echo "📋 Container status:"
docker-compose ps

echo ""
echo "✅ Docker containers have been rebuilt and restarted!"
echo "📊 View logs with: docker-compose logs -f"
echo "🌐 Server should be available at: http://localhost:8080"
echo "🎨 UI should be available at: http://localhost:5173"

