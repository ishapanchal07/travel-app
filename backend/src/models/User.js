const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  name: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['traveler', 'admin', 'partner', 'creator'],
    default: 'traveler'
  },
  // Long-term preferences
  preferences: {
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', 'Prefer not to say']
    },
    clothingSize: String,
    dietaryPreference: {
      type: String,
      enum: ['vegetarian', 'non-vegetarian', 'vegan', 'none'],
      default: 'none'
    },
    travelStyle: {
      type: String,
      enum: ['relaxed', 'adventure', 'aesthetic'],
      default: 'relaxed'
    },
    socialIntent: {
      type: String,
      enum: ['photos', 'reels', 'casual'],
      default: 'casual'
    },
    languagePreference: {
      type: String,
      default: 'english'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
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

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

