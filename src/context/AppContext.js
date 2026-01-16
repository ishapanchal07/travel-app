import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activeTrip, setActiveTrip] = useState(null);
  const [trips, setTrips] = useState([]);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user data on app start
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Check if user is authenticated
      const token = await AsyncStorage.getItem('authToken');
      
      if (token) {
        try {
          // Try to get current user from API
          const response = await api.getCurrentUser();
          if (response.success) {
            setUser(response.user);
            setIsAuthenticated(true);
            
            // Load trips from API
            await loadTrips();
          }
        } catch (error) {
          // Token might be invalid, clear it
          await api.logout();
          setIsAuthenticated(false);
        }
      }

      // Fallback to local storage for offline mode
      const userData = await AsyncStorage.getItem('user');
      const tripsData = await AsyncStorage.getItem('trips');
      const activeTripData = await AsyncStorage.getItem('activeTrip');
      const onboarded = await AsyncStorage.getItem('isOnboarded');

      if (userData && !user) {
        setUser(JSON.parse(userData));
      }
      if (tripsData && trips.length === 0) {
        setTrips(JSON.parse(tripsData));
      }
      if (activeTripData && !activeTrip) {
        setActiveTrip(JSON.parse(activeTripData));
      }
      if (onboarded === 'true') {
        setIsOnboarded(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTrips = async () => {
    try {
      const response = await api.getTrips();
      if (response.success) {
        setTrips(response.data);
        
        // Find active trip
        const active = response.data.find(t => t.isActive);
        if (active) {
          setActiveTrip(active);
          await AsyncStorage.setItem('activeTrip', JSON.stringify(active));
        }
        
        await AsyncStorage.setItem('trips', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error loading trips:', error);
    }
  };

  const saveUser = async (userData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      // Also update via API if authenticated
      if (isAuthenticated) {
        try {
          await api.updateUserProfile(userData);
        } catch (error) {
          console.error('Error updating user via API:', error);
        }
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const createTrip = async (tripData) => {
    try {
      let newTrip;
      
      // Try API first if authenticated
      if (isAuthenticated) {
        try {
          const response = await api.createTrip(tripData);
          if (response.success) {
            newTrip = response.data;
            await loadTrips();
            return newTrip;
          }
        } catch (error) {
          console.error('Error creating trip via API:', error);
        }
      }
      
      // Fallback to local storage
      newTrip = {
        id: Date.now().toString(),
        ...tripData,
        createdAt: new Date().toISOString(),
        isActive: true,
      };
      
      const updatedTrips = [...trips, newTrip];
      await AsyncStorage.setItem('trips', JSON.stringify(updatedTrips));
      await AsyncStorage.setItem('activeTrip', JSON.stringify(newTrip));
      setTrips(updatedTrips);
      setActiveTrip(newTrip);
      
      return newTrip;
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  };

  const updateTrip = async (tripId, updates) => {
    try {
      // Try API first
      if (isAuthenticated) {
        try {
          const response = await api.updateTrip(tripId, updates);
          if (response.success) {
            await loadTrips();
            return;
          }
        } catch (error) {
          console.error('Error updating trip via API:', error);
        }
      }
      
      // Fallback to local
      const updatedTrips = trips.map(trip =>
        trip.id === tripId ? { ...trip, ...updates } : trip
      );
      await AsyncStorage.setItem('trips', JSON.stringify(updatedTrips));
      setTrips(updatedTrips);
      
      if (activeTrip?.id === tripId) {
        const updatedActiveTrip = { ...activeTrip, ...updates };
        await AsyncStorage.setItem('activeTrip', JSON.stringify(updatedActiveTrip));
        setActiveTrip(updatedActiveTrip);
      }
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  const setActiveTripById = async (tripId) => {
    try {
      // Try API first
      if (isAuthenticated) {
        try {
          await api.activateTrip(tripId);
          await loadTrips();
          return;
        } catch (error) {
          console.error('Error activating trip via API:', error);
        }
      }
      
      // Fallback to local
      const trip = trips.find(t => t.id === tripId);
      if (trip) {
        // Deactivate all trips
        const updatedTrips = trips.map(t => ({ ...t, isActive: t.id === tripId }));
        await AsyncStorage.setItem('trips', JSON.stringify(updatedTrips));
        setTrips(updatedTrips);
        
        // Set active trip
        await AsyncStorage.setItem('activeTrip', JSON.stringify(trip));
        setActiveTrip(trip);
      }
    } catch (error) {
      console.error('Error setting active trip:', error);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('isOnboarded', 'true');
      setIsOnboarded(true);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const updateUserPreferences = async (preferences) => {
    try {
      const updatedUser = { ...user, preferences };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Update via API if authenticated
      if (isAuthenticated) {
        try {
          await api.updateUserPreferences(preferences);
        } catch (error) {
          console.error('Error updating preferences via API:', error);
        }
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        await loadTrips();
        return response;
      }
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      setIsAuthenticated(false);
      setTrips([]);
      setActiveTrip(null);
      await AsyncStorage.multiRemove(['user', 'trips', 'activeTrip', 'authToken']);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        activeTrip,
        trips,
        isOnboarded,
        loading,
        isAuthenticated,
        saveUser,
        createTrip,
        updateTrip,
        setActiveTripById,
        completeOnboarding,
        updateUserPreferences,
        login,
        logout,
        loadTrips,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
