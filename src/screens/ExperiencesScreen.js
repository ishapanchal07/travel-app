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

const ExperiencesScreen = () => {
  const { activeTrip, user } = useApp();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('experiences');

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
        <Text style={styles.loadingText}>Loading experiences...</Text>
      </View>
    );
  }

  if (!recommendations) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No recommendations available</Text>
      </View>
    );
  }

  const tabs = [
    { id: 'experiences', label: 'Experiences' },
    { id: 'photos', label: 'Photo Spots' },
  ];

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Experiences Tab */}
        {activeTab === 'experiences' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Experience Recommendations</Text>
            <Text style={styles.sectionSummary}>
              {recommendations.recommendations.experiences.summary.recommendation}
            </Text>

            {recommendations.recommendations.experiences.items.map(
              (item, index) => (
                <View key={index} style={styles.experienceCard}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceName}>{item.name}</Text>
                    <View
                      style={[
                        styles.badge,
                        item.timeOfDay === 'morning' && styles.badgeMorning,
                        item.timeOfDay === 'evening' && styles.badgeEvening,
                        item.timeOfDay === 'night' && styles.badgeNight,
                      ]}
                    >
                      <Text style={styles.badgeText}>
                        {item.timeOfDay.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.experienceDescription}>
                    {item.description}
                  </Text>

                  <View style={styles.metaGrid}>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>Duration</Text>
                      <Text style={styles.metaValue}>{item.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>Walking</Text>
                      <Text style={styles.metaValue}>
                        {item.walkingIntensity}
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>Crowd</Text>
                      <Text style={styles.metaValue}>{item.crowdLevel}</Text>
                    </View>
                  </View>

                  <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>{item.priceRange}</Text>
                  </View>

                  <View style={styles.bestForContainer}>
                    <Text style={styles.bestForLabel}>Best for:</Text>
                    <Text style={styles.bestForText}>{item.bestFor}</Text>
                  </View>
                </View>
              )
            )}

            {recommendations.recommendations.experiences.warnings.length > 0 && (
              <View style={styles.warningCard}>
                <Text style={styles.warningTitle}>⚠️ Warnings</Text>
                {recommendations.recommendations.experiences.warnings.map(
                  (warning, index) => (
                    <Text key={index} style={styles.warningText}>
                      • {warning}
                    </Text>
                  )
                )}
              </View>
            )}
          </View>
        )}

        {/* Photo Spots Tab */}
        {activeTab === 'photos' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📸 Photo & Social Intelligence</Text>
            <Text style={styles.sectionSummary}>
              {recommendations.recommendations.photos.summary.recommendation}
            </Text>

            {recommendations.recommendations.photos.spots.map((spot, index) => (
              <View key={index} style={styles.photoCard}>
                <Text style={styles.photoName}>{spot.name}</Text>
                <Text style={styles.photoDescription}>{spot.description}</Text>

                <View style={styles.photoMeta}>
                  <View style={styles.photoMetaItem}>
                    <Text style={styles.photoMetaLabel}>Best Time:</Text>
                    <Text style={styles.photoMetaValue}>{spot.bestTime}</Text>
                  </View>
                  <View style={styles.photoMetaItem}>
                    <Text style={styles.photoMetaLabel}>Light:</Text>
                    <Text style={styles.photoMetaValue}>{spot.lightQuality}</Text>
                  </View>
                  <View style={styles.photoMetaItem}>
                    <Text style={styles.photoMetaLabel}>Crowd:</Text>
                    <Text style={styles.photoMetaValue}>{spot.crowdLevel}</Text>
                  </View>
                </View>

                <View style={styles.anglesContainer}>
                  <Text style={styles.anglesTitle}>Suggested Angles:</Text>
                  <View style={styles.anglesList}>
                    {spot.angles.map((angle, idx) => (
                      <View key={idx} style={styles.angleTag}>
                        <Text style={styles.angleText}>{angle}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.posesContainer}>
                  <Text style={styles.posesTitle}>Suggested Poses:</Text>
                  <View style={styles.posesList}>
                    {spot.poses.map((pose, idx) => (
                      <View key={idx} style={styles.poseTag}>
                        <Text style={styles.poseText}>{pose}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}

            {/* Social Media Tips */}
            {recommendations.recommendations.photos.tips.map((tip, index) => (
              <View key={index} style={styles.tipCard}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
                <View style={styles.tipSuggestions}>
                  {tip.suggestions.map((suggestion, idx) => (
                    <View key={idx} style={styles.suggestionItem}>
                      <Text style={styles.suggestionBullet}>•</Text>
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#6366f1',
  },
  tabText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#6366f1',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  sectionSummary: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  experienceCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  experienceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
  },
  badgeMorning: {
    backgroundColor: '#dbeafe',
  },
  badgeEvening: {
    backgroundColor: '#fef3c7',
  },
  badgeNight: {
    backgroundColor: '#e9d5ff',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#374151',
  },
  experienceDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'capitalize',
  },
  priceContainer: {
    marginBottom: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  bestForContainer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  bestForLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  bestForText: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
  },
  photoCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  photoName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  photoDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
  },
  photoMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 15,
  },
  photoMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoMetaLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 4,
  },
  photoMetaValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  anglesContainer: {
    marginBottom: 15,
  },
  anglesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  anglesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  angleTag: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  angleText: {
    fontSize: 12,
    color: '#6366f1',
  },
  posesContainer: {
    marginBottom: 10,
  },
  posesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  posesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  poseTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  poseText: {
    fontSize: 12,
    color: '#374151',
  },
  tipCard: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  tipSuggestions: {
    gap: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  suggestionBullet: {
    fontSize: 14,
    color: '#6366f1',
    marginRight: 8,
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  warningCard: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 4,
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
  noDataText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6b7280',
  },
});

export default ExperiencesScreen;

