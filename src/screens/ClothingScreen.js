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

const ClothingScreen = () => {
  const { activeTrip, user } = useApp();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

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

  const handleRent = (item) => {
    // In production, this would navigate to rental flow
    alert(`Rent ${item.name} for ₹${item.rentPrice}`);
  };

  const handleBuy = (item) => {
    // In production, this would navigate to purchase flow
    alert(`Buy ${item.name} for ₹${item.buyPrice}`);
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
        <Text style={styles.loadingText}>Loading clothing recommendations...</Text>
      </View>
    );
  }

  if (!recommendations) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No clothing recommendations available</Text>
      </View>
    );
  }

  const clothingItems = recommendations.recommendations.clothing.items;
  const filteredItems =
    filter === 'all'
      ? clothingItems
      : clothingItems.filter((item) => item.category === filter);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'top', label: 'Tops' },
    { id: 'bottom', label: 'Bottoms' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'footwear', label: 'Footwear' },
  ];

  return (
    <View style={styles.container}>
      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Clothing Summary</Text>
        <Text style={styles.summaryText}>
          {recommendations.recommendations.clothing.summary.recommendation}
        </Text>
        <View style={styles.summaryStats}>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryStatValue}>
              ₹{recommendations.recommendations.clothing.summary.estimatedRentCost}
            </Text>
            <Text style={styles.summaryStatLabel}>Rent Total</Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryStatValue}>
              ₹{recommendations.recommendations.clothing.summary.estimatedBuyCost}
            </Text>
            <Text style={styles.summaryStatLabel}>Buy Total</Text>
          </View>
        </View>
      </View>

      {/* Category Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.filter, filter === cat.id && styles.filterActive]}
            onPress={() => setFilter(cat.id)}
          >
            <Text
              style={[
                styles.filterText,
                filter === cat.id && styles.filterTextActive,
              ]}
            >
              {cat.label}
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
        {filteredItems.map((item, index) => (
          <View key={index} style={styles.clothingCard}>
            <View style={styles.clothingHeader}>
              <View style={styles.clothingInfo}>
                <Text style={styles.clothingName}>{item.name}</Text>
                <Text style={styles.clothingCategory}>
                  {item.category.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.clothingDescription}>{item.description}</Text>

            <View style={styles.priceSection}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Rent:</Text>
                <Text style={styles.priceValue}>₹{item.rentPrice}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Buy:</Text>
                <Text style={styles.priceValue}>₹{item.buyPrice}</Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.rentButton]}
                onPress={() => handleRent(item)}
              >
                <Text style={styles.rentButtonText}>Rent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.buyButton]}
                onPress={() => handleBuy(item)}
              >
                <Text style={styles.buyButtonText}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Warnings */}
        {recommendations.recommendations.clothing.warnings.length > 0 && (
          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>⚠️ Important Warnings</Text>
            {recommendations.recommendations.clothing.warnings.map(
              (warning, index) => (
                <Text key={index} style={styles.warningText}>
                  • {warning}
                </Text>
              )
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
  summaryCard: {
    backgroundColor: '#6366f1',
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#e0e7ff',
    marginBottom: 15,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  summaryStatLabel: {
    fontSize: 12,
    color: '#e0e7ff',
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  filterActive: {
    backgroundColor: '#6366f1',
  },
  filterText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  clothingCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  clothingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  clothingInfo: {
    flex: 1,
  },
  clothingName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  clothingCategory: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '600',
  },
  clothingDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rentButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  rentButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  buyButton: {
    backgroundColor: '#6366f1',
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
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

export default ClothingScreen;

