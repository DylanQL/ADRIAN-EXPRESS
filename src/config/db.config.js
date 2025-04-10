const mysql = require('mysql2/promise');
const { initializeDatabase } = require('./init-db');

// Maximum number of connection attempts
const MAX_RETRIES = 10;
const RETRY_INTERVAL = 5000; // 5 seconds

// Create a connection pool to the database
const createPool = () => {
  return mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'inventory_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};

// Initialize pool as null
let pool = null;

// Function to connect with retries
async function connectWithRetry(retries = MAX_RETRIES) {
  try {
    console.log('Attempting to connect to database...');
    
    // Try to initialize the database first
    await initializeDatabase();
    
    // Create the connection pool
    pool = createPool();
    
    // Test the connection
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
    
    return pool;
  } catch (error) {
    if (retries > 0) {
      console.log(`Failed to connect to database. Retries left: ${retries}`);
      console.log(`Retrying in ${RETRY_INTERVAL/1000} seconds...`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      
      // Retry connection
      return connectWithRetry(retries - 1);
    } else {
      console.error('Maximum connection retries reached. Could not connect to database:', error);
      throw error;
    }
  }
}

// Initialize connection
connectWithRetry()
  .then(() => console.log('Database connection pool initialized'))
  .catch(err => {
    console.error('Failed to initialize database connection pool:', err);
    process.exit(1); // Exit if we can't connect to the database
  });

// Export the pool getter to ensure we always have the latest pool
module.exports = {
  getPool: () => pool
};
