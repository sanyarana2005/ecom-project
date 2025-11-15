// Google Calendar API Integration Service
// This service handles the integration with Google Calendar API for automatic event creation

class GoogleCalendarService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    this.clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    this.discoveryDoc = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    this.scopes = 'https://www.googleapis.com/auth/calendar';
    this.gapi = null;
    this.isInitialized = false;
  }

  // Initialize Google API
  async initialize() {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      // Load Google API script
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('client:auth2', async () => {
          try {
            await window.gapi.client.init({
              apiKey: this.apiKey,
              clientId: this.clientId,
              discoveryDocs: [this.discoveryDoc],
              scope: this.scopes
            });
            
            this.gapi = window.gapi;
            this.isInitialized = true;
            resolve();
          } catch (error) {
            console.error('Failed to initialize Google API:', error);
            reject(error);
          }
        });
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Authenticate user
  async authenticate() {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const authInstance = this.gapi.auth2.getAuthInstance();
      const user = await authInstance.signIn();
      return user;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    if (!this.isInitialized) return false;
    const authInstance = this.gapi.auth2.getAuthInstance();
    return authInstance.isSignedIn.get();
  }

  // Create calendar event
  async createEvent(eventData) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.isAuthenticated()) {
      await this.authenticate();
    }

    try {
      const event = {
        summary: eventData.title,
        description: eventData.purpose,
        start: {
          dateTime: eventData.start,
          timeZone: 'Asia/Kolkata', // Adjust timezone as needed
        },
        end: {
          dateTime: eventData.end,
          timeZone: 'Asia/Kolkata',
        },
        location: eventData.resource,
        attendees: [
          { email: eventData.requesterEmail, displayName: eventData.requester }
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'popup', minutes: 30 }, // 30 minutes before
          ],
        },
        visibility: 'public', // Make event publicly visible
        transparency: 'opaque',
      };

      const response = await this.gapi.client.calendar.events.insert({
        calendarId: 'primary', // Use primary calendar or specific calendar ID
        resource: event,
      });

      console.log('Event created:', response.result);
      return response.result;
    } catch (error) {
      console.error('Failed to create calendar event:', error);
      throw error;
    }
  }

  // Get calendar events
  async getEvents(calendarId = 'primary', timeMin, timeMax) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.isAuthenticated()) {
      await this.authenticate();
    }

    try {
      const response = await this.gapi.client.calendar.events.list({
        calendarId: calendarId,
        timeMin: timeMin || new Date().toISOString(),
        timeMax: timeMax,
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.result.items;
    } catch (error) {
      console.error('Failed to fetch calendar events:', error);
      throw error;
    }
  }

  // Update calendar event
  async updateEvent(eventId, eventData, calendarId = 'primary') {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.isAuthenticated()) {
      await this.authenticate();
    }

    try {
      const event = {
        summary: eventData.title,
        description: eventData.purpose,
        start: {
          dateTime: eventData.start,
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: eventData.end,
          timeZone: 'Asia/Kolkata',
        },
        location: eventData.resource,
      };

      const response = await this.gapi.client.calendar.events.update({
        calendarId: calendarId,
        eventId: eventId,
        resource: event,
      });

      return response.result;
    } catch (error) {
      console.error('Failed to update calendar event:', error);
      throw error;
    }
  }

  // Delete calendar event
  async deleteEvent(eventId, calendarId = 'primary') {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.isAuthenticated()) {
      await this.authenticate();
    }

    try {
      await this.gapi.client.calendar.events.delete({
        calendarId: calendarId,
        eventId: eventId,
      });

      console.log('Event deleted successfully');
      return true;
    } catch (error) {
      console.error('Failed to delete calendar event:', error);
      throw error;
    }
  }

  // Sign out
  async signOut() {
    if (!this.isInitialized) return;

    try {
      const authInstance = this.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  }
}

// Create singleton instance
const googleCalendarService = new GoogleCalendarService();

export default googleCalendarService;
