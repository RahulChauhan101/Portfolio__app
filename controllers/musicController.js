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

  if (!title || !src || !image) {
    return res.status(400).json({ error: "title, src, and image are required." });
  }

  try {
    const newTrack = new Music({ title, src, image });
    await newTrack.save();
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add track' });
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
exports.deleteTrack = (req, res) => {
  const { id } = req.params;
  const index = tracks.findIndex(track => track.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Track not found" });
  }

  const deleted = tracks.splice(index, 1);
  res.status(200).json({ message: "Track deleted", track: deleted[0] });
};
