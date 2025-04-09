// Updated app.js with proper middleware and error handling

const express = require('express');
const cors = require('cors');
const path = require('path');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes - Make sure these exist and are properly defined
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/reviews', require('./routes/reviews'));

// API error handling middleware
app.use('/api', (err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ 
    error: 'An unexpected error occurred',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Html', 'home.html'));
});

// Serve other HTML files
app.get('/:page.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Html', `${req.params.page}.html`));
});

// Handle 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).send('Something went wrong!');
});

module.exports = app;