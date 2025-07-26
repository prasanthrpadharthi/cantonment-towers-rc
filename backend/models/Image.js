const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
  uniqueName: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  caption: { type: String, required: true },
  uploader: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'blocked'], default: 'pending' },
  blockComment: { type: String, default: "" },
});
module.exports = mongoose.model('Image', imageSchema);
