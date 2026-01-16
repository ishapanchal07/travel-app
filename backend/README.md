# ROAMSTER Backend API

Backend server for ROAMSTER travel recommendation platform.

## Architecture

```
Mobile App → Gateway → Auth → API Layer → Recommendation Engine → Databases
                                    ↓
                            External Services
```

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access
- **API Layer**: Trip, User, Booking, Notification, Payment, Admin, Clothes, Food, Photo, Guide
- **Recommendation Engine**: AI-powered recommendations for clothing, food, experiences, photos
- **Databases**: PostgreSQL (RDMS) and MongoDB (NoSQL)
- **External Services**: Queue (Redis), Email, SMS/WhatsApp

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- MongoDB 6+
- Redis 6+ (optional, for queue)

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Database Setup

1. **PostgreSQL**:
```sql
CREATE DATABASE roamster_db;
```

2. **MongoDB**: Runs automatically on default port

3. **Redis** (optional):
```bash
redis-server
```

### Run Server

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Trips
- `GET /api/trips` - Get all trips
- `GET /api/trips/:id` - Get single trip
- `GET /api/trips/active/current` - Get active trip
- `POST /api/trips` - Create trip
- `PUT /api/trips/:id` - Update trip
- `PUT /api/trips/:id/activate` - Activate trip
- `DELETE /api/trips/:id` - Delete trip

### Recommendations
- `GET /api/clothes?tripId=xxx` - Get clothing recommendations
- `GET /api/food?tripId=xxx` - Get food recommendations
- `GET /api/photo?tripId=xxx` - Get photo recommendations
- `GET /api/guide?tripId=xxx` - Get experience recommendations

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/preferences` - Update preferences

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read

### Payments
- `POST /api/payments/process` - Process payment

### Admin
- `GET /api/admin/stats` - Get dashboard stats (Admin only)

## Database Models

### MongoDB (NoSQL)
- User
- Trip
- Booking
- Notification

### PostgreSQL (RDMS)
- Reserved for structured data (can be extended)

## External Services

### Queue (Redis + Bull)
- Background job processing
- Email sending
- SMS notifications

### Email (Nodemailer)
- Booking confirmations
- Notifications

### SMS/WhatsApp (Twilio)
- OTP verification
- Booking updates

## Testing

```bash
npm test
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production databases
3. Set secure JWT secret
4. Enable HTTPS
5. Configure CORS properly
6. Set up monitoring and logging

