// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Import admin routes
const adminRoutes = require('./routes/admin');

// Mount all admin routes under /api/admin
app.use('/api/admin', adminRoutes);

// Optional: base route
app.get('/', (req, res) => {
  res.send('MOF Women API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
