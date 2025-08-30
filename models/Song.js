const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: String,
    album: String,
    movie: String,
    genre: String,
    category: {
      type: String,
      enum: [
        "all",
        "singer",
        "actor",
        "actress",
        "movie",
        "album",
        "genre",
        "playlist",
        "favorites",
        "recent",
      ],
      default: "all",
    },
    url: String,
    cover: {
      type: String,
      default: "https://via.placeholder.com/150" // default image if none provided
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Song || mongoose.model("Song", SongSchema);
