/**
 * Travel Buddy Web Application Launcher
 * 
 * This script provides a simple way to start the Travel Buddy web application
 * with database connectivity verification.
 */

const app = require('./app');
const pool = require('./config/database');

// Configuration
const PORT = process.env.PORT || 3000;
const API_ENDPOINT = '/api/destinations';

// Test the database connection before starting the server
async function testDatabaseConnection() {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();
    console.log('✅ Database connection successful');
    
    // Try a simple query to verify the database is set up correctly
    const [rows] = await connection.query('SELECT COUNT(*) AS count FROM destinations');
    console.log(`✅ Database query successful - Found ${rows[0].count} destinations`);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Please check your database connection settings in config/database.js');
    
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error('Tables not found. Make sure you have run the database setup script.');
    }
    
    return false;
  } finally {
    if (connection) connection.release();
  }
}

// Start the server
async function startServer() {
  // Test database connection first
  const dbConnected = await testDatabaseConnection();
  
  if (!dbConnected) {
    console.error('Unable to start server due to database connection failure.');
    process.exit(1);
  }
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║                     TRAVEL BUDDY WEB APP                       ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  🌐 Server running at: http://localhost:${PORT}                 ║
║  📊 API endpoint: http://localhost:${PORT}${API_ENDPOINT}        ║
║  🔍 API test page: http://localhost:${PORT}/api-test.html       ║
║                                                                ║
║  Press Ctrl+C to stop the server                               ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`);
  });
}

// Run the application
startServer();