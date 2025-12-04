#!/bin/bash

# Script to quickly restart Flipt Docker containers without rebuilding
# Use this when you just want to restart the containers

set -e

echo "🛑 Stopping containers..."
docker-compose down

echo "🚀 Starting containers..."
docker-compose up -d

echo "📋 Container status:"
docker-compose ps

echo ""
echo "✅ Docker containers have been restarted!"
echo "📊 View logs with: docker-compose logs -f"

