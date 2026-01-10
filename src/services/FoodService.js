/**
 * Food Recommendation Service
 * Generates food recommendations based on context, dietary preferences, and travel group
 */

export function getFoodRecommendations(context, userPreferences) {
  const { destination, timeOfDay, travelGroup, dietaryPreferences } = context;
  const recommendations = [];

  // Get time-based recommendations
  const timeBasedFood = getTimeBasedFood(timeOfDay, destination, travelGroup);
  
  // Get local cuisine recommendations
  const localCuisine = getLocalCuisine(destination, dietaryPreferences, travelGroup);

  // Combine and filter
  const allFood = [...timeBasedFood, ...localCuisine];
  const filteredFood = applyFoodFilters(allFood, travelGroup, dietaryPreferences);

  return {
    items: filteredFood,
    summary: generateFoodSummary(filteredFood, travelGroup),
    warnings: generateFoodWarnings(travelGroup, dietaryPreferences),
  };
}

function getTimeBasedFood(timeOfDay, destination, travelGroup) {
  const food = [];

  if (timeOfDay === 'morning') {
    food.push({
      id: 'breakfast-1',
      name: 'Local Breakfast Special',
      type: 'breakfast',
      description: 'Authentic morning meal',
      spiceLevel: 'low',
      hygieneLevel: 'high',
      suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
      kidFriendly: true,
      elderlyFriendly: true,
      priceRange: '₹100-300',
      location: 'Local cafes',
    });
  }

  if (timeOfDay === 'afternoon') {
    food.push({
      id: 'lunch-1',
      name: 'Traditional Lunch',
      type: 'lunch',
      description: 'Hearty local cuisine',
      spiceLevel: 'medium',
      hygieneLevel: 'high',
      suitableFor: ['solo', 'couple', 'family'],
      kidFriendly: true,
      elderlyFriendly: true,
      priceRange: '₹200-500',
      location: 'Restaurants',
    });
  }

  if (timeOfDay === 'evening') {
    food.push({
      id: 'snacks-1',
      name: 'Street Food Delights',
      type: 'snacks',
      description: 'Local street food (if safe)',
      spiceLevel: 'medium',
      hygieneLevel: travelGroup === 'kids' ? 'medium' : 'high',
      suitableFor: ['solo', 'couple', 'family'],
      kidFriendly: travelGroup !== 'kids',
      elderlyFriendly: false,
      priceRange: '₹50-200',
      location: 'Street vendors',
    });
  }

  return food;
}

function getLocalCuisine(destination, dietaryPreferences, travelGroup) {
  const cuisineMap = {
    'mumbai': [
      {
        id: 'mumbai-1',
        name: 'Vada Pav',
        type: 'snacks',
        description: 'Mumbai\'s iconic street food',
        spiceLevel: 'medium',
        hygieneLevel: 'medium',
        suitableFor: ['solo', 'couple', 'family'],
        kidFriendly: true,
        elderlyFriendly: true,
        priceRange: '₹20-50',
        location: 'Street vendors',
      },
      {
        id: 'mumbai-2',
        name: 'Pav Bhaji',
        type: 'main',
        description: 'Spicy vegetable curry with bread',
        spiceLevel: 'high',
        hygieneLevel: 'high',
        suitableFor: ['solo', 'couple', 'family'],
        kidFriendly: false,
        elderlyFriendly: false,
        priceRange: '₹100-200',
        location: 'Restaurants',
      },
    ],
    'goa': [
      {
        id: 'goa-1',
        name: 'Fish Curry Rice',
        type: 'main',
        description: 'Traditional Goan seafood',
        spiceLevel: 'high',
        hygieneLevel: 'high',
        suitableFor: ['solo', 'couple'],
        kidFriendly: false,
        elderlyFriendly: false,
        priceRange: '₹300-600',
        location: 'Beach shacks',
      },
    ],
    'delhi': [
      {
        id: 'delhi-1',
        name: 'Chole Bhature',
        type: 'main',
        description: 'Spicy chickpeas with fried bread',
        spiceLevel: 'medium',
        hygieneLevel: 'high',
        suitableFor: ['solo', 'couple', 'family'],
        kidFriendly: true,
        elderlyFriendly: true,
        priceRange: '₹150-300',
        location: 'Restaurants',
      },
    ],
  };

  const city = destination.toLowerCase();
  return cuisineMap[city] || [];
}

function applyFoodFilters(food, travelGroup, dietaryPreferences) {
  return food.filter(item => {
    // Filter by travel group
    if (travelGroup === 'kids' && !item.kidFriendly) return false;
    if (travelGroup === 'elderly' && !item.elderlyFriendly) return false;
    
    // Filter by dietary preferences
    if (dietaryPreferences === 'vegetarian' && item.type === 'non-veg') return false;
    if (dietaryPreferences === 'vegan' && item.type !== 'vegan') return false;
    
    // Safety: No high spice for kids/elderly
    if ((travelGroup === 'kids' || travelGroup === 'elderly') && item.spiceLevel === 'high') {
      return false;
    }
    
    return true;
  });
}

function generateFoodSummary(food, travelGroup) {
  return {
    totalOptions: food.length,
    recommendation: travelGroup === 'kids' || travelGroup === 'elderly'
      ? 'Prioritizing mild, hygienic, and easily digestible options'
      : 'Mix of local favorites and safe options',
  };
}

function generateFoodWarnings(travelGroup, dietaryPreferences) {
  const warnings = [];

  if (travelGroup === 'kids') {
    warnings.push('Avoid street food and high spice levels for kids');
  }

  if (travelGroup === 'elderly') {
    warnings.push('Prioritize easily digestible food and avoid extreme spices');
  }

  if (dietaryPreferences === 'vegetarian' || dietaryPreferences === 'vegan') {
    warnings.push('Some local cuisines may contain non-vegetarian ingredients - verify before ordering');
  }

  return warnings;
}

