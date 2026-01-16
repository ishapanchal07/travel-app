const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings for user
 * @access  Private
 */
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/bookings
 * @desc    Create new booking (clothing rental/purchase)
 * @access  Private
 */
router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      userId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
});

module.exports = router;

