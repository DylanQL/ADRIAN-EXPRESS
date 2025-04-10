const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  try {
    // Create connection to MySQL server without database selection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
    });

    console.log('Connected to MySQL server');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'inventory_db';
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database ${dbName} created or already exists`);

    // Use the database
    await connection.query(`USE ${dbName}`);

    // Read SQL initialization file
    const sqlInitPath = path.join(__dirname, '../../init.sql');
    if (fs.existsSync(sqlInitPath)) {
      const sqlScript = fs.readFileSync(sqlInitPath, 'utf8');
      
      // Split the SQL script into individual statements
      const statements = sqlScript.split(';').filter(statement => statement.trim());
      
      // Execute each statement
      for (const statement of statements) {
        if (statement.trim()) {
          await connection.query(statement);
        }
      }
      console.log('Database initialized with schema and sample data');
    } else {
      console.log('SQL initialization file not found, skipping schema creation');
    }

    await connection.end();
    console.log('Database initialization complete');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
}

module.exports = { initializeDatabase };
