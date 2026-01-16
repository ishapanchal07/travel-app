const { getWeatherData, getSeason, getTimeOfDay } = require('./contextEngine');
const { getClothingRecommendations: getClothing } = require('./clothingService');
const { getFoodRecommendations: getFood } = require('./foodService');
const { getExperienceRecommendations: getExperiences } = require('./experienceService');
const { getPhotoRecommendations: getPhotos } = require('./photoService');

/**
 * Main Recommendation Engine Service
 * Coordinates all recommendation services
 */

/**
 * Get clothing recommendations
 */
const getClothesRecommendations = async (trip, user) => {
  const context = await buildContext(trip, user);
  return getClothing(context, user.preferences || {});
};

/**
 * Get food recommendations
 */
const getFoodRecommendations = async (trip, user) => {
  const context = await buildContext(trip, user);
  return getFood(context, user.preferences || {});
};

/**
 * Get photo recommendations
 */
const getPhotoRecommendations = async (trip, user) => {
  const context = await buildContext(trip, user);
  return getPhotos(context, user.preferences || {});
};

/**
 * Get experience recommendations
 */
const getExperienceRecommendations = async (trip, user) => {
  const context = await buildContext(trip, user);
  return getExperiences(context, user.preferences || {});
};

/**
 * Get all recommendations
 */
const getAllRecommendations = async (trip, user) => {
  const context = await buildContext(trip, user);
  
  return {
    context,
    recommendations: {
      clothing: await getClothesRecommendations(trip, user),
      food: await getFoodRecommendations(trip, user),
      experiences: await getExperienceRecommendations(trip, user),
      photos: await getPhotoRecommendations(trip, user),
    },
    generatedAt: new Date().toISOString()
  };
};

/**
 * Build context for recommendations
 */
const buildContext = async (trip, user) => {
  const weather = await getWeatherData(trip.destination);
  const season = getSeason(trip.startDate);
  const timeOfDay = getTimeOfDay();
  
  return {
    destination: trip.destination,
    startDate: trip.startDate,
    endDate: trip.endDate,
    season,
    weather,
    timeOfDay,
    travelGroup: trip.travelGroup,
    accommodation: trip.accommodation,
    safetyLevel: trip.safetySensitivity || 'normal',
    comfortLevel: trip.comfortLevel || 'moderate',
    activityIntensity: trip.activityIntensity || 'moderate',
    dietaryPreferences: user.preferences?.dietaryPreference || 'none',
    gender: user.preferences?.gender,
    clothingSize: user.preferences?.clothingSize,
  };
};

module.exports = {
  getClothesRecommendations,
  getFoodRecommendations,
  getPhotoRecommendations,
  getExperienceRecommendations,
  getAllRecommendations
};

