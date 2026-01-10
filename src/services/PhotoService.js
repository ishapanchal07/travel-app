/**
 * Photo & Social Intelligence Service
 * Generates photo location and social media recommendations
 */

export function getPhotoRecommendations(context, userPreferences) {
  const { destination, timeOfDay, travelGroup } = context;
  const recommendations = [];

  // Get time-based photo spots
  const timeBased = getTimeBasedPhotoSpots(timeOfDay, destination, travelGroup);
  
  // Get destination-specific photo spots
  const destinationBased = getDestinationPhotoSpots(destination, travelGroup);

  // Get social media tips
  const socialTips = getSocialMediaTips(travelGroup, timeOfDay);

  return {
    spots: [...timeBased, ...destinationBased],
    tips: socialTips,
    summary: generatePhotoSummary(travelGroup, timeOfDay),
  };
}

function getTimeBasedPhotoSpots(timeOfDay, destination, travelGroup) {
  const spots = [];

  if (timeOfDay === 'morning') {
    spots.push({
      id: 'photo-morning-1',
      name: 'Sunrise Viewpoint',
      description: 'Soft natural light, minimal crowd',
      bestTime: '6:00 AM - 8:00 AM',
      lightQuality: 'soft natural',
      crowdLevel: 'low',
      safetyLevel: 'high',
      suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
      angles: ['Wide shot', 'Silhouette', 'Golden hour'],
      poses: travelGroup === 'solo' ? ['Standing', 'Sitting'] : ['Group photo', 'Candid'],
    });
  }

  if (timeOfDay === 'evening') {
    spots.push({
      id: 'photo-evening-1',
      name: 'Golden Hour Location',
      description: 'Perfect lighting for photos',
      bestTime: '5:00 PM - 7:00 PM',
      lightQuality: 'golden hour',
      crowdLevel: 'medium',
      safetyLevel: 'high',
      suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
      angles: ['Backlit', 'Side lighting', 'Wide landscape'],
      poses: travelGroup === 'couple' ? ['Romantic poses', 'Walking together'] : ['Group photo', 'Individual'],
    });
  }

  return spots;
}

function getDestinationPhotoSpots(destination, travelGroup) {
  const destinationMap = {
    'mumbai': [
      {
        id: 'mumbai-photo-1',
        name: 'Gateway of India',
        description: 'Iconic landmark, perfect for photos',
        bestTime: 'Morning or Evening',
        lightQuality: 'good',
        crowdLevel: 'high',
        safetyLevel: 'high',
        suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
        angles: ['Front view', 'Side angle', 'With water in background'],
        poses: ['Standing', 'Walking', 'Group photo'],
      },
      {
        id: 'mumbai-photo-2',
        name: 'Marine Drive',
        description: 'Scenic waterfront, great for sunset',
        bestTime: 'Evening',
        lightQuality: 'golden hour',
        crowdLevel: 'medium',
        safetyLevel: 'high',
        suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
        angles: ['Waterfront view', 'Skyline', 'Walking shot'],
        poses: ['Sitting on wall', 'Walking', 'Candid'],
      },
    ],
    'goa': [
      {
        id: 'goa-photo-1',
        name: 'Beach Sunset',
        description: 'Stunning beach sunset photos',
        bestTime: 'Evening',
        lightQuality: 'golden hour',
        crowdLevel: 'medium',
        safetyLevel: 'high',
        suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
        angles: ['Silhouette', 'Beach walk', 'Ocean view'],
        poses: ['Walking on beach', 'Sitting', 'Group photo'],
      },
    ],
    'delhi': [
      {
        id: 'delhi-photo-1',
        name: 'India Gate',
        description: 'Famous monument, great for photos',
        bestTime: 'Morning or Evening',
        lightQuality: 'good',
        crowdLevel: 'high',
        safetyLevel: 'high',
        suitableFor: ['solo', 'couple', 'family', 'kids', 'elderly'],
        angles: ['Front view', 'Side angle', 'Wide shot'],
        poses: ['Standing', 'Walking', 'Group photo'],
      },
    ],
  };

  const city = destination.toLowerCase();
  return destinationMap[city] || [];
}

function getSocialMediaTips(travelGroup, timeOfDay) {
  const tips = [];

  if (travelGroup === 'solo' || travelGroup === 'couple') {
    tips.push({
      type: 'aesthetic',
      title: 'Aesthetic-First Approach',
      description: 'Focus on trendy framing and influencer-style shots',
      suggestions: [
        'Use rule of thirds',
        'Try different angles (low angle, high angle)',
        'Capture candid moments',
        'Include local elements in frame',
      ],
    });
  }

  if (travelGroup === 'family') {
    tips.push({
      type: 'group',
      title: 'Family-Friendly Shots',
      description: 'Capture memories with everyone in frame',
      suggestions: [
        'Use wide shots to include everyone',
        'Capture natural interactions',
        'Take multiple shots to ensure everyone looks good',
        'Include landmarks in background',
      ],
    });
  }

  if (travelGroup === 'kids') {
    tips.push({
      type: 'kids',
      title: 'Kid-Friendly Photography',
      description: 'Safe, open spaces with natural lighting',
      suggestions: [
        'Choose safe, open locations',
        'Capture kids playing naturally',
        'Use natural light (avoid harsh sun)',
        'Keep backgrounds simple',
      ],
    });
  }

  if (timeOfDay === 'morning') {
    tips.push({
      type: 'lighting',
      title: 'Morning Light Tips',
      description: 'Best natural lighting conditions',
      suggestions: [
        'Soft morning light is perfect for portraits',
        'Avoid harsh shadows',
        'Use backlighting for dramatic effect',
        'Crowds are minimal - take your time',
      ],
    });
  }

  if (timeOfDay === 'evening') {
    tips.push({
      type: 'lighting',
      title: 'Golden Hour Photography',
      description: 'Perfect time for stunning photos',
      suggestions: [
        'Golden hour provides warm, flattering light',
        'Great for silhouettes',
        'Capture sunset colors',
        'Use side lighting for depth',
      ],
    });
  }

  return tips;
}

function generatePhotoSummary(travelGroup, timeOfDay) {
  return {
    recommendation: travelGroup === 'solo' || travelGroup === 'couple'
      ? 'Aesthetic-first suggestions for influencer-style content'
      : travelGroup === 'family'
      ? 'Group-friendly photo spots for family memories'
      : 'Safe, accessible photo locations with minimal movement required',
    bestTime: timeOfDay === 'morning' || timeOfDay === 'evening'
      ? 'Current time is ideal for photography'
      : 'Consider morning or evening for better lighting',
  };
}

