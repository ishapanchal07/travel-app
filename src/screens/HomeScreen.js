import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { RecommendationEngine } from '../services/RecommendationEngine';

const HomeScreen = ({ navigation }) => {
  const { activeTrip, user } = useApp();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRecommendations();
  }, [activeTrip]);

  const loadRecommendations = async () => {
    if (!activeTrip) return;

    try {
      setLoading(true);
      const engine = new RecommendationEngine(activeTrip, user);
      const recs = await engine.generateRecommendations();
      setRecommendations(recs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRecommendations();
    setRefreshing(false);
  };

  if (!activeTrip) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTripText}>No active trip found</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading recommendations...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back! 👋</Text>
        <Text style={styles.tripInfo}>
          {activeTrip.destination} • {activeTrip.travelGroup}
        </Text>
      </View>

      {recommendations && (
        <>
          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {recommendations.recommendations.clothing.items.length}
              </Text>
              <Text style={styles.statLabel}>Clothing Options</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {recommendations.recommendations.experiences.items.length}
              </Text>
              <Text style={styles.statLabel}>Experiences</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {recommendations.recommendations.food.items.length}
              </Text>
              <Text style={styles.statLabel}>Food Options</Text>
            </View>
          </View>

          {/* Notifications */}
          {recommendations.recommendations.notifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📢 Notifications</Text>
              {recommendations.recommendations.notifications.map((notif, index) => (
                <View key={index} style={styles.notificationCard}>
                  <Text style={styles.notificationTitle}>{notif.title}</Text>
                  <Text style={styles.notificationMessage}>{notif.message}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate('Clothing')}
              >
                <Text style={styles.actionIcon}>👕</Text>
                <Text style={styles.actionText}>Clothing</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate('Recommendations')}
              >
                <Text style={styles.actionIcon}>🤖</Text>
                <Text style={styles.actionText}>AI Recs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate('Experiences')}
              >
                <Text style={styles.actionIcon}>📸</Text>
                <Text style={styles.actionText}>Photos</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Context Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Context</Text>
            <View style={styles.contextCard}>
              <Text style={styles.contextText}>
                Time: {recommendations.context.timeOfDay}
              </Text>
              <Text style={styles.contextText}>
                Season: {recommendations.context.season}
              </Text>
              <Text style={styles.contextText}>
                Weather: {recommendations.context.weather?.condition || 'N/A'} •{' '}
                {recommendations.context.weather?.temp || 'N/A'}°C
              </Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  tripInfo: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6b7280',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  contextCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  contextText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6b7280',
  },
  noTripText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6b7280',
  },
});

export default HomeScreen;

