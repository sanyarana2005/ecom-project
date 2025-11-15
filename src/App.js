import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import ApproverDashboard from './components/ApproverDashboard';
import BookingForm from './components/BookingForm';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to={user.role === 'hod' ? '/approver-dashboard' : '/user-dashboard'} />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to={user.role === 'hod' ? '/approver-dashboard' : '/user-dashboard'} />} 
          />
          <Route 
            path="/user-dashboard" 
            element={user && user.role !== 'hod' ? <UserDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/approver-dashboard" 
            element={user && user.role === 'hod' ? <ApproverDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/book-resource" 
            element={user && user.role !== 'hod' ? <BookingForm /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? (user.role === 'hod' ? '/approver-dashboard' : '/user-dashboard') : '/login'} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BookingProvider>
          <AppContent />
          <Toast />
        </BookingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
