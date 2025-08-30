const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ---------------- Multer setup for cover image upload ----------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir); // create folder if it doesn't exist
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ---------------- POST a new song ----------------
// If you want to upload cover image, use upload.single("cover") middleware
router.post("/", upload.single("cover"), async (req, res) => {
  try {
    const { title, artist, album, movie, actor, genre, category, url } = req.body;

    // Use uploaded cover image if provided
    let coverUrl = req.body.cover || "https://via.placeholder.com/150";
    if (req.file) {
      coverUrl = `http://localhost:5000/${req.file.path.replace("\\", "/")}`; // handle Windows paths
    }

    const newSong = new Song({
      title,
      artist,
      album,
      movie,
      actor,
      genre,
      category,
      url,
      cover: coverUrl,
    });

    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------------- GET all songs ----------------
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;

    let query = {};
    if (category && category !== "all") query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

    const songs = await Song.find(query).sort({ createdAt: -1 });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});


module.exports = router;
