// controllers/imageController.js
const Image = require('../models/imageModel');

const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

const addImage = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'Image URL required' });

    const newImage = new Image({ url });
    const saved = await newImage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save image' });
  }
};

module.exports = { getImages, addImage };
