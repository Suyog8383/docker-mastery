
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const pool = require('./db');
const initializeDatabase = require('./init-db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Production API is running!',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'backend',
  });
});

// Get products from PostgreSQL
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY id'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({
      message: 'Failed to fetch products',
    });
  }
});

// Start application
async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Application startup failed:', error);
    process.exit(1);
  }
}

startServer();
