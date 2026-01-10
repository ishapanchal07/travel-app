# ROAMSTER Quick Start Guide

## Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the App
```bash
npm start
```

### 3. Run on Your Device
- **iOS**: Press `i` in the terminal or run `npm run ios`
- **Android**: Press `a` in the terminal or run `npm run android`
- **Physical Device**: Scan the QR code with Expo Go app

## First Time Setup

### Step 1: Onboarding
When you first open the app, you'll go through onboarding:
- Set your gender and clothing size
- Choose dietary preferences and travel style
- Select your social media goals

### Step 2: Create Your First Trip
After onboarding, you must create a trip:
- Enter destination (e.g., "Mumbai", "Goa", "Delhi")
- Select travel dates
- Choose travel group (Solo, Couple, Family, With Kids, With Elderly)
- Set comfort level and safety sensitivity

### Step 3: Explore Recommendations
Once your trip is created, you'll see:
- **Home**: Overview with quick stats and notifications
- **Recommendations**: AI-powered suggestions for clothing, food, and experiences
- **Clothing**: Browse and rent/buy clothing options
- **Experiences**: Discover activities and photo spots
- **Profile**: Manage your trips and preferences

## Key Features to Try

### 1. Travel Group Impact
Create trips with different travel groups to see how recommendations change:
- **Solo/Couple**: More flexible, fashion-forward, night experiences
- **Family**: Balanced safety and comfort
- **Kids**: No night experiences, kid-friendly food, comfortable clothing
- **Elderly**: Low walking intensity, accessible locations, comfortable options

### 2. Time-Based Recommendations
- Check recommendations at different times of day
- Morning: Best photo spots, less crowd
- Evening: Golden hour photography, cultural shows
- Night: Limited for kids/elderly, more options for solo/couples

### 3. Context Awareness
- Recommendations adapt to weather (mock data currently)
- Season-based clothing suggestions
- Safety filters based on travel group

## Testing Different Scenarios

### Scenario 1: Solo Traveler in Mumbai
1. Create trip: Destination "Mumbai", Solo, Moderate comfort
2. Check clothing: Should see fashion-forward options
3. Check experiences: Night experiences should be available
4. Check photos: Aesthetic-first suggestions

### Scenario 2: Family with Kids in Goa
1. Create trip: Destination "Goa", With Kids, High safety
2. Check clothing: Comfortable, kid-friendly options
3. Check food: Mild, hygienic options only
4. Check experiences: No night experiences, low walking intensity
5. Check photos: Safe, open spaces

### Scenario 3: Elderly Travelers
1. Create trip: Destination "Delhi", With Elderly, Premium comfort
2. Check clothing: Comfortable footwear, warm layers
3. Check food: Easy digestion, low spice
4. Check experiences: Seated activities, minimal walking
5. Check photos: Accessible locations with seating

## Navigation Tips

- **Bottom Tabs**: Quick access to main sections
- **Pull to Refresh**: Refresh recommendations on any screen
- **Profile**: Switch between multiple trips
- **Home**: See notifications and quick actions

## Understanding Recommendations

### Clothing Recommendations
- Based on weather, season, and travel group
- Rent vs Buy options with pricing
- Safety warnings for inappropriate items

### Food Recommendations
- Local cuisine suggestions
- Filtered by dietary preferences
- Time-of-day appropriate
- Hygiene and spice level awareness

### Experience Recommendations
- Time-based suggestions
- Walking intensity indicated
- Crowd level information
- Safety filtered for travel group

### Photo Recommendations
- Best spots by time of day
- Suggested angles and poses
- Social media tips
- Group-aware suggestions

## Troubleshooting

**No recommendations showing?**
- Make sure you've created a trip
- Check that trip has valid dates
- Verify destination is recognized (Mumbai, Goa, Delhi work best)

**Recommendations not updating?**
- Pull down to refresh
- Check active trip in Profile screen
- Verify context (time, weather) is being calculated

**Navigation issues?**
- Ensure you've completed onboarding
- Verify trip is created
- Check AppNavigator logic

## Next Steps

1. **Customize Recommendations**: Edit service files to add more destinations/data
2. **Add Real APIs**: Replace mock weather data with real API calls
3. **Enhance UI**: Customize colors, fonts, and layouts
4. **Add Features**: Implement clothing rental flow, push notifications, etc.

## Need Help?

- Check `README.md` for detailed documentation
- See `SETUP.md` for development setup
- Review service files for recommendation logic
- Check context files for state management

Happy Traveling! 🌍✈️

