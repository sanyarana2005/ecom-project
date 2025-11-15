import React, { useState, useEffect } from 'react';
import notificationService from '../services/notificationService';

const Toast = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe(setNotifications);
    return unsubscribe;
  }, []);

  const getToastStyles = (type) => {
    const baseStyles = "rounded-lg border-2 border-black p-4 shadow-lg max-w-sm w-full";
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-100 border-green-500 text-green-800`;
      case 'error':
        return `${baseStyles} bg-red-100 border-red-500 text-red-800`;
      case 'warning':
        return `${baseStyles} bg-yellow-100 border-yellow-500 text-yellow-800`;
      case 'info':
        return `${baseStyles} bg-blue-100 border-blue-500 text-blue-800`;
      default:
        return `${baseStyles} bg-gray-100 border-gray-500 text-gray-800`;
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getToastStyles(notification.type)} transform transition-all duration-300 ease-in-out`}
          style={{
            animation: 'slideInRight 0.3s ease-out'
          }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1">
              {notification.title && (
                <h4 className="font-bold text-sm mb-1">
                  {notification.title}
                </h4>
              )}
              <p className="text-sm">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => notificationService.removeNotification(notification.id)}
              className="flex-shrink-0 ml-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;



