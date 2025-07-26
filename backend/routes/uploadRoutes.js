const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('../utils/cloudinary');
const Image = require('../models/Image');
const { v4: uuidv4 } = require('uuid');

// POST /api/upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Generate a unique name
    const uniqueName = uuidv4();
    // Save to MongoDB
    const imageDoc = await Image.create({
      url: result.secure_url,
      uploader: req.user ? req.user.id : null,
      uniqueName
    });
    res.json({ id: imageDoc._id, uniqueName, url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

module.exports = router;
