const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');

// GET all tracks
router.get('/tracks', musicController.getTracks);

// POST a new track
router.post('/tracks', musicController.addTrack);

// DELETE a track by ID — ❗ DO NOT ADD () AFTER FUNCTION
// router.delete('/tracks/:id', musicController.deleteTrack);

module.exports = router;
