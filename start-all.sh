#!/bin/bash
# Start both Backend and Frontend together

echo "🚀 Starting BookMyCampus..."
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Trap Ctrl+C and cleanup
trap cleanup SIGINT SIGTERM

# Kill existing processes on ports 8000 and 3000
echo "🧹 Cleaning up existing processes..."
kill -9 $(lsof -ti:8000) 2>/dev/null
kill -9 $(lsof -ti:3000) 2>/dev/null
sleep 1

# Start Backend
echo "📦 Starting Backend Server..."
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies if needed
if [ ! -f "venv/.dependencies_installed" ]; then
    echo "Installing backend dependencies..."
    pip install -r requirements.txt > /dev/null 2>&1
    touch venv/.dependencies_installed
fi

# Start backend in background
python app.py > /tmp/backend.log 2>&1 &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Check if backend started successfully
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "❌ Backend failed to start. Check /tmp/backend.log"
    exit 1
fi

echo "✅ Backend running on http://localhost:8000 (PID: $BACKEND_PID)"
echo ""

# Go back to root directory
cd ..

# Start Frontend
echo "🎨 Starting Frontend Server..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies (this may take a minute)..."
    npm install
fi

# Start frontend in background
npm start > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!

# Wait a bit for frontend to start
sleep 5

# Check if frontend started successfully
if ! kill -0 $FRONTEND_PID 2>/dev/null; then
    echo "❌ Frontend failed to start. Check /tmp/frontend.log"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "✅ Frontend running on http://localhost:3000 (PID: $FRONTEND_PID)"
echo ""
echo "🎉 Both servers are running!"
echo ""
echo "📍 Backend:  http://localhost:8000"
echo "📍 Frontend: http://localhost:3000"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f /tmp/backend.log"
echo "   Frontend: tail -f /tmp/frontend.log"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user to stop
wait

