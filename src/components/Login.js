import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const { login } = useAuth();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError('');
    // Clear any previous credentials - user must enter their own
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brutal-white flex">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Image with Overlaid Text (Full Left Half) */}
        <div className="hidden lg:flex relative min-h-screen w-full overflow-hidden bg-white">
          {/* Background Image - Fills the complete left half */}
          <img 
            src="/login-hero-image.jpeg" 
            alt="BookMyCampus" 
            className="w-full h-full object-contain pl-8"
          />
          
          {/* White Box with Welcome Text - Enhanced and Centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white border-4 border-brutal-black shadow-brutal-lg px-8 py-8 max-w-[400px] w-full mx-8 transform hover:scale-105 transition-transform duration-300">
              {/* Overlaid Text Content - Centered */}
              <div className="flex flex-col items-center justify-center text-center">
                {/* White Box with Welcome Text */}
                <div className="mb-4 w-full">
                  <h2 className="text-4xl font-black text-brutal-black uppercase tracking-wide mb-3">
                    WELCOME
                  </h2>
                </div>
                {/* BookMyCampus Text */}
                <p className="text-2xl font-black text-brutal-black tracking-wide">
                  BookMyCampus
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
          {/* Header Section */}
          <div className="text-center mb-8 lg:hidden">
            <div className="mx-auto h-12 w-12 flex items-center justify-center bg-brutal-black border-2 border-brutal-black shadow-brutal-sm mb-4">
              <svg className="h-6 w-6 text-brutal-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="brutalist-title mb-2">
              COLLEGE <span className="text-brutal-yellow">RESOURCE</span> BOOKING
            </h1>
            <p className="brutalist-text text-center">
              Sign in to book resources
            </p>
          </div>
        
        {/* Role Selection */}
        {!selectedRole ? (
          <div className="brutalist-card p-8">
            <h2 className="text-lg font-bold text-brutal-black mb-6 text-center uppercase tracking-wide">
              Select Your Role
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect('student')}
                className="w-full brutalist-button-accent text-left flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-brutal-yellow border-2 border-brutal-black mr-3 flex items-center justify-center">
                    <svg className="h-4 w-4 text-brutal-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="font-bold">Student</span>
                </div>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button
                onClick={() => handleRoleSelect('teacher')}
                className="w-full brutalist-button-accent text-left flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-brutal-orange border-2 border-brutal-black mr-3 flex items-center justify-center">
                    <svg className="h-4 w-4 text-brutal-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <span className="font-bold">Teacher</span>
                </div>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button
                onClick={() => handleRoleSelect('hod')}
                className="w-full brutalist-button-accent text-left flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-brutal-purple border-2 border-brutal-black mr-3 flex items-center justify-center">
                    <svg className="h-4 w-4 text-brutal-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-bold">HOD (Head of Department)</span>
                </div>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          /* Login Form */
          <div className="brutalist-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-brutal-black uppercase tracking-wide">
                {selectedRole === 'hod' ? 'HOD Login' : `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login`}
              </h2>
              <button
                onClick={() => setSelectedRole(null)}
                className="brutalist-button px-3 py-1 text-xs"
              >
                Back
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-brutal-black mb-1 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="brutalist-input w-full"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-xs font-bold text-brutal-black mb-1 uppercase tracking-wide">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="brutalist-input w-full"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="brutalist-button-secondary w-full text-sm uppercase tracking-wide"
                >
                  Don't have an account? Sign Up
                </button>
              </div>
            </form>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
