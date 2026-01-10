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

const RecommendationsScreen = () => {
  const { activeTrip, user } = useApp();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

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

  if (!recommendations) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No recommendations available</Text>
      </View>
    );
  }

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'food', label: 'Food' },
    { id: 'experiences', label: 'Experiences' },
  ];

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.tabActive,
            ]}
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
      </ScrollView>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Clothing Recommendations */}
        {(activeTab === 'all' || activeTab === 'clothing') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👕 Clothing Recommendations</Text>
            <Text style={styles.sectionSummary}>
              {recommendations.recommendations.clothing.summary.recommendation}
            </Text>
            {recommendations.recommendations.clothing.items.map((item, index) => (
              <View key={index} style={styles.recommendationCard}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Rent: ₹{item.rentPrice}</Text>
                  <Text style={styles.priceLabel}>Buy: ₹{item.buyPrice}</Text>
                </View>
              </View>
            ))}
            {recommendations.recommendations.clothing.warnings.length > 0 && (
              <View style={styles.warningCard}>
                <Text style={styles.warningTitle}>⚠️ Warnings</Text>
                {recommendations.recommendations.clothing.warnings.map((warning, index) => (
                  <Text key={index} style={styles.warningText}>• {warning}</Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Food Recommendations */}
        {(activeTab === 'all' || activeTab === 'food') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🍽️ Food Recommendations</Text>
            <Text style={styles.sectionSummary}>
              {recommendations.recommendations.food.summary.recommendation}
            </Text>
            {recommendations.recommendations.food.items.map((item, index) => (
              <View key={index} style={styles.recommendationCard}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View style={styles.metaContainer}>
                  <Text style={styles.metaText}>Type: {item.type}</Text>
                  <Text style={styles.metaText}>Spice: {item.spiceLevel}</Text>
                  <Text style={styles.metaText}>{item.priceRange}</Text>
                </View>
              </View>
            ))}
            {recommendations.recommendations.food.warnings.length > 0 && (
              <View style={styles.warningCard}>
                <Text style={styles.warningTitle}>⚠️ Warnings</Text>
                {recommendations.recommendations.food.warnings.map((warning, index) => (
                  <Text key={index} style={styles.warningText}>• {warning}</Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Experience Recommendations */}
        {(activeTab === 'all' || activeTab === 'experiences') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Experience Recommendations</Text>
            <Text style={styles.sectionSummary}>
              {recommendations.recommendations.experiences.summary.recommendation}
            </Text>
            {recommendations.recommendations.experiences.items.map((item, index) => (
              <View key={index} style={styles.recommendationCard}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View style={styles.metaContainer}>
                  <Text style={styles.metaText}>Duration: {item.duration}</Text>
                  <Text style={styles.metaText}>Walking: {item.walkingIntensity}</Text>
                  <Text style={styles.metaText}>{item.priceRange}</Text>
                </View>
                <Text style={styles.bestFor}>Best for: {item.bestFor}</Text>
              </View>
            ))}
            {recommendations.recommendations.experiences.warnings.length > 0 && (
              <View style={styles.warningCard}>
                <Text style={styles.warningTitle}>⚠️ Warnings</Text>
                {recommendations.recommendations.experiences.warnings.map((warning, index) => (
                  <Text key={index} style={styles.warningText}>• {warning}</Text>
                ))}
              </View>
            )}
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tabsContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  tabActive: {
    backgroundColor: '#6366f1',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
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
    marginBottom: 15,
    fontStyle: 'italic',
  },
  recommendationCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 14,
    // color: '#6366f1',
    color: 'red',

    fontWeight: '600',
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bestFor: {
    fontSize: 12,
    color: '#6366f1',
    marginTop: 8,
    fontStyle: 'italic',
  },
  warningCard: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 8,
    marginTop: 15,
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

export default RecommendationsScreen;

