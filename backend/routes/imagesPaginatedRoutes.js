const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
const auth = require('../middleware/authMiddleware');

// GET /api/images-paginated?page=1&limit=12
router.get('/', async (req, res) => {
  try {
    // Prevent caching in all environments
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    console.log('Fetching paginated images');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    const filter = status ? { status } : {};

    const [images, total] = await Promise.all([
      Image.find(filter)
        .sort({ uploadedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('uploader', 'username'),
      Image.countDocuments(filter)
    ]);

    res.json({
      images,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch images', error: err.message });
  }
});

module.exports = router;
