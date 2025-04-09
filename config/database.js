// config/database.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '123456789', // your MySQL password
  database: 'travel', // Changed from 'travel_buddy' to 'travel'
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;