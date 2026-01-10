# ROAMSTER Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Studio (for Android development)

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Expo Development Server**
   ```bash
   npm start
   ```

3. **Run on Device/Emulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## Project Structure Overview

```
roamster/
├── App.js                      # Main entry point
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── babel.config.js             # Babel configuration
├── src/
│   ├── context/
│   │   └── AppContext.js       # Global state management
│   ├── navigation/
│   │   ├── AppNavigator.js    # Main navigation logic
│   │   └── MainTabs.js         # Bottom tab navigator
│   ├── screens/               # All app screens
│   │   ├── LoadingScreen.js
│   │   ├── OnboardingScreen.js
│   │   ├── TripSetupScreen.js
│   │   ├── HomeScreen.js
│   │   ├── RecommendationsScreen.js
│   │   ├── ClothingScreen.js
│   │   ├── ExperiencesScreen.js
│   │   └── ProfileScreen.js
│   ├── services/              # Business logic & AI engine
│   │   ├── RecommendationEngine.js
│   │   ├── ContextEngine.js
│   │   ├── ClothingService.js
│   │   ├── FoodService.js
│   │   ├── ExperienceService.js
│   │   └── PhotoService.js
│   └── utils/
│       └── constants.js       # App constants
└── README.md
```

## Key Features Implementation

### 1. User Onboarding
- Multi-step onboarding flow
- Captures user preferences (gender, clothing size, dietary preferences, travel style, social intent)
- Data persisted using AsyncStorage

### 2. Trip Setup
- Mandatory trip creation before accessing recommendations
- Captures: destination, dates, travel group, accommodation, safety sensitivity, comfort level
- Trip becomes active context for all recommendations

### 3. AI Recommendation Engine
- Context-aware recommendations based on:
  - Destination & weather
  - Travel dates & season
  - Time of day
  - Travel group type
  - User preferences
- Safety-first filtering for kids/elderly
- Real-time context updates

### 4. Recommendation Modules
- **Clothing**: Weather-based, rent/buy options, safety filters
- **Food**: Local cuisine, dietary preferences, time-based
- **Experiences**: Time-of-day optimized, walking intensity aware
- **Photos**: Best spots, angles, poses, social media tips

## Data Flow

1. User completes onboarding → Preferences saved
2. User creates trip → Trip becomes active
3. App loads → RecommendationEngine generates recommendations
4. User navigates → Recommendations filtered by active tab/section
5. Context changes → Recommendations refresh automatically

## State Management

- Uses React Context API for global state
- AsyncStorage for persistence
- State includes:
  - User profile & preferences
  - Active trip
  - All trips
  - Onboarding status

## Customization

### Adding New Destinations
Edit `src/services/ContextEngine.js` to add weather data for new cities.

### Adding Recommendation Data
- Clothing: `src/services/ClothingService.js`
- Food: `src/services/FoodService.js`
- Experiences: `src/services/ExperienceService.js`
- Photos: `src/services/PhotoService.js`

### Modifying Safety Rules
Edit the filtering logic in:
- `src/services/RecommendationEngine.js` (validateRecommendations)
- Individual service files (applySafetyFilters functions)

## Testing the App

1. **Onboarding Flow**
   - Complete all 3 steps
   - Verify preferences are saved

2. **Trip Creation**
   - Create a trip with different travel groups
   - Verify recommendations change based on group

3. **Recommendations**
   - Check clothing recommendations adapt to weather
   - Verify food filters by dietary preferences
   - Test experience filtering for kids/elderly
   - Check photo recommendations by time of day

4. **Navigation**
   - Switch between tabs
   - Verify active trip context is maintained
   - Test trip switching in profile

## Production Considerations

1. **API Integration**
   - Replace mock weather data with real API
   - Integrate clothing rental/purchase APIs
   - Add real-time location services

2. **Performance**
   - Implement recommendation caching
   - Optimize image loading
   - Add pagination for large lists

3. **Security**
   - Encrypt sensitive user data
   - Secure API endpoints
   - Implement authentication

4. **Analytics**
   - Track user interactions
   - Monitor recommendation accuracy
   - A/B test recommendation strategies

## Troubleshooting

### Common Issues

1. **Metro bundler errors**
   - Clear cache: `expo start -c`
   - Delete node_modules and reinstall

2. **Navigation issues**
   - Verify navigation structure in AppNavigator.js
   - Check screen names match navigation calls

3. **State not persisting**
   - Check AsyncStorage permissions
   - Verify context provider wraps app correctly

## Next Steps

- [ ] Add real weather API integration
- [ ] Implement clothing rental flow
- [ ] Add push notifications
- [ ] Create admin panel
- [ ] Add analytics
- [ ] Implement offline mode
- [ ] Add multi-language support

