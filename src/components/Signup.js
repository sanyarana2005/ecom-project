import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import notificationService from '../services/notificationService';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    department: 'Computer Science'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const result = await apiService.signup(
        formData.email,
        formData.password,
        formData.name,
        formData.role,
        formData.department,
        1 // department_id
      );

      if (result.token) {
        notificationService.success('Success', 'Account created successfully!');
        // Redirect based on role
        if (result.user.role === 'hod') {
          navigate('/approver-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        setError(result.message || 'Failed to create account');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brutal-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 flex items-center justify-center bg-brutal-black border-2 border-brutal-black shadow-brutal-sm mb-4">
            <svg className="h-6 w-6 text-brutal-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="brutalist-title mb-2">
            CREATE <span className="text-brutal-yellow">ACCOUNT</span>
          </h1>
          <p className="brutalist-text text-center">
            Sign up to book resources
          </p>
        </div>
        
        {/* Signup Form */}
        <div className="brutalist-card p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-brutal-black mb-1 uppercase tracking-wide">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="brutalist-input w-full"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-brutal-black mb-1 uppercase tracking-wide">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="brutalist-input w-full"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-xs font-bold text-brutal-black mb-1 uppercase tracking-wide">
                  Role *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="brutalist-input w-full"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select your role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="hod">HOD (Head of Department)</option>
                </select>
              </div>

              <div>
                <label htmlFor="department" className="block text-xs font-bold text-brutal-black mb-1 uppercase tracking-wide">
                  Department
                </label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  className="brutalist-input w-full"
                  placeholder="Enter your department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-bold text-brutal-black mb-1 uppercase tracking-wide">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="brutalist-input w-full"
                  placeholder="Enter password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-bold text-brutal-black mb-1 uppercase tracking-wide">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="brutalist-input w-full"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div className="bg-brutal-white border-2 border-brutal-black p-3 shadow-brutal-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-4 w-4 text-brutal-black" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <h3 className="text-xs font-bold text-brutal-black uppercase">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <button
                type="submit"
                disabled={loading}
                className="brutalist-button w-full text-sm uppercase tracking-wide"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brutal-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="brutalist-button-secondary w-full text-sm uppercase tracking-wide"
              >
                Already have an account? Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;


