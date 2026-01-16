const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const connectDB = require('./config/database');
const connectRedis = require('./config/redis');

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const tripRoutes = require('./routes/trip');
const bookingRoutes = require('./routes/booking');
const notificationRoutes = require('./routes/notification');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');
const clothesRoutes = require('./routes/clothes');
const foodRoutes = require('./routes/food');
const photoRoutes = require('./routes/photo');
const guideRoutes = require('./routes/guide');

// Import Middleware
const { errorHandler } = require('./middleware/errorHandler');
const { authenticate } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());
app.use(compression());

// CORS Configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8081',
  credentials: true
}));

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes);
app.use('/api/trips', authenticate, tripRoutes);
app.use('/api/bookings', authenticate, bookingRoutes);
app.use('/api/notifications', authenticate, notificationRoutes);
app.use('/api/payments', authenticate, paymentRoutes);
app.use('/api/admin', authenticate, adminRoutes);
app.use('/api/clothes', authenticate, clothesRoutes);
app.use('/api/food', authenticate, foodRoutes);
app.use('/api/photo', authenticate, photoRoutes);
app.use('/api/guide', authenticate, guideRoutes);

// Error Handler (must be last)
app.use(errorHandler);

// Start Server
const startServer = async () => {
  try {
    // Connect to Databases
    await connectDB();
    await connectRedis();
    
    app.listen(PORT, () => {
      console.log(`🚀 ROAMSTER Backend Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;

