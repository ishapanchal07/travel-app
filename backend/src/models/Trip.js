const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  travelGroup: {
    type: String,
    enum: ['solo', 'couple', 'family', 'kids', 'elderly'],
    required: [true, 'Travel group type is required']
  },
  accommodation: {
    type: String,
    enum: ['hotel', 'hostel', 'airbnb'],
    default: null
  },
  safetySensitivity: {
    type: String,
    enum: ['normal', 'high'],
    default: 'normal'
  },
  comfortLevel: {
    type: String,
    enum: ['basic', 'moderate', 'premium'],
    default: 'moderate'
  },
  activityIntensity: {
    type: String,
    enum: ['low', 'moderate', 'high'],
    default: 'moderate'
  },
  isActive: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['planned', 'active', 'completed', 'cancelled'],
    default: 'planned'
  },
  location: {
    latitude: Number,
    longitude: Number,
    city: String,
    country: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
tripSchema.index({ userId: 1, isActive: 1 });
tripSchema.index({ destination: 1 });
tripSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model('Trip', tripSchema);

