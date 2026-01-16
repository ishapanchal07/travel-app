const express = require('express');
const router = express.Router();
const { getPhotoRecommendations } = require('../services/recommendationEngine');

/**
 * @route   GET /api/photo
 * @desc    Get photo spot recommendations
 * @access  Private
 */
router.get('/', async (req, res) => {
  try {
    const { tripId } = req.query;
    
    if (!tripId) {
      return res.status(400).json({
        success: false,
        message: 'Trip ID is required'
      });
    }

    const Trip = require('../models/Trip');
    const trip = await Trip.findOne({
      _id: tripId,
      userId: req.user._id
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const recommendations = await getPhotoRecommendations(trip, req.user);

    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get photo recommendations',
      error: error.message
    });
  }
});

module.exports = router;

