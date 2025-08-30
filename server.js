const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- Middleware --------------------
app.use(cors());
app.use(express.json());

// -------------------- Routes --------------------
const musicRoutes = require("./routes/musicRoutes");      // optional if you have it
const songRoutes = require("./routes/songRoutes");

app.use("/api/music", musicRoutes);
app.use("/api/songs", songRoutes);

// -------------------- Static Assets --------------------
app.use("/assets", express.static(path.join(__dirname, "assets"))); 
app.use("/images", express.static(path.join(__dirname, "Images")));


// Example test route
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});



// -------------------- MongoDB Connection --------------------
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mymusic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
