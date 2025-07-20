// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors()); // ✅ Enable CORS
// app.use(express.json());

// // Your image routes
// const imageRoutes = require('./routes/imageRoutes');
// app.use('/api/images', imageRoutes);

// // Connect to MongoDB, then:
// app.listen(5000, () => console.log('Server running on http://localhost:5000'));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB error:', err));

// Routes
const imageRoutes = require('./routes/imageRoutes');
app.use('/api/images', imageRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
