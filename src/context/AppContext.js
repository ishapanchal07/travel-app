import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  // Load user data on app start
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const tripsData = await AsyncStorage.getItem('trips');
      const activeTripData = await AsyncStorage.getItem('activeTrip');
      const onboarded = await AsyncStorage.getItem('isOnboarded');

      if (userData) {
        setUser(JSON.parse(userData));
      }
      if (tripsData) {
        setTrips(JSON.parse(tripsData));
      }
      if (activeTripData) {
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

  const saveUser = async (userData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const createTrip = async (tripData) => {
    try {
      const newTrip = {
        id: Date.now().toString(),
        ...tripData,
        createdAt: new Date().toISOString(),
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
      const trip = trips.find(t => t.id === tripId);
      if (trip) {
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
      const updatedUser = { ...user, ...preferences };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating preferences:', error);
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
        saveUser,
        createTrip,
        updateTrip,
        setActiveTripById,
        completeOnboarding,
        updateUserPreferences,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

