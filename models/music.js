const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  src: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Music', musicSchema);
