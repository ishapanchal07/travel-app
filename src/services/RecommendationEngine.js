import { getWeatherData, getSeason, getTimeOfDay } from './ContextEngine';
import { getClothingRecommendations } from './ClothingService';
import { getFoodRecommendations } from './FoodService';
import { getExperienceRecommendations } from './ExperienceService';
import { getPhotoRecommendations } from './PhotoService';

/**
 * Main AI Recommendation Engine
 * Processes trip context and generates personalized recommendations
 */
export class RecommendationEngine {
  constructor(trip, userPreferences) {
    this.trip = trip;
    this.userPreferences = userPreferences;
    this.context = null;
  }

  /**
   * Initialize context and generate all recommendations
   */
  async generateRecommendations() {
    try {
      // Build context
      this.context = await this.buildContext();
      
      // Generate all recommendation types
      const recommendations = {
        clothing: this.getClothingRecommendations(),
        food: this.getFoodRecommendations(),
        experiences: this.getExperienceRecommendations(),
        photos: this.getPhotoRecommendations(),
        notifications: this.getNotificationRecommendations(),
      };

      return {
        context: this.context,
        recommendations,
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw error;
    }
  }

  /**
   * Build comprehensive context for recommendations
   */
  async buildContext() {
    const { destination, startDate, endDate, travelGroup, accommodation } = this.trip;
    
    // Get weather and season
    const weather = await getWeatherData(destination);
    const season = getSeason(startDate);
    const timeOfDay = getTimeOfDay();
    
    // Determine safety and comfort levels
    const safetyLevel = this.getSafetyLevel(travelGroup);
    const comfortLevel = this.trip.comfortLevel || 'moderate';
    
    return {
      destination,
      startDate,
      endDate,
      season,
      weather,
      timeOfDay,
      travelGroup,
      accommodation,
      safetyLevel,
      comfortLevel,
      activityIntensity: this.getActivityIntensity(travelGroup),
      dietaryPreferences: this.userPreferences?.dietaryPreference || 'none',
      gender: this.userPreferences?.gender,
      clothingSize: this.userPreferences?.clothingSize,
    };
  }

  /**
   * Get safety level based on travel group
   */
  getSafetyLevel(travelGroup) {
    const safetyMap = {
      solo: 'normal',
      couple: 'normal',
      family: 'high',
      kids: 'high',
      elderly: 'high',
    };
    return safetyMap[travelGroup] || 'normal';
  }

  /**
   * Get activity intensity based on travel group
   */
  getActivityIntensity(travelGroup) {
    const intensityMap = {
      solo: 'high',
      couple: 'moderate',
      family: 'moderate',
      kids: 'low',
      elderly: 'low',
    };
    return intensityMap[travelGroup] || 'moderate';
  }

  /**
   * Get clothing recommendations
   */
  getClothingRecommendations() {
    return getClothingRecommendations(this.context, this.userPreferences);
  }

  /**
   * Get food recommendations
   */
  getFoodRecommendations() {
    return getFoodRecommendations(this.context, this.userPreferences);
  }

  /**
   * Get experience recommendations
   */
  getExperienceRecommendations() {
    return getExperienceRecommendations(this.context, this.userPreferences);
  }

  /**
   * Get photo recommendations
   */
  getPhotoRecommendations() {
    return getPhotoRecommendations(this.context, this.userPreferences);
  }

  /**
   * Get notification recommendations
   */
  getNotificationRecommendations() {
    const notifications = [];
    const { timeOfDay, travelGroup, weather } = this.context;

    // Morning photo opportunities
    if (timeOfDay === 'morning' && travelGroup !== 'elderly') {
      notifications.push({
        type: 'photo',
        title: 'Best Photo Time Now',
        message: 'Soft natural light perfect for photos. Safe & crowd-free.',
        priority: 'high',
      });
    }

    // Weather alerts
    if (weather?.condition === 'rain') {
      notifications.push({
        type: 'weather',
        title: 'Rain Expected',
        message: 'Consider waterproof clothing and indoor activities.',
        priority: 'medium',
      });
    }

    // Evening recommendations
    if (timeOfDay === 'evening' && ['solo', 'couple'].includes(travelGroup)) {
      notifications.push({
        type: 'experience',
        title: 'Evening Experience',
        message: 'Perfect time for cafes, culture, and golden hour photos.',
        priority: 'medium',
      });
    }

    // Safety reminders for kids/elderly
    if (['kids', 'elderly'].includes(travelGroup) && timeOfDay === 'night') {
      notifications.push({
        type: 'safety',
        title: 'Night Travel Notice',
        message: 'Night experiences are limited for your travel group. Consider daytime alternatives.',
        priority: 'high',
      });
    }

    return notifications;
  }
}

/**
 * Validate recommendations against safety rules
 */
export function validateRecommendations(recommendations, context) {
  const { travelGroup, safetyLevel } = context;
  const validated = { ...recommendations };

  // Remove unsafe experiences for kids/elderly
  if (['kids', 'elderly'].includes(travelGroup)) {
    validated.experiences = validated.experiences.filter(
      exp => !exp.requiresNightTravel && exp.safetyLevel !== 'low'
    );
  }

  // Filter inappropriate clothing
  validated.clothing = validated.clothing.filter(
    item => {
      if (travelGroup === 'kids' && !item.kidFriendly) return false;
      if (travelGroup === 'elderly' && !item.comfortable) return false;
      return true;
    }
  );

  // Filter unsafe food
  validated.food = validated.food.filter(
    item => {
      if (travelGroup === 'kids' && item.spiceLevel === 'high') return false;
      if (travelGroup === 'elderly' && item.digestionLevel === 'difficult') return false;
      return true;
    }
  );

  return validated;
}

