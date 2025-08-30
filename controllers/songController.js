// controllers/songController.js
const Song = require("../models/Song");

// ✅ GET songs (supports category + search)
exports.getSongs = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    if (category && category !== "all") filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const songs = await Song.find(filter);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
};

// ✅ POST new song
exports.addSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ error: "Failed to add song" });
  }
};
