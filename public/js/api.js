// API client for travel website
const API_BASE_URL = '/api';

// Fetch all destinations
async function getDestinations() {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations`);
    if (!response.ok) {
      throw new Error('Failed to fetch destinations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}

// Fetch destination details with packages and reviews
async function getDestinationDetails(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch destination details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching destination details:', error);
    return null;
  }
}

// Create a booking
async function createBooking(bookingData) {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

// Get bookings by email
async function getBookingsByEmail(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/email/${email}`);
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

// Add a review
async function addReview(reviewData) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    });
    if (!response.ok) {
      throw new Error('Failed to add review');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
}