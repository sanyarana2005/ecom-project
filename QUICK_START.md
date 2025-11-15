# 🚀 Quick Start - Run Everything in One Command!

## Why Two Terminals?

Both backend and frontend are **long-running servers** that need to keep running:
- **Backend** (Flask) - Handles API requests
- **Frontend** (React) - Serves the web interface

They need to run **simultaneously**, which is why they're typically in separate terminals.

---

## ✅ Solution: Run Both Together!

### Option 1: Single Script (Easiest) ⭐

Run both servers with one command:

```bash
./start-all.sh
```

This will:
- ✅ Start backend on port 8000
- ✅ Start frontend on port 3000
- ✅ Show you both are running
- ✅ Stop both when you press Ctrl+C

**That's it!** Open `http://localhost:3000` in your browser.

---

### Option 2: Two Terminals (Traditional)

If you prefer to see logs separately:

**Terminal 1:**
```bash
cd backend
source venv/bin/activate
python app.py
```

**Terminal 2:**
```bash
npm start
```

---

### Option 3: Background Processes

Run backend in background, frontend in foreground:

```bash
# Start backend in background
cd backend && source venv/bin/activate && python app.py &

# Start frontend (this will keep terminal busy)
npm start
```

---

## 🎯 Recommended: Use `start-all.sh`

Just run:
```bash
./start-all.sh
```

Then open: **http://localhost:3000**

Press **Ctrl+C** to stop both servers.

---

## 📝 What Each Server Does

### Backend (Port 8000)
- Handles API requests
- Manages database
- Processes authentication
- Handles bookings

### Frontend (Port 3000)
- Shows the web interface
- Makes API calls to backend
- Handles user interactions
- Displays calendar and forms

**They work together** - frontend calls backend APIs to get/save data.

---

## ✅ Verification

After running `./start-all.sh`, you should see:

```
✅ Backend running on http://localhost:8000
✅ Frontend running on http://localhost:3000
```

Then open your browser to `http://localhost:3000` and start using the app!

---

**That's it! No need for two terminals anymore! 🎉**

