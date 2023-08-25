const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
