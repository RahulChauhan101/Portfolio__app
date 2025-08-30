 const Music = require('../models/music');

// GET all tracks
exports.getTracks = async (req, res) => {
  try {
    const tracks = await Music.find();
    res.status(200).json(tracks);
  } catch (err) {
    console.error("Error fetching tracks:", err); // 👈 log to terminal
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
};


// POST a new track
exports.addTrack = async (req, res) => {
  const { title, src, image } = req.body;

  if (!title || !src) {
    return res.status(400).json({ error: "title and src are required." });
  }

  try {
    const newTrack = new Music({
      title,
      src,
      image: image || "http://localhost:5000/assets/default.jpg", // 👈 auto-set default
    });
    await newTrack.save();
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).json({ error: "Failed to add track" });
  }
};




// // POST a new track
// exports.addTrack = (req, res) => {
//   const { title, src, image } = req.body;

//   if (!title || !src || !image) {
//     return res.status(400).json({ error: "title, src, and image are required." });
//   }

//   const newTrack = {
//     id: Date.now().toString(), // unique ID
//     title,
//     src,
//     image
//   };

//   tracks.push(newTrack);
//   res.status(201).json(newTrack);
// };

// DELETE a track by ID
// DELETE a track by ID (MongoDB version)
exports.deleteTrack = async (req, res) => {
  try {
    const { id } = req.params;

    // Try to delete from MongoDB
    const deletedTrack = await Music.findByIdAndDelete(id);

    if (!deletedTrack) {
      return res.status(404).json({ error: "Track not found" });
    }

    res.status(200).json({ message: "Track deleted", track: deletedTrack });
  } catch (err) {
    console.error("Error deleting track:", err);
    res.status(500).json({ error: "Failed to delete track" });
  }
};

