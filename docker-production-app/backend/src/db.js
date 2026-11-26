
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5433,
  database: process.env.DB_NAME || 'products_db',
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'devpassword',
});

pool.on('error', (error) => {
  console.error('Unexpected database error:', error);
});

module.exports = pool;
