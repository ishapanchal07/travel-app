/**
 * Context Engine - Determines location, weather, season, and time context
 */

/**
 * Get current season based on date
 */
const getSeason = (date) => {
  const month = new Date(date).getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
};

/**
 * Get time of day category
 */
const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
};

/**
 * Get weather data for destination
 * In production, this would call a weather API
 */
const getWeatherData = async (destination) => {
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
};

module.exports = {
  getSeason,
  getTimeOfDay,
  getWeatherData
};

