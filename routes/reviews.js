const express = require('express');
const router = express.Router();
const reviewModel = require('../models/review');

// Create new review
router.post('/', async (req, res) => {
  try {
    const review = await reviewModel.createReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reviews by destination
router.get('/destination/:id', async (req, res) => {
  try {
    const reviews = await reviewModel.getReviewsByDestination(req.params.id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;