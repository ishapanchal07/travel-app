/**
 * Clothing Recommendation Service
 * Generates clothing recommendations based on context and user preferences
 */

export function getClothingRecommendations(context, userPreferences) {
  const { season, weather, travelGroup, gender, timeOfDay } = context;
  const recommendations = [];

  // Base clothing items
  const baseItems = generateBaseClothing(season, weather, travelGroup, gender);

  // Add context-specific items
  const contextualItems = addContextualClothing(baseItems, travelGroup, timeOfDay);

  // Apply safety and comfort filters
  const filteredItems = applySafetyFilters(contextualItems, travelGroup);

  return {
    items: filteredItems,
    summary: generateClothingSummary(filteredItems, travelGroup),
    warnings: generateWarnings(weather, travelGroup),
  };
}

function generateBaseClothing(season, weather, travelGroup, gender) {
  const items = [];

  // Summer clothing
  if (season === 'summer' || weather?.temp > 25) {
    items.push({
      id: 'summer-1',
      name: 'Light Cotton T-Shirt',
      category: 'top',
      description: 'Breathable cotton for hot weather',
      suitableFor: ['solo', 'couple', 'family'],
      rentPrice: 200,
      buyPrice: 800,
      kidFriendly: true,
      comfortable: true,
    });

    items.push({
      id: 'summer-2',
      name: 'Linen Shirt',
      category: 'top',
      description: 'Elegant and breathable',
      suitableFor: ['solo', 'couple'],
      rentPrice: 300,
      buyPrice: 1200,
      kidFriendly: false,
      comfortable: true,
    });

    items.push({
      id: 'summer-3',
      name: 'Shorts / Capris',
      category: 'bottom',
      description: 'Comfortable for walking',
      suitableFor: ['solo', 'couple', 'family', 'kids'],
      rentPrice: 250,
      buyPrice: 1000,
      kidFriendly: true,
      comfortable: true,
    });
  }

  // Winter clothing
  if (season === 'winter' || weather?.temp < 15) {
    items.push({
      id: 'winter-1',
      name: 'Warm Sweater',
      category: 'top',
      description: 'Cozy and warm',
      suitableFor: ['solo', 'couple', 'family', 'elderly'],
      rentPrice: 400,
      buyPrice: 1500,
      kidFriendly: true,
      comfortable: true,
    });

    items.push({
      id: 'winter-2',
      name: 'Layered Jacket',
      category: 'outerwear',
      description: 'Perfect for variable temperatures',
      suitableFor: ['solo', 'couple', 'family', 'elderly'],
      rentPrice: 500,
      buyPrice: 2500,
      kidFriendly: true,
      comfortable: true,
    });
  }

  // Rainy weather
  if (weather?.condition === 'rain') {
    items.push({
      id: 'rain-1',
      name: 'Waterproof Jacket',
      category: 'outerwear',
      description: 'Stay dry in rain',
      suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
      rentPrice: 350,
      buyPrice: 1800,
      kidFriendly: true,
      comfortable: true,
    });
  }

  // Footwear based on travel group
  if (travelGroup === 'elderly' || travelGroup === 'kids') {
    items.push({
      id: 'footwear-1',
      name: 'Comfortable Walking Shoes',
      category: 'footwear',
      description: 'Supportive and non-slip',
      suitableFor: ['family', 'kids', 'elderly'],
      rentPrice: 400,
      buyPrice: 2000,
      kidFriendly: true,
      comfortable: true,
    });
  } else {
    items.push({
      id: 'footwear-2',
      name: 'Stylish Sneakers',
      category: 'footwear',
      description: 'Fashion-forward and comfortable',
      suitableFor: ['solo', 'couple'],
      rentPrice: 500,
      buyPrice: 3000,
      kidFriendly: false,
      comfortable: true,
    });
  }

  return items;
}

function addContextualClothing(items, travelGroup, timeOfDay) {
  // Add evening/night clothing for solo/couples
  if (['solo', 'couple'].includes(travelGroup) && ['evening', 'night'].includes(timeOfDay)) {
    items.push({
      id: 'evening-1',
      name: 'Smart Casual Outfit',
      category: 'outfit',
      description: 'Perfect for evening experiences',
      suitableFor: ['solo', 'couple'],
      rentPrice: 600,
      buyPrice: 3500,
      kidFriendly: false,
      comfortable: true,
    });
  }

  return items;
}

function applySafetyFilters(items, travelGroup) {
  return items.filter(item => {
    // Kids need kid-friendly items
    if (travelGroup === 'kids' && !item.kidFriendly) return false;
    
    // Elderly need comfortable items
    if (travelGroup === 'elderly' && !item.comfortable) return false;
    
    return true;
  });
}

function generateClothingSummary(items, travelGroup) {
  const totalItems = items.length;
  const rentTotal = items.reduce((sum, item) => sum + item.rentPrice, 0);
  const buyTotal = items.reduce((sum, item) => sum + item.buyPrice, 0);

  return {
    totalItems,
    estimatedRentCost: rentTotal,
    estimatedBuyCost: buyTotal,
    recommendation: travelGroup === 'kids' || travelGroup === 'elderly' 
      ? 'Prioritizing comfort and safety over fashion'
      : 'Balanced mix of style and comfort',
  };
}

function generateWarnings(weather, travelGroup) {
  const warnings = [];

  if (weather?.condition === 'rain' && travelGroup === 'kids') {
    warnings.push('Ensure waterproof clothing for kids to prevent illness');
  }

  if (weather?.temp > 30 && travelGroup === 'elderly') {
    warnings.push('High temperature - ensure light, breathable clothing');
  }

  return warnings;
}

