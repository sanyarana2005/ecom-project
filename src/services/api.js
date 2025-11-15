// API Service for BookMyCampus
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic API call method
  async apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || 'API request failed');
      }

      if (!response.ok) {
        // Extract error message from response
        const errorMessage = data.message || data.error || `API request failed (${response.status})`;
        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }

      return data;
    } catch (error) {
      // If it's already an Error object with a message, just re-throw it
      if (error instanceof Error && error.message) {
        console.error('API Error:', error.message, 'Endpoint:', endpoint);
        throw error;
      }
      
      // Handle network errors
      if (error.message && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
        console.error('Network error - backend may be down:', endpoint);
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
      
      // Re-throw any other errors
      throw error;
    }
  }

  // Mock responses for demo purposes when backend is not available
  getMockResponse(endpoint, options) {
    console.log('Using mock data for:', endpoint);
    
    switch (endpoint) {
      case '/auth/login':
        const body = JSON.parse(options.body || '{}');
        const users = [
          { email: 'student@college.edu', password: 'student123', user: { id: 1, name: 'John Student', role: 'student', department: 'Computer Science', department_id: 1 } },
          { email: 'teacher@college.edu', password: 'teacher123', user: { id: 2, name: 'Dr. Jane Teacher', role: 'teacher', department: 'Computer Science', department_id: 1 } },
          { email: 'hod@college.edu', password: 'hod123', user: { id: 3, name: 'Prof. Smith HOD', role: 'hod', department: 'Computer Science', department_id: 1 } },
        ];
        
        const foundUser = users.find(u => u.email === body.email && u.password === body.password);
        if (foundUser) {
          return { token: 'mock-jwt-token', user: foundUser.user };
        } else {
          throw new Error('Invalid credentials');
        }
        
      case '/auth/me':
        // Return the current user based on the token (in a real app, this would be decoded from JWT)
        const token = this.getToken();
        if (token === 'mock-jwt-token') {
          // For demo purposes, return HOD user data
          return { user: { id: 3, name: 'Prof. Smith HOD', role: 'hod', department: 'Computer Science', department_id: 1 } };
        }
        return { user: { id: 1, name: 'John Student', role: 'student', department: 'Computer Science', department_id: 1 } };
        
      case '/calendar/events':
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfter = new Date(today);
        dayAfter.setDate(dayAfter.getDate() + 2);
        
        return [
          {
            id: 1,
            title: 'CS Department Meeting',
            resource: 'Seminar Hall',
            start: tomorrow.toISOString().split('T')[0] + 'T10:00:00',
            end: tomorrow.toISOString().split('T')[0] + 'T12:00:00',
            purpose: 'Department meeting',
            status: 'approved',
            type: 'booking',
            requester: 'Dr. Jane Teacher',
            requesterId: 2
          },
          {
            id: 2,
            title: 'Data Structures Lab',
            resource: 'Lab',
            start: dayAfter.toISOString().split('T')[0] + 'T14:00:00',
            end: dayAfter.toISOString().split('T')[0] + 'T16:00:00',
            purpose: 'Practical session',
            status: 'approved',
            type: 'booking',
            requester: 'Dr. Jane Teacher',
            requesterId: 2
          },
          {
            id: 3,
            title: 'Regular Class',
            resource: 'Seminar Hall',
            start: today.toISOString().split('T')[0] + 'T09:00:00',
            end: today.toISOString().split('T')[0] + 'T11:00:00',
            purpose: 'Scheduled class',
            status: 'approved',
            type: 'timetable',
            requester: 'System',
            requesterId: 0
          }
        ];
        
      case '/bookings/my':
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 3);
        return [
          {
            id: 1,
            title: 'My Lab Session',
            resource: 'Lab',
            start: futureDate.toISOString().split('T')[0] + 'T10:00:00',
            end: futureDate.toISOString().split('T')[0] + 'T12:00:00',
            purpose: 'Research work',
            status: 'pending',
            requester: 'John Student',
            requesterId: 1
          }
        ];
        
      case '/bookings/pending':
        const pendingDate = new Date();
        pendingDate.setDate(pendingDate.getDate() + 3);
        const pendingRequests = [
          {
            id: 1,
            title: 'Student Lab Request',
            resource: 'Lab',
            start: pendingDate.toISOString().split('T')[0] + 'T10:00:00',
            end: pendingDate.toISOString().split('T')[0] + 'T12:00:00',
            purpose: 'Research work for final year project',
            status: 'pending',
            requesterName: 'John Student',
            requesterId: 1,
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            title: 'Seminar Hall Booking',
            resource: 'Seminar Hall',
            start: pendingDate.toISOString().split('T')[0] + 'T14:00:00',
            end: pendingDate.toISOString().split('T')[0] + 'T16:00:00',
            purpose: 'Workshop presentation on AI and Machine Learning',
            status: 'pending',
            requesterName: 'Dr. Jane Teacher',
            requesterId: 2,
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            title: 'Auditorium Event',
            resource: 'Auditorium',
            start: pendingDate.toISOString().split('T')[0] + 'T18:00:00',
            end: pendingDate.toISOString().split('T')[0] + 'T20:00:00',
            purpose: 'Annual college cultural fest opening ceremony',
            status: 'pending',
            requesterName: 'Sarah Johnson',
            requesterId: 4,
            createdAt: new Date().toISOString()
          }
        ];
        console.log('Returning pending requests:', pendingRequests);
        return pendingRequests;
        
      case '/bookings':
        if (options.method === 'POST') {
          const body = JSON.parse(options.body || '{}');
          return {
            id: Date.now(),
            ...body,
            status: body.resource === 'Lab' ? 'approved' : 'pending'
          };
        }
        break;
        
      case '/resources':
        return [
          { id: 1, name: 'Seminar Hall', capacity: 100 },
          { id: 2, name: 'Auditorium', capacity: 500 },
          { id: 3, name: 'Lab', capacity: 30 }
        ];
        
      case '/departments':
        return [
          { id: 1, name: 'Computer Science' },
          { id: 2, name: 'Electronics' },
          { id: 3, name: 'Mechanical' }
        ];
        
      default:
        if (endpoint.startsWith('/bookings/') && options.method === 'PATCH') {
          const body = JSON.parse(options.body || '{}');
          return {
            id: endpoint.split('/')[2],
            status: body.action === 'approve' ? 'approved' : 'rejected',
            ...body
          };
        }
        return { message: 'Mock response' };
    }
  }

  // Authentication API
  async login(email, password) {
    const response = await this.apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async signup(email, password, name, role, department = 'Computer Science', department_id = 1) {
    const response = await this.apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ 
        email, 
        password, 
        name, 
        role, 
        department, 
        department_id 
      }),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async getCurrentUser() {
    return this.apiCall('/auth/me');
  }

  async logout() {
    this.setToken(null);
  }

  // Calendar API
  async getCalendarEvents(resourceId = null) {
    const params = resourceId ? `?resource_id=${resourceId}` : '';
    return this.apiCall(`/calendar/events${params}`);
  }

  // Bookings API
  async createBooking(bookingData) {
    return this.apiCall('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getMyBookings() {
    return this.apiCall('/bookings/my');
  }

  async getPendingBookings(departmentId = null) {
    const params = departmentId ? `?department_id=${departmentId}` : '';
    return this.apiCall(`/bookings/pending${params}`);
  }

  async approveBooking(bookingId) {
    return this.apiCall(`/bookings/${bookingId}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'approve' }),
    });
  }

  async rejectBooking(bookingId, reason = '') {
    return this.apiCall(`/bookings/${bookingId}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'reject', reason }),
    });
  }

  async cancelBooking(bookingId) {
    return this.apiCall(`/bookings/${bookingId}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'cancel' }),
    });
  }

  // Resources API
  async getResources() {
    return this.apiCall('/resources');
  }

  async getDepartments() {
    return this.apiCall('/departments');
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
