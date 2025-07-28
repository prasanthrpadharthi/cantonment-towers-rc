
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const auth = require('../middleware/authMiddleware');

const { uploadImage, getAllImages, updateImageStatus } = require('../controllers/imageController');
const mongoose = require('mongoose');
const Image = require('../models/Image');

// Upload image (admin only)
router.post('/upload', auth, upload.single('image'), uploadImage);

// Get all images (admin only)
router.get('/', auth, getAllImages);

// PATCH /api/images/:id/status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  try {
    const image = await require('../models/Image').findByIdAndUpdate(id, { status }, { new: true });
    if (!image) return res.status(404).json({ message: 'Image not found' });
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err.message });
  }
});

// PATCH /api/images/:id/block - block an image with a comment (public, for moderation)
router.patch('/:id/block', auth, async (req, res) => {
  try {
    console.log('Blocking image:', req.params.id);
    const { comment } = req.body;
    const imageId = mongoose.Types.ObjectId.isValid(req.params.id) ? new mongoose.Types.ObjectId(req.params.id) : req.params.id;
    const image = await Image.findByIdAndUpdate(
        imageId,
        { status: 'blocked', blockComment: comment || '' },
        { new: true }
    );
    if (!image) return res.status(404).json({ message: 'Image not found' });
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: 'Failed to block image', error: err.message });
  }
});

module.exports = router;
