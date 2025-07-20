const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  image: String, // this will store the image URL
});

module.exports = mongoose.model('Image', imageSchema);
