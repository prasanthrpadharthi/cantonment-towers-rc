const Image = require('../models/Image');
const cloudinary = require('../utils/cloudinary');

exports.uploadImage = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file uploaded' });
  const result = await cloudinary.uploader.upload(file.path);
  const image = await Image.create({
    url: result.secure_url,
    uploader: req.user.id
  });
  res.json(image);
};

exports.getAllImages = async (req, res) => {
  const images = await Image.find().populate('uploader', 'username');
  res.json(images);
};

exports.updateImageStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['approved', 'rejected'].includes(status))
    return res.status(400).json({ message: 'Invalid status' });
  const image = await Image.findByIdAndUpdate(id, { status }, { new: true });
  res.json(image);
};
