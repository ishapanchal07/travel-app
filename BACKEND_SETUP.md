# Backend Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and configure:
- Database credentials
- JWT secret
- Email/SMS credentials (optional)
- Redis (optional)

### 3. Set Up Databases

#### MongoDB
```bash
# Install MongoDB (if not installed)
# macOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb
# Windows: Download from mongodb.com

# Start MongoDB
mongod
```

#### PostgreSQL
```bash
# Install PostgreSQL (if not installed)
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql
# Windows: Download from postgresql.org

# Create database
createdb roamster_db
# Or using psql:
psql -U postgres
CREATE DATABASE roamster_db;
```

#### Redis (Optional - for Queue)
```bash
# Install Redis
# macOS: brew install redis
# Ubuntu: sudo apt-get install redis-server
# Windows: Download from redis.io

# Start Redis
redis-server
```

### 4. Start Backend Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:3000`

### 5. Test API

```bash
# Health check
curl http://localhost:3000/health

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

## Frontend Integration

### Update API Base URL

In `src/services/api.js`, update the `API_BASE_URL`:

```javascript
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'  // Local development
  : 'https://your-production-api.com/api';  // Production
```

### For Physical Device Testing

If testing on a physical device, use your computer's IP address:

```javascript
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.1.XXX:3000/api'  // Replace XXX with your IP
  : 'https://your-production-api.com/api';
```

Find your IP:
- **Mac/Linux**: `ifconfig | grep "inet "`
- **Windows**: `ipconfig`

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Trips
- `GET /api/trips` - Get all trips
- `POST /api/trips` - Create trip
- `GET /api/trips/active/current` - Get active trip
- `PUT /api/trips/:id` - Update trip
- `PUT /api/trips/:id/activate` - Activate trip

### Recommendations
- `GET /api/clothes?tripId=xxx` - Clothing recommendations
- `GET /api/food?tripId=xxx` - Food recommendations
- `GET /api/photo?tripId=xxx` - Photo recommendations
- `GET /api/guide?tripId=xxx` - Experience recommendations

### User
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/preferences` - Update preferences

### Bookings
- `GET /api/bookings` - Get bookings
- `POST /api/bookings` - Create booking

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh

# Or check status
brew services list  # macOS
sudo systemctl status mongod  # Linux
```

### PostgreSQL Connection Error
```bash
# Check if PostgreSQL is running
psql -U postgres -d roamster_db

# Or check status
brew services list  # macOS
sudo systemctl status postgresql  # Linux
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3001
```

### CORS Errors
Update CORS_ORIGIN in `.env`:
```
CORS_ORIGIN=http://localhost:8081
# Or for physical device:
CORS_ORIGIN=http://192.168.1.XXX:8081
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use production databases
3. Set secure JWT secret
4. Enable HTTPS
5. Configure proper CORS
6. Set up monitoring
7. Use process manager (PM2)

## Next Steps

1. Implement full recommendation logic
2. Add real weather API
3. Integrate payment gateway
4. Add WebSocket for real-time updates
5. Implement caching
6. Add analytics

