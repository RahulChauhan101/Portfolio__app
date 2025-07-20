const express = require('express');
const router = express.Router();
const Image = require('../models/imageModel');

// GET route to fetch all images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    console.error('❌ Error fetching images:', err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// POST route to save new image
router.post('/', async (req, res) => {
  try {
    const newImage = new Image({ image: req.body.image });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    console.error('❌ Error saving image:', err);
    res.status(500).json({ error: 'Failed to save image' });
  }
});

module.exports = router;
