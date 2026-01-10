import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useApp } from '../context/AppContext';
import DatePicker from '../components/DatePicker';

const TripSetupScreen = ({ navigation }) => {
  const { createTrip } = useApp();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: null,
    endDate: null,
    travelGroup: '',
    accommodation: '',
    safetySensitivity: 'normal',
    comfortLevel: 'moderate',
    activityIntensity: 'moderate',
  });

  const handleCreateTrip = async () => {
    // Validation
    if (!formData.destination.trim()) {
      Alert.alert('Error', 'Please enter a destination');
      return;
    }
    if (!formData.travelGroup) {
      Alert.alert('Error', 'Please select your travel group type');
      return;
    }
    if (!formData.startDate) {
      Alert.alert('Error', 'Please select a start date');
      return;
    }
    if (!formData.endDate) {
      Alert.alert('Error', 'Please select an end date');
      return;
    }
    if (formData.startDate && formData.endDate) {
      const start = formData.startDate instanceof Date 
        ? formData.startDate 
        : new Date(formData.startDate);
      const end = formData.endDate instanceof Date 
        ? formData.endDate 
        : new Date(formData.endDate);
      
      if (end <= start) {
        Alert.alert('Error', 'End date must be after start date');
        return;
      }
    }

    try {
      // Ensure dates are Date objects and valid
      const startDate = formData.startDate instanceof Date 
        ? formData.startDate 
        : new Date(formData.startDate);
      const endDate = formData.endDate instanceof Date 
        ? formData.endDate 
        : new Date(formData.endDate);

      await createTrip({
        destination: formData.destination.trim(),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        travelGroup: formData.travelGroup,
        accommodation: formData.accommodation || undefined,
        safetySensitivity: formData.safetySensitivity,
        comfortLevel: formData.comfortLevel,
        activityIntensity: formData.activityIntensity,
      });
      // Navigation will happen automatically via AppNavigator
    } catch (error) {
      Alert.alert('Error', 'Failed to create trip. Please try again.');
      console.error(error);
    }
  };

  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Create Your Trip</Text>
        <Text style={styles.subtitle}>
          Set up your trip to get personalized recommendations
        </Text>

        <Text style={styles.label}>Destination (City) *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Mumbai, Goa, Delhi"
          value={formData.destination}
          onChangeText={(text) => updateFormData('destination', text)}
        />

        <DatePicker
          label="Travel Start Date *"
          value={formData.startDate}
          onDateChange={(date) => updateFormData('startDate', date)}
          minimumDate={new Date()}
          placeholder="Select start date"
          testID="start-date-picker"
        />

        <DatePicker
          label="Travel End Date *"
          value={formData.endDate}
          onDateChange={(date) => updateFormData('endDate', date)}
          minimumDate={formData.startDate || new Date()}
          placeholder="Select end date"
          testID="end-date-picker"
        />

        <Text style={styles.label}>Travel Group Type *</Text>
        <View style={styles.optionsGrid}>
          {[
            { value: 'solo', label: 'Solo', icon: '👤' },
            { value: 'couple', label: 'Couple', icon: '👫' },
            { value: 'family', label: 'Family', icon: '👨‍👩‍👧' },
            { value: 'kids', label: 'With Kids', icon: '👶' },
            { value: 'elderly', label: 'With Elderly', icon: '👴' },
          ].map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.groupOption,
                formData.travelGroup === option.value &&
                  styles.groupOptionSelected,
              ]}
              onPress={() => updateFormData('travelGroup', option.value)}
            >
              <Text style={styles.groupIcon}>{option.icon}</Text>
              <Text
                style={[
                  styles.groupText,
                  formData.travelGroup === option.value &&
                    styles.groupTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Accommodation Type (Optional)</Text>
        <View style={styles.optionsRow}>
          {['Hotel', 'Hostel', 'Airbnb'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                formData.accommodation === option.toLowerCase() &&
                  styles.optionButtonSelected,
              ]}
              onPress={() =>
                updateFormData('accommodation', option.toLowerCase())
              }
            >
              <Text
                style={[
                  styles.optionText,
                  formData.accommodation === option.toLowerCase() &&
                    styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Safety Sensitivity</Text>
        <View style={styles.optionsRow}>
          {['Normal', 'High'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                formData.safetySensitivity === option.toLowerCase() &&
                  styles.optionButtonSelected,
              ]}
              onPress={() =>
                updateFormData('safetySensitivity', option.toLowerCase())
              }
            >
              <Text
                style={[
                  styles.optionText,
                  formData.safetySensitivity === option.toLowerCase() &&
                    styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Comfort Level</Text>
        <View style={styles.optionsRow}>
          {['Basic', 'Moderate', 'Premium'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                formData.comfortLevel === option.toLowerCase() &&
                  styles.optionButtonSelected,
              ]}
              onPress={() =>
                updateFormData('comfortLevel', option.toLowerCase())
              }
            >
              <Text
                style={[
                  styles.optionText,
                  formData.comfortLevel === option.toLowerCase() &&
                    styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreateTrip}>
          <Text style={styles.createButtonText}>Create Trip & Start Exploring</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9fafb',
  },
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 5,
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    marginRight: 10,
    marginBottom: 10,
  },
  optionButtonSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
  },
  optionTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  groupOption: {
    width: '30%',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupOptionSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  groupIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  groupText: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
  },
  groupTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  createButton: {
    marginTop: 30,
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default TripSetupScreen;

