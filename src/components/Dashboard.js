import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { bookings } = useBooking();
  const [view, setView] = useState('dayGridMonth');

  const handleLogout = () => {
    logout();
  };

  const calendarEvents = bookings.map(booking => ({
    id: booking.id,
    title: `${booking.title} (${booking.resource})`,
    start: booking.start,
    end: booking.end,
    backgroundColor: '#3B82F6', // Blue background like in the image
    borderColor: '#000000', // Black border
    textColor: '#ffffff', // White text
    extendedProps: {
      resource: booking.resource,
      purpose: booking.purpose,
      requester: booking.requester
    }
  }));

  const handleDateClick = (arg) => {
    // In a real app, this could open a booking form for the selected date
    console.log('Date clicked:', arg.dateStr);
  };

  return (
    <div className="min-h-screen bg-brutal-white">
      {/* Header */}
      <header className="bg-brutal-white border-b-4 border-brutal-black shadow-brutal-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-brutal-black border-4 border-brutal-black shadow-brutal-sm flex items-center justify-center mr-4">
                <svg className="h-8 w-8 text-brutal-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-2xl font-black text-brutal-black tracking-wide">
                BookMyCampus
              </h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-sm font-bold text-brutal-black uppercase">
                Welcome, <span className="text-brutal-yellow">{user.name.toUpperCase()}</span>
              </div>
              <button
                onClick={handleLogout}
                className="brutalist-button text-sm px-4 py-2"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              to="/book-resource"
              className="brutalist-button-accent inline-flex items-center text-lg px-8 py-4"
            >
              <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              BOOK RESOURCES
            </Link>
            
          </div>
        </div>

        {/* Resource Legend */}
        <div className="mb-8">
          <h3 className="text-lg font-black text-brutal-black mb-4 uppercase tracking-wide">Resource Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-brutal-white border-4 border-brutal-black p-3 shadow-brutal-sm">
              <div className="w-6 h-6 bg-resource-seminar border-2 border-brutal-black mr-3"></div>
              <span className="text-sm font-bold text-brutal-black uppercase">Seminar Hall</span>
            </div>
            <div className="flex items-center bg-brutal-white border-4 border-brutal-black p-3 shadow-brutal-sm">
              <div className="w-6 h-6 bg-resource-auditorium border-2 border-brutal-black mr-3"></div>
              <span className="text-sm font-bold text-brutal-black uppercase">Auditorium</span>
            </div>
            <div className="flex items-center bg-brutal-white border-4 border-brutal-black p-3 shadow-brutal-sm">
              <div className="w-6 h-6 bg-resource-lab border-2 border-brutal-black mr-3"></div>
              <span className="text-sm font-bold text-brutal-black uppercase">Lab</span>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="brutalist-card p-8">
          <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={view}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={calendarEvents}
              dateClick={handleDateClick}
              eventClick={(info) => {
                const event = info.event;
                const extendedProps = event.extendedProps;
                alert(`Event: ${event.title}\nResource: ${extendedProps.resource}\nPurpose: ${extendedProps.purpose}\nRequester: ${extendedProps.requester}`);
              }}
              height="auto"
              eventDisplay="block"
              dayMaxEvents={3}
              moreLinkClick="popover"
              nowIndicator={true}
              selectable={true}
              selectMirror={true}
              weekends={true}
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
                startTime: '08:00',
                endTime: '18:00',
              }}
            />
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-brutal-yellow border-4 border-brutal-black p-8 shadow-brutal">
          <h3 className="text-2xl font-black text-brutal-black mb-4 uppercase tracking-wide">How to Book Resources</h3>
          <ol className="list-decimal list-inside space-y-3 text-brutal-black font-bold text-lg">
            <li>Click on "BOOK RESOURCES" button above</li>
            <li>Fill in the booking form with your requirements</li>
            <li>Submit the request for HOD approval</li>
            <li>Once approved, your booking will appear on this calendar</li>
            <li>All confirmed bookings are visible to everyone</li>
          </ol>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
