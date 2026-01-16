# ROAMSTER Full Stack Setup Guide

Complete guide to set up both frontend and backend.

## Architecture Overview

```
Frontend (React Native) ←→ Backend (Node.js/Express) ←→ Databases (MongoDB + PostgreSQL)
```

## Prerequisites

- Node.js 18+ (v20+ recommended)
- MongoDB 6+
- PostgreSQL 14+
- Redis 6+ (optional, for queue)
- npm or yarn

## Step 1: Clone/Setup Project

```bash
# Navigate to project root
cd travel-app
```

## Step 2: Frontend Setup

```bash
# Install dependencies
npm install

# Start Expo development server
npm start
```

Frontend runs on Expo (default port 8081)

## Step 3: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# At minimum, set:
# - DB credentials
# - JWT_SECRET
# - MONGODB_URI
```

## Step 4: Database Setup

### MongoDB

```bash
# Start MongoDB
mongod

# Or using Homebrew (macOS)
brew services start mongodb-community

# Or using systemd (Linux)
sudo systemctl start mongod
```

### PostgreSQL

```bash
# Create database
createdb roamster_db

# Or using psql
psql -U postgres
CREATE DATABASE roamster_db;
\q
```

### Redis (Optional)

```bash
# Start Redis
redis-server

# Or using Homebrew (macOS)
brew services start redis

# Or using systemd (Linux)
sudo systemctl start redis
```

## Step 5: Start Backend

```bash
cd backend
npm run dev
```

Backend runs on `http://localhost:3000`

## Step 6: Configure Frontend API URL

Edit `src/services/api.js`:

```javascript
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'  // For emulator
  : 'http://YOUR_IP:3000/api';    // For physical device
```

For physical device, find your IP:
- Mac/Linux: `ifconfig | grep "inet "`
- Windows: `ipconfig`

## Step 7: Test the Setup

### Test Backend

```bash
# Health check
curl http://localhost:3000/health

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test"}'
```

### Test Frontend

1. Open Expo Go app on your device
2. Scan QR code from `npm start`
3. App should load
4. Complete onboarding
5. Create a trip
6. Check if recommendations load

## Development Workflow

### Terminal 1: Frontend
```bash
npm start
```

### Terminal 2: Backend
```bash
cd backend
npm run dev
```

### Terminal 3: MongoDB (if not running as service)
```bash
mongod
```

## Project Structure

```
travel-app/
├── src/                    # Frontend React Native code
│   ├── screens/           # App screens
│   ├── services/          # API service layer
│   ├── context/           # State management
│   └── components/        # Reusable components
├── backend/               # Backend server
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── models/        # Database models
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Auth, error handling
│   │   └── config/       # Database, Redis config
│   └── package.json
└── package.json           # Frontend package.json
```

## Environment Variables

### Frontend
No environment variables needed (uses `__DEV__` flag)

### Backend (.env)
```env
# Server
PORT=3000
NODE_ENV=development

# Databases
DB_HOST=localhost
DB_PORT=5432
DB_NAME=roamster_db
DB_USER=postgres
DB_PASSWORD=postgres
MONGODB_URI=mongodb://localhost:27017/roamster

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d

# Redis (optional)
REDIS_HOST=localhost
REDIS_PORT=6379

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-password

# SMS (optional)
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=+1234567890

# CORS
CORS_ORIGIN=http://localhost:8081
```

## Common Issues

### Frontend can't connect to backend
1. Check backend is running: `curl http://localhost:3000/health`
2. Check CORS_ORIGIN in backend `.env`
3. For physical device, use IP address instead of localhost
4. Check firewall settings

### Database connection errors
1. Verify databases are running
2. Check connection strings in `.env`
3. Verify credentials

### Port conflicts
- Change PORT in backend `.env`
- Or kill process using port:
  ```bash
  # Find process
  lsof -i :3000
  # Kill process
  kill -9 <PID>
  ```

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use production databases
3. Set secure JWT_SECRET
4. Enable HTTPS
5. Use PM2 or similar process manager

### Frontend
1. Build with EAS Build or Expo
2. Update API_BASE_URL to production URL
3. Configure app.json for production

## Next Steps

1. ✅ Backend architecture implemented
2. ✅ Frontend API integration
3. ⏳ Implement full recommendation logic
4. ⏳ Add real weather API
5. ⏳ Integrate payment gateway
6. ⏳ Add real-time notifications
7. ⏳ Implement caching
8. ⏳ Add analytics

## Support

- Backend API docs: `backend/README.md`
- Architecture docs: `ARCHITECTURE.md`
- Backend setup: `BACKEND_SETUP.md`

