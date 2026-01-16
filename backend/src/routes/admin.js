const express = require('express');
const router = express.Router();
const { authorize } = require('../middleware/auth');

// Admin routes require admin role
router.use(authorize('admin'));

/**
 * @route   GET /api/admin/stats
 * @desc    Get admin dashboard statistics
 * @access  Private (Admin only)
 */
router.get('/stats', async (req, res) => {
  try {
    const User = require('../models/User');
    const Trip = require('../models/Trip');
    const Booking = require('../models/Booking');

    const stats = {
      totalUsers: await User.countDocuments(),
      totalTrips: await Trip.countDocuments(),
      totalBookings: await Booking.countDocuments(),
      activeTrips: await Trip.countDocuments({ isActive: true })
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get stats',
      error: error.message
    });
  }
});

module.exports = router;

