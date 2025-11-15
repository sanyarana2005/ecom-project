import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';

const BookingForm = ({ selectedDate, onClose, onSuccess }) => {
  const { user } = useAuth();
  const { submitBookingRequest } = useBooking();
  
  const [formData, setFormData] = useState({
    title: '',
    resource: '',
    date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
    startTime: selectedDate ? selectedDate.toTimeString().slice(0, 5) : '',
    endTime: '',
    purpose: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const resources = [
    { value: 'Seminar Hall', label: 'Seminar Hall' },
    { value: 'Auditorium', label: 'Auditorium' },
    { value: 'Lab', label: 'Lab' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate form
      if (!formData.title || !formData.resource || !formData.date || !formData.startTime || !formData.endTime || !formData.purpose) {
        throw new Error('Please fill in all fields');
      }

      // Validate time
      if (formData.startTime >= formData.endTime) {
        throw new Error('End time must be after start time');
      }

      // Create datetime strings
      const startDateTime = `${formData.date}T${formData.startTime}:00`;
      const endDateTime = `${formData.date}T${formData.endTime}:00`;

      // Check if date is in the past
      const selectedDate = new Date(startDateTime);
      const now = new Date();
      if (selectedDate < now) {
        throw new Error('Cannot book resources for past dates');
      }

      const requestData = {
        title: formData.title,
        resource: formData.resource,
        start: startDateTime,
        end: endDateTime,
        purpose: formData.purpose,
        requester: user.name,
        requesterId: user.id
      };

      const result = await submitBookingRequest(requestData);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess && onSuccess();
        }, 2000);
      } else {
        setError(result.error || 'Failed to submit booking request');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 bg-green-100 border-2 border-green-500 rounded-lg mb-4">
          <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your booking request has been submitted and is pending HOD approval.
        </p>
        <p className="text-sm font-medium text-gray-900">
          Closing form...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onClose}
          className="mr-4 p-2 hover:bg-gray-100"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-black text-black uppercase tracking-wide">Book Resources</h2>
      </div>

      <div className="border-t-2 border-black pt-6 mb-8">
        <h3 className="text-xl font-black text-black uppercase tracking-wide mb-4">Resource Booking Request</h3>
        <p className="text-lg font-bold text-black">
          Fill out the form below to request a resource booking. Your request will be reviewed by the HOD.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Title */}
        <div>
          <label htmlFor="title" className="block text-lg font-black text-black uppercase tracking-wide mb-2">
            Event Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-black text-lg font-bold focus:outline-none focus:border-black"
            placeholder="E.G., DEPARTMENT MEETING, LAB SESSION"
            required
          />
        </div>

        {/* Resource Selection */}
        <div>
          <label htmlFor="resource" className="block text-lg font-black text-black uppercase tracking-wide mb-2">
            Resource *
          </label>
          <select
            id="resource"
            name="resource"
            value={formData.resource}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-black text-lg font-bold focus:outline-none focus:border-black"
            required
          >
            <option value="">SELECT A RESOURCE</option>
            {resources.map(resource => (
              <option key={resource.value} value={resource.value}>
                {resource.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-lg font-black text-black uppercase tracking-wide mb-2">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const weekday = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
              if (weekday === 0 || weekday === 6) {
                setError('Bookings are not allowed on weekends (Saturday and Sunday)');
                return;
              }
              handleChange(e);
            }}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border-2 border-black text-lg font-bold focus:outline-none focus:border-black"
            required
          />
        </div>

        {/* Time Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-lg font-black text-black uppercase tracking-wide mb-2">
              Start Time *
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-black text-lg font-bold focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-lg font-black text-black uppercase tracking-wide mb-2">
              End Time *
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-black text-lg font-bold focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label htmlFor="purpose" className="block text-lg font-black text-black uppercase tracking-wide mb-2">
            Purpose *
          </label>
          <textarea
            id="purpose"
            name="purpose"
            rows={4}
            value={formData.purpose}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-black text-lg font-bold focus:outline-none focus:border-black resize-none"
            placeholder="DESCRIBE THE PURPOSE OF THIS BOOKING..."
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 border-2 border-black p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-white uppercase">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}


        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-black text-white px-8 py-3 border-2 border-black font-black uppercase tracking-wide hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-black px-8 py-3 border-2 border-black font-black uppercase tracking-wide hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
