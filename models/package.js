const pool = require('../config/database');

// Get packages by destination
exports.getPackagesByDestination = async (destinationId) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM packages WHERE destination_id = ?', 
      [destinationId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// Get package by ID
exports.getPackageById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM packages WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}