
const pool = require('./db');

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Products table created successfully');

    const result = await pool.query(
      'SELECT COUNT(*) FROM products'
    );

    if (Number(result.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO products (name, price)
        VALUES
          ('Laptop', 75000),
          ('Keyboard', 2500),
          ('Mouse', 1200)
      `);

      console.log('Sample products inserted');
    }
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

module.exports = initializeDatabase;
