const pool = require('../config/database');

// Create new review
exports.createReview = async (reviewData) => {
  const { name, destination_id, rating, comment } = reviewData;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO reviews (name, destination_id, rating, comment) VALUES (?, ?, ?, ?)',
      [name, destination_id, rating, comment]
    );
    return { id: result.insertId, ...reviewData };
  } catch (error) {
    throw error;
  }
}

// Get reviews by destination
exports.getReviewsByDestination = async (destinationId) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM reviews WHERE destination_id = ? ORDER BY review_date DESC',
      [destinationId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}   