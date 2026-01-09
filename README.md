# ROAMSTER - Travel Experience & Luggage-Less Platform

A React Native mobile application that enables travelers to travel luggage-less while receiving personalized AI-powered recommendations for clothing, food, experiences, and photo opportunities.

## Features

### Core Functionality

- **Trip-Based Experience**: All recommendations are scoped to active trips
- **AI-Powered Recommendations**: Context-aware suggestions for:
  - Clothing (with rent/buy options)
  - Food (dietary and group-aware)
  - Experiences (time-based and safety-filtered)
  - Photo spots & social media tips
- **Travel Group Awareness**: Adapts recommendations for:
  - Solo travelers
  - Couples
  - Families
  - Travelers with kids
  - Travelers with elderly
- **Safety-First Approach**: Filters unsafe recommendations based on travel group
- **Context Engine**: Considers weather, season, time of day, and location

### User Management

- Onboarding flow with preference setup
- User profile with long-term preferences
- Trip-specific preferences that override defaults
- Multiple trip management

### Recommendation Modules

1. **Clothing Recommendations**
   - Weather and season-based
   - Rent or buy options
   - Safety filters for kids/elderly
   - Price estimates

2. **Food Recommendations**
   - Local cuisine suggestions
   - Dietary preference filtering
   - Time-of-day appropriate meals
   - Hygiene and spice level awareness

3. **Experience Recommendations**
   - Time-based suggestions (morning/evening/night)
   - Walking intensity awareness
   - Crowd level information
   - Safety filtering

4. **Photo & Social Intelligence**
   - Best photo spots by time of day
   - Suggested angles and poses
   - Social media tips
   - Group-aware recommendations

## Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS:
```bash
cd ios && pod install && cd ..
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
- iOS: `npm run ios`
- Android: `npm run android`

## Project Structure

```
roamster/
├── App.js                 # Main app entry point
├── src/
│   ├── context/          # State management (AppContext)
│   ├── navigation/       # Navigation setup
│   ├── screens/          # All app screens
│   │   ├── OnboardingScreen.js
│   │   ├── TripSetupScreen.js
│   │   ├── HomeScreen.js
│   │   ├── RecommendationsScreen.js
│   │   ├── ClothingScreen.js
│   │   ├── ExperiencesScreen.js
│   │   └── ProfileScreen.js
│   └── services/         # Business logic
│       ├── RecommendationEngine.js
│       ├── ContextEngine.js
│       ├── ClothingService.js
│       ├── FoodService.js
│       ├── ExperienceService.js
│       └── PhotoService.js
├── package.json
└── README.md
```

## Key Technologies

- **React Native** with Expo
- **React Navigation** for routing
- **AsyncStorage** for local data persistence
- **Context API** for state management
- **Expo Location** for location services
- **Expo Notifications** for push notifications

## App Flow

1. **Onboarding**: User sets up profile and preferences
2. **Trip Setup**: User creates a trip with destination, dates, and travel group
3. **Recommendations**: AI engine generates personalized recommendations
4. **Exploration**: User browses clothing, food, experiences, and photo spots
5. **Profile**: User manages trips and preferences

## Recommendation Rules

The app follows strict safety and context-aware rules:

- **Kids/Elderly**: No night experiences, low walking intensity, comfortable clothing
- **Solo/Couples**: More flexible, fashion-forward, night experiences allowed
- **Family**: Balanced approach with safety and comfort prioritized
- **Weather**: Clothing recommendations adapt to weather conditions
- **Time of Day**: Experiences and photo spots optimized for current time

## Future Enhancements

- Integration with real weather APIs
- Clothing rental/purchase flow
- Hotel delivery integration
- Social media caption/hashtag suggestions
- Admin panel
- Analytics dashboard
- Multi-language support

## Development Notes

- The app uses mock data for weather and some recommendations
- In production, integrate with:
  - Weather API (OpenWeatherMap, etc.)
  - Real-time location services
  - Payment gateways for clothing rental/purchase
  - Push notification services

## License

This project is proprietary software.

## Contact

For questions or support, please contact the development team.

