const redis = require('redis');

let redisClient = null;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    });

    redisClient.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis Connected');
    });

    await redisClient.connect();
    return redisClient;
  } catch (error) {
    console.error('❌ Redis connection error:', error);
    // Redis is optional for queue, so we don't throw
    console.warn('⚠️  Continuing without Redis (queue features will be limited)');
    return null;
  }
};

module.exports = connectRedis;
module.exports.getRedisClient = () => redisClient;

