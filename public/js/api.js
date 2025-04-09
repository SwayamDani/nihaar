// Enhanced API client for travel website
const API_BASE_URL = '/api';

// Add logging for debugging
function logError(message, error) {
  console.error(`${message}:`, error);
  if (error.response) {
    console.error('Response:', error.response.data);
    console.error('Status:', error.response.status);
  }
}

// Fetch all destinations
async function getDestinations() {
  try {
    console.log('Fetching destinations from:', `${API_BASE_URL}/destinations`);
    const response = await fetch(`${API_BASE_URL}/destinations`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch destinations: ${response.status} ${errorData.error || ''}`);
    }
    
    const data = await response.json();
    console.log('Destinations fetched successfully:', data.length);
    return data;
  } catch (error) {
    logError('Error fetching destinations', error);
    // Return empty array instead of throwing to prevent UI errors
    return [];
  }
}

// Fetch destination details with packages and reviews
async function getDestinationDetails(id) {
  try {
    console.log('Fetching destination details for:', id);
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch destination details: ${response.status} ${errorData.error || ''}`);
    }
    
    const data = await response.json();
    console.log('Destination details fetched successfully');
    return data;
  } catch (error) {
    logError('Error fetching destination details', error);
    return null;
  }
}

// Create a booking
async function createBooking(bookingData) {
  try {
    console.log('Creating booking with data:', bookingData);
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to create booking: ${response.status} ${errorData.error || ''}`);
    }
    
    const data = await response.json();
    console.log('Booking created successfully:', data);
    return data;
  } catch (error) {
    logError('Error creating booking', error);
    throw error;
  }
}

// Get bookings by email
async function getBookingsByEmail(email) {
  try {
    console.log('Fetching bookings for email:', email);
    const response = await fetch(`${API_BASE_URL}/bookings/email/${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch bookings: ${response.status} ${errorData.error || ''}`);
    }
    
    const data = await response.json();
    console.log('Bookings fetched successfully:', data.length);
    return data;
  } catch (error) {
    logError('Error fetching bookings', error);
    return [];
  }
}

// Add a review
async function addReview(reviewData) {
  try {
    console.log('Adding review with data:', reviewData);
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to add review: ${response.status} ${errorData.error || ''}`);
    }
    
    const data = await response.json();
    console.log('Review added successfully:', data);
    return data;
  } catch (error) {
    logError('Error adding review', error);
    throw error;
  }
}