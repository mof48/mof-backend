// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Import routes
import joinRoutes from './routes/joinRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/join', joinRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MOF Women API Server is Running');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
