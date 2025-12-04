#!/bin/bash

# Script to quickly rebuild and restart Flipt Docker containers
# This version uses cache for faster rebuilds

set -e

echo "🛑 Stopping existing containers..."
docker-compose down

echo "🔨 Rebuilding Docker images (with cache)..."
docker-compose build

echo "🚀 Starting containers..."
docker-compose up -d

echo "📋 Container status:"
docker-compose ps

echo ""
echo "✅ Docker containers have been rebuilt and restarted!"
echo "📊 View logs with: docker-compose logs -f"
echo "🌐 Server should be available at: http://localhost:8080"
echo "🎨 UI should be available at: http://localhost:5173"

