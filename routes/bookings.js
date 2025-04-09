const express = require('express');
const router = express.Router();
const bookingModel = require('../models/booking');
const packageModel = require('../models/package');

// Create new booking
router.post('/', async (req, res) => {
  try {
    // Get package price
    const package = await packageModel.getPackageById(req.body.package_id);
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }
    
    // Calculate total price
    const total_price = package.price * req.body.guests;
    
    // Create booking
    const booking = await bookingModel.createBooking({
      ...req.body,
      total_price
    });
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bookings by email
router.get('/email/:email', async (req, res) => {
  try {
    const bookings = await bookingModel.getBookingsByEmail(req.params.email);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;