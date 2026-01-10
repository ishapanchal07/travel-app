import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useApp } from '../context/AppContext';

const OnboardingScreen = ({ navigation }) => {
  const { saveUser, completeOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: '',
    clothingSize: '',
    dietaryPreference: 'none',
    travelStyle: 'relaxed',
    socialIntent: 'casual',
    languagePreference: 'english',
  });

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save user and complete onboarding
      await saveUser(formData);
      await completeOnboarding();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Welcome to ROAMSTER!</Text>
      <Text style={styles.stepDescription}>
        Let's set up your profile to personalize your travel experience.
      </Text>

      <Text style={styles.label}>Gender</Text>
      <View style={styles.optionsRow}>
        {['Male', 'Female', 'Other', 'Prefer not to say'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              formData.gender === option && styles.optionButtonSelected,
            ]}
            onPress={() => updateFormData('gender', option)}
          >
            <Text
              style={[
                styles.optionText,
                formData.gender === option && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Clothing Size</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., M, L, XL"
        value={formData.clothingSize}
        onChangeText={(text) => updateFormData('clothingSize', text)}
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Travel Preferences</Text>
      <Text style={styles.stepDescription}>
        Help us understand your travel style.
      </Text>

      <Text style={styles.label}>Dietary Preference</Text>
      <View style={styles.optionsRow}>
        {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'None'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              formData.dietaryPreference === option.toLowerCase() &&
                styles.optionButtonSelected,
            ]}
            onPress={() =>
              updateFormData('dietaryPreference', option.toLowerCase())
            }
          >
            <Text
              style={[
                styles.optionText,
                formData.dietaryPreference === option.toLowerCase() &&
                  styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Travel Style</Text>
      <View style={styles.optionsRow}>
        {['Relaxed', 'Adventure', 'Aesthetic'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              formData.travelStyle === option.toLowerCase() &&
                styles.optionButtonSelected,
            ]}
            onPress={() => updateFormData('travelStyle', option.toLowerCase())}
          >
            <Text
              style={[
                styles.optionText,
                formData.travelStyle === option.toLowerCase() &&
                  styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Social Intent</Text>
      <Text style={styles.stepDescription}>
        How do you want to share your travels?
      </Text>

      <Text style={styles.label}>Social Media Goal</Text>
      <View style={styles.optionsColumn}>
        {['Photos', 'Reels', 'Casual'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButtonLarge,
              formData.socialIntent === option.toLowerCase() &&
                styles.optionButtonSelected,
            ]}
            onPress={() => updateFormData('socialIntent', option.toLowerCase())}
          >
            <Text
              style={[
                styles.optionText,
                formData.socialIntent === option.toLowerCase() &&
                  styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(step / 3) * 100}%` }]} />
        </View>

        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {step === 3 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
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
  stepContainer: {
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  stepDescription: {
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
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionsColumn: {
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
  optionButtonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    marginBottom: 10,
    alignItems: 'center',
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
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginVertical: 30,
  },
  progress: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    marginRight: 10,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default OnboardingScreen;

