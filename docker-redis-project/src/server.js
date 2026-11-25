
const express = require('express');
const { createClient } = require('redis');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

app.get('/', (req, res) => {
  res.json({
    message: 'Node.js + Redis API is running!',
  });
});

// Check API and Redis connection
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    redisConnected: redisClient.isReady,
  });
});

// Cache example
app.get('/cache/:key', async (req, res) => {
  try {
    const { key } = req.params;

    const cachedValue = await redisClient.get(key);

    if (cachedValue) {
      return res.json({
        source: 'Redis Cache',
        data: cachedValue,
      });
    }

    const value = `Generated value for ${key}`;

    await redisClient.set(key, value, {
      EX: 60,
    });

    res.json({
      source: 'Newly Generated',
      data: value,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong',
    });
  }
});

async function startServer() {
  try {
    await redisClient.connect();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Redis connected successfully');
    });
  } catch (error) {
    console.error('Failed to start:', error);
    process.exit(1);
  }
}

startServer();

