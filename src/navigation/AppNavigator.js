import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useApp } from '../context/AppContext';
import OnboardingScreen from '../screens/OnboardingScreen';
import TripSetupScreen from '../screens/TripSetupScreen';
import MainTabs from './MainTabs';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isOnboarded, activeTrip, loading } = useApp();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboarded ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : !activeTrip ? (
        <Stack.Screen name="TripSetup" component={TripSetupScreen} />
      ) : (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;

