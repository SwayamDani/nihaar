const express = require('express');
const router = express.Router();
const packageModel = require('../models/package');

// Get package by ID
router.get('/:id', async (req, res) => {
  try {
    const package = await packageModel.getPackageById(req.params.id);
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;