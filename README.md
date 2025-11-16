# BookMyCampus

A full-stack web application for booking college resources (Seminar Hall, Auditorium, Lab) with HOD approval workflow.

## 🚀 Quick Start

### Easiest Way: Run Both Together! ⭐

```bash
./start-all.sh
```

This starts both backend and frontend automatically!

Then open: **http://localhost:3000**

Press **Ctrl+C** to stop both servers.

---

### Alternative: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python app.py
```

**Terminal 2 - Frontend:**
```bash
npm start
```

---

## ✨ Features

- ✅ **User Authentication**: Sign up and login with role-based access
- ✅ **Resource Booking**: Book Seminar Hall, Auditorium, or Lab
- ✅ **Calendar View**: Visual calendar with all bookings
- ✅ **HOD Approval**: HOD can approve/reject booking requests
- ✅ **Conflict Detection**: Prevents double-booking
- ✅ **Secure Passwords**: Bcrypt password hashing
- ✅ **Database**: SQLite database with automatic setup

---

## 🎯 User Roles

- **Student**: Can book resources and view calendar
- **Teacher**: Can book resources and view calendar
- **HOD**: Can approve/reject bookings and view all requests

---

## 🔐 Demo Accounts

- **Student**: `student@college.edu` / `student123` OR `student@gmail.com` / `Student`
- **Teacher**: `teacher@college.edu` / `teacher123` OR `teacher@gmail.com` / `Teacher`
- **HOD**: `hod@college.edu` / `hod123` OR `hod@gmail.com` / `hod`

Or create your own account at `/signup`

---

## 🛠️ Technology Stack

### Backend
- Flask (Python web framework)
- SQLite (Database)
- Bcrypt (Password hashing)
- Flask-CORS (CORS support)

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- FullCalendar.js

---

## 📁 Project Structure

```
├── backend/
│   ├── app.py              # Flask backend server
│   ├── requirements.txt    # Python dependencies
│   └── college_booking.db  # SQLite database
├── src/
│   ├── components/         # React components
│   ├── services/           # API service
│   └── context/           # React Context
└── package.json           # Frontend dependencies
```

---

## 📝 API Endpoints

All API endpoints are prefixed with `/api`:

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `GET /api/resources` - Get all resources
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my` - Get my bookings
- `GET /api/bookings/pending` - Get pending bookings (HOD)
- `PATCH /api/bookings/:id` - Approve/reject booking (HOD)
- `GET /api/calendar/events` - Get calendar events

---

## 🐛 Troubleshooting

### Backend not starting
- Check if port 8000 is available: `lsof -ti:8000`
- Verify virtual environment is activated
- Check dependencies: `pip install -r requirements.txt`

### Frontend not connecting
- Verify backend is running: `curl http://localhost:8000/health`
- Check API URL in `src/services/api.js`
- Check browser console for errors

### Login issues
- Ensure backend is running
- Check email is lowercase (auto-normalized)
- Verify password matches (case-sensitive)
- Try creating a new account

---

## 🎉 Getting Started

1. **Start Backend**: `cd backend && source venv/bin/activate && python app.py`
2. **Start Frontend**: `npm start`
3. **Open Browser**: `http://localhost:3000`
4. **Sign Up** or **Login** with demo accounts
5. **Start Booking!**

---

**Made with ❤️ for College Resource Management**
