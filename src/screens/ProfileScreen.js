import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';

const ProfileScreen = ({ navigation }) => {
  const { user, activeTrip, trips, setActiveTripById, updateUserPreferences } = useApp();

  const handleSwitchTrip = (tripId) => {
    setActiveTripById(tripId);
    Alert.alert('Success', 'Trip switched successfully');
  };

  const handleEditProfile = () => {
    // In production, navigate to edit profile screen
    Alert.alert('Edit Profile', 'Profile editing coming soon');
  };

  const handleCreateNewTrip = () => {
    // Clear active trip to trigger trip setup screen
    // This would be handled by navigation logic
    Alert.alert('New Trip', 'Creating new trip...');
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Info */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.gender?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>Traveler</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditProfile}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* User Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.preferenceCard}>
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Gender:</Text>
            <Text style={styles.preferenceValue}>
              {user?.gender || 'Not set'}
            </Text>
          </View>
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Clothing Size:</Text>
            <Text style={styles.preferenceValue}>
              {user?.clothingSize || 'Not set'}
            </Text>
          </View>
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Dietary Preference:</Text>
            <Text style={styles.preferenceValue}>
              {user?.dietaryPreference || 'None'}
            </Text>
          </View>
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Travel Style:</Text>
            <Text style={styles.preferenceValue}>
              {user?.travelStyle || 'Not set'}
            </Text>
          </View>
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Social Intent:</Text>
            <Text style={styles.preferenceValue}>
              {user?.socialIntent || 'Not set'}
            </Text>
          </View>
        </View>
      </View>

      {/* Active Trip */}
      {activeTrip && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Trip</Text>
          <View style={styles.tripCard}>
            <Text style={styles.tripDestination}>{activeTrip.destination}</Text>
            <Text style={styles.tripDates}>
              {new Date(activeTrip.startDate).toLocaleDateString()} -{' '}
              {new Date(activeTrip.endDate).toLocaleDateString()}
            </Text>
            <View style={styles.tripMeta}>
              <View style={styles.tripMetaItem}>
                <Text style={styles.tripMetaLabel}>Group:</Text>
                <Text style={styles.tripMetaValue}>
                  {activeTrip.travelGroup}
                </Text>
              </View>
              <View style={styles.tripMetaItem}>
                <Text style={styles.tripMetaLabel}>Comfort:</Text>
                <Text style={styles.tripMetaValue}>
                  {activeTrip.comfortLevel}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* All Trips */}
      {trips.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Trips</Text>
          {trips.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={[
                styles.tripCard,
                activeTrip?.id === trip.id && styles.tripCardActive,
              ]}
              onPress={() => handleSwitchTrip(trip.id)}
            >
              <Text style={styles.tripDestination}>{trip.destination}</Text>
              <Text style={styles.tripDates}>
                {new Date(trip.startDate).toLocaleDateString()} -{' '}
                {new Date(trip.endDate).toLocaleDateString()}
              </Text>
              {activeTrip?.id === trip.id && (
                <Text style={styles.activeLabel}>Active</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Actions */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleCreateNewTrip}
        >
          <Text style={styles.actionButtonText}>+ Create New Trip</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <Text style={styles.appInfo}>ROAMSTER v1.0.0</Text>
        <Text style={styles.appInfoSubtext}>
          Your luggage-less travel companion
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  profileHeader: {
    backgroundColor: '#ffffff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  editButtonText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
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
  preferenceCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  preferenceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'capitalize',
  },
  tripCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tripCardActive: {
    borderColor: '#6366f1',
    borderWidth: 2,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 5,
  },
  tripDates: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
  },
  tripMeta: {
    flexDirection: 'row',
    gap: 20,
  },
  tripMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripMetaLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 5,
  },
  tripMetaValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'capitalize',
  },
  activeLabel: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '600',
    marginTop: 5,
  },
  actionButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  appInfo: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 5,
  },
  appInfoSubtext: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default ProfileScreen;

