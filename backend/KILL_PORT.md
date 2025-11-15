# Commands to Free Up Ports

## Check What's Using a Port

```bash
# Check what's using port 8000
lsof -ti:8000

# Or see more details
lsof -i:8000

# Check any port (replace 8000 with your port)
lsof -i:8000
```

## Kill Process Using a Port

```bash
# Kill process on port 8000
kill -9 $(lsof -ti:8000)

# Or in one command
lsof -ti:8000 | xargs kill -9

# If the above doesn't work, use:
pkill -f "python.*app.py"
```

## Alternative: Use a Different Port

If you want to avoid killing processes, you can change the port in `app.py`:

```python
app.run(host="0.0.0.0", port=8001, debug=True)  # Change 8001 to any free port
```

And update `src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8001/api';
```

## Quick Commands

```bash
# Kill backend on port 8000
kill -9 $(lsof -ti:8000) 2>/dev/null || echo "Port 8000 is free"

# Kill all Python Flask apps
pkill -f "flask\|app.py"

# Check if port is free
lsof -ti:8000 && echo "Port in use" || echo "Port is free"
```


