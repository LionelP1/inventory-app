// db/testConnection.js
const pool = require('./pool'); // Adjust the path as necessary

const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()'); // Simple query to check the connection
        console.log('Database connected successfully:', res.rows[0]);
    } catch (error) {
        console.error('Database connection error:', error);
    } finally {
        await pool.end(); // Close the connection
    }
};

const testConnection2 = async () => {
  try {
      const res = await pool.query('SELECT * FROM genres LIMIT 1'); // Direct query to the genres table
      console.log('Sample from genres table:', res.rows[0]); // Print the first row
  } catch (error) {
      console.error('Error accessing genres table:', error);
  } finally {
      await pool.end(); // Close the connection
  }
};

testConnection();

testConnection2();
