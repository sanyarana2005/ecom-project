# Backend API - College Resource Booking System

Flask + SQLite backend for the College Resource Booking Portal.

## Features

- ✅ RESTful API with `/api` prefix
- ✅ JWT-like token authentication
- ✅ User authentication (Student, Teacher, HOD)
- ✅ Resource booking management
- ✅ Calendar events API
- ✅ HOD approval workflow
- ✅ Conflict detection for bookings
- ✅ CORS enabled for frontend

## Setup Instructions

### 1. Create Virtual Environment (Recommended)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Server

Make sure the virtual environment is activated, then:

```bash
python app.py
```

Or:
```bash
python3 app.py
```

**Note**: If you close the terminal, you'll need to activate the virtual environment again:
```bash
cd backend
source venv/bin/activate
python app.py
```

The server will start on `http://localhost:8000` (ports 5000-5001 are often used by macOS AirPlay)

### 3. Database

The SQLite database (`college_booking.db`) will be automatically created on first run with:
- Demo users (student, teacher, hod)
- Resources (Seminar Hall, Auditorium, Lab)
- Departments (Computer Science, Electronics, Mechanical)

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires token)

### Resources
- `GET /api/resources` - Get all resources

### Departments
- `GET /api/departments` - Get all departments

### Calendar
- `GET /api/calendar/events` - Get all calendar events
- `GET /api/calendar/events?resource_id=1` - Get events for specific resource

### Bookings
- `POST /api/bookings` - Create booking (requires auth)
- `GET /api/bookings/my` - Get my bookings (requires auth)
- `GET /api/bookings/pending` - Get pending bookings (requires HOD auth)
- `PATCH /api/bookings/:id` - Approve/reject booking (requires HOD auth)

## Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| student@college.edu | student123 | Student |
| teacher@college.edu | teacher123 | Teacher |
| hod@college.edu | hod123 | HOD |

## Authentication

All protected endpoints require an `Authorization` header:
```
Authorization: Bearer <token>
```

The token is returned from the login endpoint.

## Response Formats

All responses match the frontend's expected format (see `src/services/api.js` for mock data structure).

## Development

- Server runs in debug mode by default
- Database is SQLite (file: `college_booking.db`)
- CORS is enabled for `http://localhost:3000` (frontend)

## Notes

- Token storage is in-memory (tokens are lost on server restart)
- For production, use a proper JWT library (PyJWT) and persistent storage
- Consider using PostgreSQL/MySQL for production instead of SQLite

