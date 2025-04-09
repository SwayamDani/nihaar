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

// API routes
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/reviews', require('./routes/reviews'));

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'home.html'));
});

// Serve other HTML files
app.get('/:page.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', `${req.params.page}.html`));
});

// Handle 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

module.exports = app;