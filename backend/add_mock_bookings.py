#!/usr/bin/env python3
"""
Add mock bookings for all 3 resources
These will appear in the calendar and on HOD dashboard
"""

import sqlite3
import os
from datetime import datetime, timedelta

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "college_booking.db")

def add_mock_bookings():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    # Get user IDs
    cur.execute("SELECT id FROM users WHERE role IN ('student', 'teacher') LIMIT 3")
    users = cur.fetchall()
    if not users:
        print("❌ No student/teacher users found!")
        return
    
    # Get resource IDs
    cur.execute("SELECT id, name FROM resources ORDER BY id")
    resources = cur.fetchall()
    if not resources:
        print("❌ No resources found!")
        return
    
    # Get today's date
    today = datetime.now()
    
    # Mock bookings data - spread across next 2 weeks
    mock_bookings = [
        # Seminar Hall bookings
        {
            "user_id": users[0][0],
            "resource_id": 1,  # Seminar Hall
            "title": "CS Department Meeting",
            "date": (today + timedelta(days=2)).strftime("%Y-%m-%d"),
            "start_time": "10:00",
            "end_time": "12:00",
            "purpose": "Monthly department meeting to discuss curriculum updates",
            "status": "pending"
        },
        {
            "user_id": users[1][0] if len(users) > 1 else users[0][0],
            "resource_id": 1,  # Seminar Hall
            "title": "Guest Lecture Series",
            "date": (today + timedelta(days=5)).strftime("%Y-%m-%d"),
            "start_time": "14:00",
            "end_time": "16:00",
            "purpose": "Industry expert talk on modern software development",
            "status": "pending"
        },
        {
            "user_id": users[0][0],
            "resource_id": 1,  # Seminar Hall
            "title": "Student Orientation",
            "date": (today + timedelta(days=8)).strftime("%Y-%m-%d"),
            "start_time": "09:00",
            "end_time": "11:00",
            "purpose": "New student orientation program",
            "status": "pending"
        },
        
        # Auditorium bookings
        {
            "user_id": users[0][0],
            "resource_id": 2,  # Auditorium
            "title": "Annual Tech Fest",
            "date": (today + timedelta(days=3)).strftime("%Y-%m-%d"),
            "start_time": "09:00",
            "end_time": "17:00",
            "purpose": "College annual technical festival with competitions and workshops",
            "status": "pending"
        },
        {
            "user_id": users[1][0] if len(users) > 1 else users[0][0],
            "resource_id": 2,  # Auditorium
            "title": "Convocation Ceremony",
            "date": (today + timedelta(days=7)).strftime("%Y-%m-%d"),
            "start_time": "10:00",
            "end_time": "13:00",
            "purpose": "Graduation ceremony for graduating students",
            "status": "pending"
        },
        {
            "user_id": users[0][0],
            "resource_id": 2,  # Auditorium
            "title": "Cultural Event",
            "date": (today + timedelta(days=10)).strftime("%Y-%m-%d"),
            "start_time": "18:00",
            "end_time": "21:00",
            "purpose": "College cultural night with performances",
            "status": "pending"
        },
        
        # Lab bookings
        {
            "user_id": users[0][0],
            "resource_id": 3,  # Lab
            "title": "Data Structures Lab Session",
            "date": (today + timedelta(days=1)).strftime("%Y-%m-%d"),
            "start_time": "10:00",
            "end_time": "12:00",
            "purpose": "Practical session on binary trees and graphs",
            "status": "pending"
        },
        {
            "user_id": users[1][0] if len(users) > 1 else users[0][0],
            "resource_id": 3,  # Lab
            "title": "Machine Learning Workshop",
            "date": (today + timedelta(days=4)).strftime("%Y-%m-%d"),
            "start_time": "13:00",
            "end_time": "16:00",
            "purpose": "Hands-on workshop on neural networks and deep learning",
            "status": "pending"
        },
        {
            "user_id": users[0][0],
            "resource_id": 3,  # Lab
            "title": "Web Development Lab",
            "date": (today + timedelta(days=6)).strftime("%Y-%m-%d"),
            "start_time": "14:00",
            "end_time": "17:00",
            "purpose": "Building full-stack web applications",
            "status": "pending"
        },
        {
            "user_id": users[1][0] if len(users) > 1 else users[0][0],
            "resource_id": 3,  # Lab
            "title": "Cybersecurity Lab",
            "date": (today + timedelta(days=9)).strftime("%Y-%m-%d"),
            "start_time": "09:00",
            "end_time": "12:00",
            "purpose": "Practical session on network security and encryption",
            "status": "pending"
        },
    ]
    
    # Check if bookings already exist
    cur.execute("SELECT COUNT(*) FROM bookings")
    existing_count = cur.fetchone()[0]
    
    if existing_count > 0:
        print(f"⚠️  Found {existing_count} existing bookings.")
        response = input("Do you want to add mock bookings anyway? (y/n): ")
        if response.lower() != 'y':
            print("Cancelled.")
            conn.close()
            return
    
    # Insert mock bookings
    added = 0
    for booking in mock_bookings:
        try:
            cur.execute("""
                INSERT INTO bookings (user_id, resource_id, title, date, start_time, end_time, purpose, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                booking["user_id"],
                booking["resource_id"],
                booking["title"],
                booking["date"],
                booking["start_time"],
                booking["end_time"],
                booking["purpose"],
                booking["status"]
            ))
            added += 1
        except sqlite3.IntegrityError as e:
            print(f"⚠️  Skipped duplicate booking: {booking['title']} on {booking['date']}")
        except Exception as e:
            print(f"❌ Error adding booking {booking['title']}: {str(e)}")
    
    conn.commit()
    conn.close()
    
    print(f"✅ Successfully added {added} mock bookings!")
    print("\n📅 Bookings added:")
    print("   - Seminar Hall: 3 bookings")
    print("   - Auditorium: 3 bookings")
    print("   - Lab: 4 bookings")
    print("\n💡 These bookings will appear:")
    print("   - In the calendar view for all users")
    print("   - As pending requests on the HOD dashboard")

if __name__ == "__main__":
    add_mock_bookings()

