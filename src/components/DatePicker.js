import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

const DatePicker = ({ 
  label, 
  value, 
  onDateChange, 
  minimumDate, 
  placeholder = 'Select a date',
  testID 
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || null);

  // Update local state when value prop changes
  useEffect(() => {
    setSelectedDate(value || null);
  }, [value]);

  const handleDateSelect = (day) => {
    const newDate = new Date(day.dateString + 'T00:00:00');
    setSelectedDate(newDate);
    onDateChange(newDate);
    setShowCalendar(false);
  };

  const formattedDate = selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : '';

  const minDateStr = minimumDate ? format(minimumDate, 'yyyy-MM-dd') : undefined;
  
  // Format date for calendar markedDates
  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowCalendar(true)}
        testID={testID}
      >
        <View style={styles.dateButtonContent}>
          <Ionicons name="calendar-outline" size={20} color="#6366f1" />
          <Text style={[styles.dateText, !selectedDate && styles.placeholder]}>
            {formattedDate || placeholder}
          </Text>
        </View>
        <Ionicons name="chevron-down-outline" size={20} color="#9ca3af" />
      </TouchableOpacity>

      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select {label?.replace(' *', '') || 'Date'}</Text>
              <TouchableOpacity
                onPress={() => setShowCalendar(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <Calendar
              onDayPress={handleDateSelect}
              markedDates={
                selectedDateStr
                  ? {
                      [selectedDateStr]: {
                        selected: true,
                        selectedColor: '#6366f1',
                        selectedTextColor: '#ffffff',
                      },
                    }
                  : {}
              }
              minDate={minDateStr}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#6b7280',
                selectedDayBackgroundColor: '#6366f1',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#6366f1',
                dayTextColor: '#374151',
                textDisabledColor: '#d1d5db',
                dotColor: '#6366f1',
                selectedDotColor: '#ffffff',
                arrowColor: '#6366f1',
                monthTextColor: '#1f2937',
                textDayFontWeight: '400',
                textMonthFontWeight: '600',
                textDayHeaderFontWeight: '500',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 13,
              }}
              style={styles.calendar}
            />

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9fafb',
  },
  dateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 10,
    flex: 1,
  },
  placeholder: {
    color: '#9ca3af',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  closeButton: {
    padding: 5,
  },
  calendar: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  doneButton: {
    backgroundColor: '#6366f1',
    marginHorizontal: 20,
    marginTop: 15,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DatePicker;

