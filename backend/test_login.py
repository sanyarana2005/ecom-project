#!/usr/bin/env python3
"""Test script to verify signup and login"""
import requests
import json

BASE_URL = "http://localhost:8000/api"

# Test signup
print("=== Testing Signup ===")
signup_data = {
    "email": "testuser@example.com",
    "password": "testpass123",
    "name": "Test User",
    "role": "student"
}
response = requests.post(f"{BASE_URL}/auth/signup", json=signup_data)
print(f"Signup Status: {response.status_code}")
print(f"Signup Response: {json.dumps(response.json(), indent=2)}")
print()

# Test login with correct password
print("=== Testing Login (Correct Password) ===")
login_data = {
    "email": "testuser@example.com",
    "password": "testpass123"
}
response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
print(f"Login Status: {response.status_code}")
print(f"Login Response: {json.dumps(response.json(), indent=2)}")
print()

# Test login with wrong password
print("=== Testing Login (Wrong Password) ===")
login_data = {
    "email": "testuser@example.com",
    "password": "wrongpass"
}
response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
print(f"Login Status: {response.status_code}")
print(f"Login Response: {json.dumps(response.json(), indent=2)}")


