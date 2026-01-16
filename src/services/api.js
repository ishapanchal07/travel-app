import AsyncStorage from '@react-native-async-storage/async-storage';

// API Base URL - Change this to your backend URL
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' 
  : 'https://your-production-api.com/api';

/**
 * API Service - Handles all API calls
 */
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Get auth token from storage
   */
  async getToken() {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  /**
   * Save auth token to storage
   */
  async saveToken(token) {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  /**
   * Remove auth token
   */
  async removeToken() {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  /**
   * Make API request
   */
  async request(endpoint, options = {}) {
    const token = await this.getToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  async register(email, password, name) {
    return this.request('/auth/register', {
      method: 'POST',
      body: { email, password, name },
    });
  }

  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    
    if (response.token) {
      await this.saveToken(response.token);
    }
    
    return response;
  }

  async logout() {
    await this.removeToken();
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Trips
  async getTrips() {
    return this.request('/trips');
  }

  async getTrip(id) {
    return this.request(`/trips/${id}`);
  }

  async getActiveTrip() {
    return this.request('/trips/active/current');
  }

  async createTrip(tripData) {
    return this.request('/trips', {
      method: 'POST',
      body: tripData,
    });
  }

  async updateTrip(id, updates) {
    return this.request(`/trips/${id}`, {
      method: 'PUT',
      body: updates,
    });
  }

  async activateTrip(id) {
    return this.request(`/trips/${id}/activate`, {
      method: 'PUT',
    });
  }

  async deleteTrip(id) {
    return this.request(`/trips/${id}`, {
      method: 'DELETE',
    });
  }

  // Recommendations
  async getClothingRecommendations(tripId) {
    return this.request(`/clothes?tripId=${tripId}`);
  }

  async getFoodRecommendations(tripId) {
    return this.request(`/food?tripId=${tripId}`);
  }

  async getPhotoRecommendations(tripId) {
    return this.request(`/photo?tripId=${tripId}`);
  }

  async getExperienceRecommendations(tripId) {
    return this.request(`/guide?tripId=${tripId}`);
  }

  // User
  async getUserProfile() {
    return this.request('/users/profile');
  }

  async updateUserProfile(updates) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: updates,
    });
  }

  async updateUserPreferences(preferences) {
    return this.request('/users/preferences', {
      method: 'PUT',
      body: preferences,
    });
  }

  // Bookings
  async getBookings() {
    return this.request('/bookings');
  }

  async createBooking(bookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: bookingData,
    });
  }

  // Notifications
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationRead(id) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  // Payments
  async processPayment(paymentData) {
    return this.request('/payments/process', {
      method: 'POST',
      body: paymentData,
    });
  }
}

export default new ApiService();

