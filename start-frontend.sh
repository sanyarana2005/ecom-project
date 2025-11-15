#!/bin/bash
# Start Frontend Server

cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start frontend
echo "Starting frontend server on http://localhost:3000..."
npm start

