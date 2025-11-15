# 🚀 Commands to Run the Project

## Option 1: Run Both Together (Easiest) ⭐

```bash
cd "/Users/sanya/Downloads/e com 2"
./start-all.sh
```

Then open: **http://localhost:3000**

Press **Ctrl+C** to stop.

---

## Option 2: Run Separately

### Terminal 1 - Backend:
```bash
cd "/Users/sanya/Downloads/e com 2/backend"
source venv/bin/activate
python app.py
```

### Terminal 2 - Frontend:
```bash
cd "/Users/sanya/Downloads/e com 2"
npm start
```

---

## Option 3: Manual Step-by-Step

### Step 1: Start Backend
```bash
# Navigate to backend
cd "/Users/sanya/Downloads/e com 2/backend"

# Activate virtual environment
source venv/bin/activate

# Start server
python app.py
```

Backend will run on: **http://localhost:8000**

### Step 2: Start Frontend (New Terminal)
```bash
# Navigate to project root
cd "/Users/sanya/Downloads/e com 2"

# Start frontend
npm start
```

Frontend will run on: **http://localhost:3000**

---

## ✅ Verify It's Working

### Check Backend:
```bash
curl http://localhost:8000/health
```
Should return: `{"ok": true}`

### Check Frontend:
Open browser: **http://localhost:3000**

---

## 🛑 Stop Servers

### If using start-all.sh:
Press **Ctrl+C** in the terminal

### If running separately:
- Press **Ctrl+C** in each terminal
- Or kill processes:
```bash
kill -9 $(lsof -ti:8000)  # Stop backend
kill -9 $(lsof -ti:3000)  # Stop frontend
```

---

## 📝 Quick Reference

| Command | What It Does |
|---------|-------------|
| `./start-all.sh` | Start both servers together |
| `curl http://localhost:8000/health` | Check if backend is running |
| `lsof -ti:8000` | Check if port 8000 is in use |
| `lsof -ti:3000` | Check if port 3000 is in use |

---

## 🎯 Recommended Command

Just run this one command:

```bash
cd "/Users/sanya/Downloads/e com 2" && ./start-all.sh
```

Then open **http://localhost:3000** in your browser!

