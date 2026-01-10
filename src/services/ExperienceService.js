/**
 * Experience Recommendation Service
 * Generates experience recommendations based on time, travel group, and context
 */

export function getExperienceRecommendations(context, userPreferences) {
  const { destination, timeOfDay, travelGroup, season, weather } = context;
  const recommendations = [];

  // Get time-based experiences
  const timeBased = getTimeBasedExperiences(timeOfDay, destination, travelGroup);
  
  // Get destination-specific experiences
  const destinationBased = getDestinationExperiences(destination, travelGroup, season);

  // Combine and filter
  const allExperiences = [...timeBased, ...destinationBased];
  const filtered = applyExperienceFilters(allExperiences, travelGroup, timeOfDay);

  return {
    items: filtered,
    summary: generateExperienceSummary(filtered, travelGroup),
    warnings: generateExperienceWarnings(travelGroup, timeOfDay),
  };
}

function getTimeBasedExperiences(timeOfDay, destination, travelGroup) {
  const experiences = [];

  if (timeOfDay === 'morning') {
    experiences.push({
      id: 'morning-1',
      name: 'Sunrise Viewpoint',
      type: 'viewpoint',
      description: 'Best light for photography, less crowd',
      timeOfDay: 'morning',
      duration: '1-2 hours',
      walkingIntensity: 'low',
      crowdLevel: 'low',
      safetyLevel: 'high',
      requiresNightTravel: false,
      suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
      priceRange: 'Free - ₹500',
      bestFor: 'Photography, peaceful experience',
    });

    experiences.push({
      id: 'morning-2',
      name: 'Local Market Visit',
      type: 'cultural',
      description: 'Experience local life and culture',
      timeOfDay: 'morning',
      duration: '2-3 hours',
      walkingIntensity: 'moderate',
      crowdLevel: 'medium',
      safetyLevel: 'high',
      requiresNightTravel: false,
      suitableFor: ['solo', 'couple', 'family'],
      priceRange: 'Free',
      bestFor: 'Cultural immersion, shopping',
    });
  }

  if (timeOfDay === 'afternoon') {
    experiences.push({
      id: 'afternoon-1',
      name: 'Museum or Gallery',
      type: 'cultural',
      description: 'Indoor activity, escape the heat',
      timeOfDay: 'afternoon',
      duration: '2-4 hours',
      walkingIntensity: 'low',
      crowdLevel: 'medium',
      safetyLevel: 'high',
      requiresNightTravel: false,
      suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
      priceRange: '₹100-500',
      bestFor: 'Learning, comfort, family-friendly',
    });
  }

  if (timeOfDay === 'evening') {
    experiences.push({
      id: 'evening-1',
      name: 'Sunset Point',
      type: 'viewpoint',
      description: 'Golden hour photography',
      timeOfDay: 'evening',
      duration: '1-2 hours',
      walkingIntensity: 'low',
      crowdLevel: 'medium',
      safetyLevel: 'high',
      requiresNightTravel: false,
      suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
      priceRange: 'Free - ₹300',
      bestFor: 'Photography, romantic experience',
    });

    experiences.push({
      id: 'evening-2',
      name: 'Cultural Show or Performance',
      type: 'entertainment',
      description: 'Local dance, music, or theater',
      timeOfDay: 'evening',
      duration: '2-3 hours',
      walkingIntensity: 'low',
      crowdLevel: 'medium',
      safetyLevel: 'high',
      requiresNightTravel: false,
      suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
      priceRange: '₹300-1000',
      bestFor: 'Cultural experience, seated activity',
    });
  }

  if (timeOfDay === 'night' && ['solo', 'couple'].includes(travelGroup)) {
    experiences.push({
      id: 'night-1',
      name: 'Night Market or Nightlife',
      type: 'entertainment',
      description: 'Explore night scene (safe areas only)',
      timeOfDay: 'night',
      duration: '2-4 hours',
      walkingIntensity: 'moderate',
      crowdLevel: 'high',
      safetyLevel: 'medium',
      requiresNightTravel: true,
      suitableFor: ['solo', 'couple'],
      priceRange: '₹500-2000',
      bestFor: 'Social experience, nightlife',
    });
  }

  return experiences;
}

function getDestinationExperiences(destination, travelGroup, season) {
  const destinationMap = {
    'mumbai': [
      {
        id: 'mumbai-exp-1',
        name: 'Marine Drive Walk',
        type: 'walking',
        description: 'Scenic waterfront promenade',
        timeOfDay: 'any',
        duration: '1-2 hours',
        walkingIntensity: 'low',
        crowdLevel: 'medium',
        safetyLevel: 'high',
        requiresNightTravel: false,
        suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
        priceRange: 'Free',
        bestFor: 'Relaxation, views',
      },
      {
        id: 'mumbai-exp-2',
        name: 'Elephanta Caves',
        type: 'historical',
        description: 'Ancient cave temples (requires ferry)',
        timeOfDay: 'day',
        duration: '4-5 hours',
        walkingIntensity: 'high',
        crowdLevel: 'high',
        safetyLevel: 'high',
        requiresNightTravel: false,
        suitableFor: ['solo', 'couple', 'family'],
        priceRange: '₹500-1000',
        bestFor: 'History, photography',
      },
    ],
    'goa': [
      {
        id: 'goa-exp-1',
        name: 'Beach Relaxation',
        type: 'leisure',
        description: 'Relax on beautiful beaches',
        timeOfDay: 'any',
        duration: '2-4 hours',
        walkingIntensity: 'low',
        crowdLevel: 'medium',
        safetyLevel: 'high',
        requiresNightTravel: false,
        suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
        priceRange: 'Free',
        bestFor: 'Relaxation, family time',
      },
    ],
    'delhi': [
      {
        id: 'delhi-exp-1',
        name: 'Red Fort',
        type: 'historical',
        description: 'UNESCO World Heritage Site',
        timeOfDay: 'day',
        duration: '2-3 hours',
        walkingIntensity: 'moderate',
        crowdLevel: 'high',
        safetyLevel: 'high',
        requiresNightTravel: false,
        suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
        priceRange: '₹500-800',
        bestFor: 'History, photography',
      },
    ],
  };

  const city = destination.toLowerCase();
  return destinationMap[city] || [];
}

function applyExperienceFilters(experiences, travelGroup, timeOfDay) {
  return experiences.filter(exp => {
    // No night experiences for kids/elderly
    if (['kids', 'elderly'].includes(travelGroup) && exp.requiresNightTravel) {
      return false;
    }

    // No high walking intensity for elderly
    if (travelGroup === 'elderly' && exp.walkingIntensity === 'high') {
      return false;
    }

    // Filter by suitability
    if (!exp.suitableFor.includes(travelGroup)) {
      return false;
    }

    return true;
  });
}

function generateExperienceSummary(experiences, travelGroup) {
  return {
    totalOptions: experiences.length,
    recommendation: travelGroup === 'kids' || travelGroup === 'elderly'
      ? 'Prioritizing safe, low-intensity, and accessible experiences'
      : 'Mix of cultural, adventure, and leisure experiences',
  };
}

function generateExperienceWarnings(travelGroup, timeOfDay) {
  const warnings = [];

  if (['kids', 'elderly'].includes(travelGroup) && timeOfDay === 'night') {
    warnings.push('Night experiences are limited for your travel group. Consider daytime alternatives.');
  }

  if (travelGroup === 'elderly') {
    warnings.push('Avoiding high walking intensity experiences. Prioritizing seated and accessible options.');
  }

  return warnings;
}

