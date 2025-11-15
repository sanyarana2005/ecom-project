#!/bin/bash
# Start Backend Server

cd "$(dirname "$0")/backend"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies if needed
if [ ! -f "venv/.dependencies_installed" ]; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
    touch venv/.dependencies_installed
fi

# Start backend
echo "Starting backend server on http://localhost:8000..."
python app.py

