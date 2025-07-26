const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
  url: String,
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  uploadedAt: { type: Date, default: Date.now },
  uniqueName: { type: String, unique: true }
});
module.exports = mongoose.model('Image', imageSchema);
