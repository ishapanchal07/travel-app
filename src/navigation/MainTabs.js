import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import ClothingScreen from '../screens/ClothingScreen';
import ExperiencesScreen from '../screens/ExperiencesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Recommendations') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Clothing') {
            iconName = focused ? 'shirt' : 'shirt-outline';
          } else if (route.name === 'Experiences') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#6366f1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'ROAMSTER' }}
      />
      <Tab.Screen 
        name="Recommendations" 
        component={RecommendationsScreen}
        options={{ title: 'AI Recommendations' }}
      />
      <Tab.Screen 
        name="Clothing" 
        component={ClothingScreen}
        options={{ title: 'Clothing' }}
      />
      <Tab.Screen 
        name="Experiences" 
        component={ExperiencesScreen}
        options={{ title: 'Experiences' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;

