# ROAMSTER Architecture Documentation

## System Architecture Overview

```
┌─────────────┐
│  Mobile App │
│ (React Native)│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Gateway   │
│   (Express) │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Authentication/      │
│ Authorization        │
│ (JWT Middleware)     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│         API Layer                   │
│  ┌──────┐ ┌──────┐ ┌──────────┐    │
│  │ Trip │ │ User │ │ Booking │    │
│  └──────┘ └──────┘ └──────────┘    │
│  ┌──────────┐ ┌──────────┐         │
│  │Notification│ │ Payment │         │
│  └──────────┘ └──────────┘         │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │Admin │ │Clothes│ │ Food │        │
│  └──────┘ └──────┘ └──────┘        │
│  ┌──────┐ ┌──────┐                 │
│  │Photo │ │Guide │                 │
│  └──────┘ └──────┘                 │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│    Recommendation Engine            │
│  ┌──────┐ ┌──────┐ ┌──────────┐   │
│  │Photo │ │ Food │ │Get New   │   │
│  │      │ │      │ │Data      │   │
│  └──────┘ └──────┘ └──────────┘   │
│  ┌──────────┐                      │
│  │Modeling  │                      │
│  │Data      │                      │
│  └──────────┘                      │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│         Databases                   │
│  ┌──────────┐    ┌──────────┐      │
│  │  RDMS    │    │  NoSQL   │      │
│  │(PostgreSQL)│  │ (MongoDB) │      │
│  └──────────┘    └──────────┘      │
└─────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│    External Services                │
│  ┌──────┐ ┌──────┐ ┌──────────┐   │
│  │Queue │ │Email │ │SMS/      │   │
│  │(Redis)│ │      │ │WhatsApp  │   │
│  └──────┘ └──────┘ └──────────┘   │
│  ┌──────────┐                      │
│  │Fast API  │                      │
│  │(External)│                      │
│  └──────────┘                      │
└─────────────────────────────────────┘
```

## Component Details

### 1. Mobile App (Frontend)
- **Technology**: React Native with Expo SDK 54
- **Location**: Root directory
- **Features**:
  - User authentication
  - Trip management
  - Recommendation display
  - Booking management
  - Notifications

### 2. Gateway/Infrastructure
- **Technology**: Express.js
- **Location**: `backend/src/server.js`
- **Features**:
  - Request routing
  - CORS handling
  - Security middleware (Helmet)
  - Request logging (Morgan)
  - Compression

### 3. Authentication/Authorization
- **Technology**: JWT (JSON Web Tokens)
- **Location**: `backend/src/middleware/auth.js`
- **Features**:
  - User registration
  - User login
  - Token verification
  - Role-based access control (Admin, Traveler, Partner, Creator)

### 4. API Layer

#### Trip API (`/api/trips`)
- Create, read, update, delete trips
- Activate/deactivate trips
- Get active trip

#### User API (`/api/users`)
- Profile management
- Preferences management

#### Booking API (`/api/bookings`)
- Create bookings (clothing rental/purchase)
- View booking history

#### Notification API (`/api/notifications`)
- Get notifications
- Mark as read

#### Payment API (`/api/payments`)
- Process payments
- Payment status

#### Admin API (`/api/admin`)
- Dashboard statistics
- User management
- Content management

#### Clothes API (`/api/clothes`)
- Get clothing recommendations
- Based on trip context

#### Food API (`/api/food`)
- Get food recommendations
- Based on dietary preferences and context

#### Photo API (`/api/photo`)
- Get photo spot recommendations
- Social media tips

#### Guide API (`/api/guide`)
- Get experience recommendations
- Time-based suggestions

### 5. Recommendation Engine
- **Location**: `backend/src/services/recommendationEngine.js`
- **Components**:
  - **Photo Service**: Photo spot recommendations
  - **Food Service**: Food recommendations
  - **Get New Data**: Fetches data from databases
  - **Modeling Data**: Processes and models data for recommendations

### 6. Databases

#### PostgreSQL (RDMS)
- Structured data storage
- User relationships
- Transactional data

#### MongoDB (NoSQL)
- User profiles
- Trips
- Bookings
- Notifications
- Flexible schema for recommendations

### 7. External Services

#### Queue (Redis + Bull)
- Background job processing
- Email queue
- SMS queue
- Async task handling

#### Email Service (Nodemailer)
- Booking confirmations
- Notifications
- Marketing emails

#### SMS/WhatsApp Service (Twilio)
- OTP verification
- Booking updates
- Notifications

## Data Flow Examples

### Example 1: Get Clothing Recommendations

```
1. Mobile App → POST /api/clothes?tripId=xxx
2. Gateway → Authenticate request
3. Clothes API → Get trip data
4. Recommendation Engine → Get New Data (from MongoDB/PostgreSQL)
5. Recommendation Engine → Modeling Data (process context)
6. Recommendation Engine → Clothing Service (generate recommendations)
7. Response → Mobile App
```

### Example 2: Create Booking

```
1. Mobile App → POST /api/bookings
2. Gateway → Authenticate request
3. Booking API → Create booking in MongoDB
4. Payment API → Process payment
5. Queue → Add email job (confirmation)
6. Queue → Add SMS job (notification)
7. Response → Mobile App
```

## Technology Stack

### Frontend
- React Native 0.81
- Expo SDK 54
- React Navigation v7
- AsyncStorage
- Context API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- PostgreSQL (Sequelize)
- Redis (Bull Queue)
- JWT Authentication

### External Services
- Nodemailer (Email)
- Twilio (SMS/WhatsApp)
- Redis (Queue)

## Security

- JWT token-based authentication
- Password hashing (bcrypt)
- Helmet.js for security headers
- CORS configuration
- Input validation (express-validator)
- Rate limiting (rate-limiter-flexible)

## Deployment Considerations

1. **Environment Variables**: All sensitive data in `.env`
2. **Database**: Separate production databases
3. **HTTPS**: Required for production
4. **Monitoring**: Add logging and monitoring
5. **Scaling**: Consider horizontal scaling for API
6. **CDN**: For static assets
7. **Load Balancer**: For high traffic

## API Documentation

See `backend/README.md` for detailed API endpoint documentation.

## Development Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure .env
npm run dev
```

### Frontend
```bash
npm install
npm start
```

## Next Steps

1. Implement full recommendation logic in services
2. Add real weather API integration
3. Implement payment gateway integration
4. Add real-time notifications (WebSocket)
5. Implement caching layer
6. Add analytics and monitoring
7. Set up CI/CD pipeline

