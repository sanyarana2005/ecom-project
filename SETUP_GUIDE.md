# Complete Setup Guide - College Resource Booking System

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8 or higher
- npm or yarn

---

## 📦 Step 1: Backend Setup

### 1.1 Navigate to backend directory
```bash
cd backend
```

### 1.2 Create virtual environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 1.3 Install dependencies
```bash
pip install -r requirements.txt
```

### 1.4 Start the backend server
```bash
python app.py
```

The backend will start on **http://localhost:8000**

**Note**: If port 8000 is in use, you can change it in `app.py` (line 617) and update `src/services/api.js` (line 2) accordingly.

---

## 🎨 Step 2: Frontend Setup

### 2.1 Navigate to project root
```bash
cd ..  # If you're in backend directory
```

### 2.2 Install dependencies
```bash
npm install
```

### 2.3 Start the frontend
```bash
npm start
```

The frontend will start on **http://localhost:3000**

---

## ✅ Step 3: Verify Setup

### Backend Health Check
```bash
curl http://localhost:8000/health
```
Should return: `{"ok": true}`

### Frontend
Open browser: `http://localhost:3000`

---

## 🔐 Step 4: Using the Application

### Option A: Sign Up (Recommended)
1. Go to `http://localhost:3000/signup`
2. Fill in:
   - Full Name
   - Email Address
   - Role (Student/Teacher/HOD)
   - Department
   - Password (min 6 characters)
   - Confirm Password
3. Click "Create Account"
4. You'll be automatically logged in

### Option B: Use Demo Accounts
If you want to use existing demo accounts:
- **Student**: `student@college.edu` / `student123`
- **Teacher**: `teacher@college.edu` / `teacher123`
- **HOD**: `hod@college.edu` / `hod123`

Go to `http://localhost:3000/login` and enter credentials.

---

## 🛠️ Troubleshooting

### Backend Issues

#### Port 8000 already in use
```bash
# Kill process on port 8000
kill -9 $(lsof -ti:8000)

# Or change port in app.py (line 617) to 8001
```

#### Module not found errors
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

#### Database errors
The database is automatically created on first run. If you need to reset:
```bash
cd backend
rm college_booking.db
python app.py  # Will recreate database
```

### Frontend Issues

#### Port 3000 already in use
```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)

# Or set different port
PORT=3001 npm start
```

#### Cannot connect to backend
1. Verify backend is running: `curl http://localhost:8000/health`
2. Check API URL in `src/services/api.js` (should be `http://localhost:8000/api`)
3. Check browser console for CORS errors

#### Login not working
1. Make sure backend is running
2. Check browser console (F12) for errors
3. Verify email is lowercase (backend normalizes emails)
4. Try signing up again with a new account

---

## 📁 Project Structure

```
e com 2/
├── backend/
│   ├── app.py              # Main Flask backend
│   ├── requirements.txt    # Python dependencies
│   ├── college_booking.db  # SQLite database (auto-created)
│   ├── venv/              # Virtual environment
│   └── README.md          # Backend documentation
├── src/
│   ├── components/        # React components
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── UserDashboard.js
│   │   └── ...
│   ├── services/
│   │   └── api.js         # API service (connects to backend)
│   └── ...
├── package.json           # Frontend dependencies
└── SETUP_GUIDE.md         # This file
```

---

## 🔧 Configuration

### Backend Port
Edit `backend/app.py` line 617:
```python
app.run(host="0.0.0.0", port=8000, debug=True)
```

### Frontend API URL
Edit `src/services/api.js` line 2:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

Or set environment variable:
```bash
REACT_APP_API_URL=http://localhost:8000/api npm start
```

---

## 🎯 Features

✅ User Registration & Authentication
✅ Role-based access (Student, Teacher, HOD)
✅ Resource Booking (Seminar Hall, Auditorium, Lab)
✅ Calendar View
✅ HOD Approval Workflow
✅ Conflict Detection
✅ Password Hashing (bcrypt)
✅ SQLite Database

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Resources
- `GET /api/resources` - Get all resources

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my` - Get my bookings
- `GET /api/bookings/pending` - Get pending bookings (HOD only)
- `PATCH /api/bookings/:id` - Approve/reject booking (HOD only)

### Calendar
- `GET /api/calendar/events` - Get calendar events

---

## 🚨 Important Notes

1. **Backend must be running** before using the frontend
2. **Email normalization**: All emails are converted to lowercase
3. **Password security**: Passwords are hashed with bcrypt
4. **Database**: SQLite database is created automatically
5. **CORS**: Backend allows requests from `http://localhost:3000`

---

## 🆘 Getting Help

If you encounter issues:

1. Check backend logs: `tail -f /tmp/backend.log`
2. Check browser console (F12) for frontend errors
3. Verify both servers are running:
   - Backend: `lsof -ti:8000`
   - Frontend: `lsof -ti:3000`
4. Try restarting both servers

---

## ✅ Final Checklist

- [ ] Backend dependencies installed
- [ ] Backend server running on port 8000
- [ ] Frontend dependencies installed
- [ ] Frontend server running on port 3000
- [ ] Can access `http://localhost:3000`
- [ ] Can sign up or log in
- [ ] Can view dashboard

---

**Happy Booking! 🎉**

