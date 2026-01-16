const express = require('express');
const router = express.Router();
const { getClothesRecommendations } = require('../services/recommendationEngine');

/**
 * @route   GET /api/clothes
 * @desc    Get clothing recommendations
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

    // Get trip and user data
    const Trip = require('../models/Trip');
    const User = require('../models/User');
    
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

    // Get recommendations
    const recommendations = await getClothesRecommendations(trip, req.user);

    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get clothing recommendations',
      error: error.message
    });
  }
});

module.exports = router;

