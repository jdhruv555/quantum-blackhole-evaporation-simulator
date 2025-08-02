#!/bin/bash

echo "🚀 Starting Quantum Black-Hole Evaporation Simulator"
echo "=================================================="

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down services..."
    pkill -f "python app.py"
    pkill -f "react-scripts"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend
echo "🔧 Starting backend server on port 5001..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "🌐 Starting frontend server on port 3000..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 Services started successfully!"
echo "=================================================="
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5001"
echo ""
echo "✅ The quantum simulation is now ready!"
echo "   - Open http://localhost:3000 in your browser"
echo "   - Adjust parameters and click 'Run Simulation'"
echo "   - Watch the Page curve evolve in real-time"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for user to stop
wait 