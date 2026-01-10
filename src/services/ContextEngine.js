import * as Location from 'expo-location';

/**
 * Context Engine - Determines location, weather, season, and time context
 */

/**
 * Get current season based on date
 */
export function getSeason(date) {
  const month = new Date(date).getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

/**
 * Get time of day category
 */
export function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

/**
 * Get weather data for destination
 * In production, this would call a weather API
 */
export async function getWeatherData(destination) {
  // Mock weather data - in production, use OpenWeatherMap or similar
  const weatherMap = {
    'mumbai': { temp: 28, condition: 'sunny', humidity: 75 },
    'delhi': { temp: 32, condition: 'sunny', humidity: 60 },
    'goa': { temp: 30, condition: 'partly-cloudy', humidity: 80 },
    'bangalore': { temp: 26, condition: 'rain', humidity: 85 },
    'kerala': { temp: 27, condition: 'rain', humidity: 90 },
  };

  const city = destination.toLowerCase();
  return weatherMap[city] || { temp: 25, condition: 'sunny', humidity: 70 };
}

/**
 * Get user's current location
 */
export async function getCurrentLocation() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Get crowd level estimate (mock - in production use real-time data)
 */
export function getCrowdLevel(destination, timeOfDay) {
  // Mock logic
  if (timeOfDay === 'morning') return 'low';
  if (timeOfDay === 'afternoon') return 'high';
  if (timeOfDay === 'evening') return 'medium';
  return 'low';
}

