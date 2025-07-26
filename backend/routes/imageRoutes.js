const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const auth = require('../middleware/authMiddleware');

const { uploadImage, getAllImages, updateImageStatus } = require('../controllers/imageController');

router.post('/upload', auth, upload.single('image'), uploadImage);
router.get('/', auth, getAllImages);
// PATCH /api/images/:id/status
router.patch('/:id/status', async (req, res) => {
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

module.exports = router;
