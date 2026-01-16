const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  type: {
    type: String,
    enum: ['clothing_rent', 'clothing_purchase', 'experience', 'guide'],
    required: true
  },
  items: [{
    itemId: String,
    itemName: String,
    quantity: Number,
    price: Number,
    rentPrice: Number,
    buyPrice: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered', 'completed', 'cancelled'],
    default: 'pending'
  },
  deliveryAddress: {
    type: String,
    required: function() {
      return this.type === 'clothing_rent' || this.type === 'clothing_purchase';
    }
  },
  deliveryDate: Date,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentId: String,
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

module.exports = mongoose.model('Booking', bookingSchema);

