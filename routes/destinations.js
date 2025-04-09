const express = require('express');
const router = express.Router();
const destinationModel = require('../models/destination');
const packageModel = require('../models/package');
const reviewModel = require('../models/review');

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await destinationModel.getAllDestinations();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get destination with packages and reviews
router.get('/:id', async (req, res) => {
  try {
    const destination = await destinationModel.getDestinationById(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    
    const packages = await packageModel.getPackagesByDestination(req.params.id);
    const reviews = await reviewModel.getReviewsByDestination(req.params.id);
    
    res.json({
      ...destination,
      packages,
      reviews
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;