const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const { body, validationResult } = require('express-validator');

/**
 * @route   GET /api/trips
 * @desc    Get all trips for current user
 * @access  Private
 */
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trips',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/trips/:id
 * @desc    Get single trip
 * @access  Private
 */
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trip',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/trips/active/current
 * @desc    Get active trip for current user
 * @access  Private
 */
router.get('/active/current', async (req, res) => {
  try {
    const trip = await Trip.findOne({
      userId: req.user._id,
      isActive: true
    });

    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch active trip',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/trips
 * @desc    Create new trip
 * @access  Private
 */
router.post('/', [
  body('destination').notEmpty().trim(),
  body('startDate').isISO8601(),
  body('endDate').isISO8601(),
  body('travelGroup').isIn(['solo', 'couple', 'family', 'kids', 'elderly'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    // Deactivate all other trips for this user
    await Trip.updateMany(
      { userId: req.user._id },
      { isActive: false }
    );

    // Create new trip
    const trip = await Trip.create({
      ...req.body,
      userId: req.user._id,
      isActive: true,
      status: 'planned'
    });

    res.status(201).json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create trip',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/trips/:id
 * @desc    Update trip
 * @access  Private
 */
router.put('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update trip',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/trips/:id/activate
 * @desc    Set trip as active
 * @access  Private
 */
router.put('/:id/activate', async (req, res) => {
  try {
    // Deactivate all trips
    await Trip.updateMany(
      { userId: req.user._id },
      { isActive: false }
    );

    // Activate selected trip
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isActive: true },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to activate trip',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/trips/:id
 * @desc    Delete trip
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete trip',
      error: error.message
    });
  }
});

module.exports = router;

