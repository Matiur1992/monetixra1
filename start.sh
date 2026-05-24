#!/bin/bash
# Render start script for Monetixra Backend

echo "=========================================="
echo "  Monetixra Backend Starting..."
echo "=========================================="

# Check Node version
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Check environment
echo "Environment: $NODE_ENV"
echo "Port: $PORT"

# Start server
echo "Starting server.js..."
node server.js
