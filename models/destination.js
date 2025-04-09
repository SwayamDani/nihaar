const pool = require('../config/database');

// Get all destinations
exports.getAllDestinations = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM destinations');
    return rows;
  } catch (error) {
    throw error;
  }
}

// Get destination by ID
exports.getDestinationById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM destinations WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}