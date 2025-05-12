// routes.js or routes/index.js
const express = require('express');
const router = express.Router();

// Import individual route modules
const adminRoutes = require('./admin');
// const authRoutes = require('./auth');     // Optional
// const userRoutes = require('./users');    // Optional

// Mount them under their base paths
router.use('/admin', adminRoutes);
// router.use('/auth', authRoutes);
// router.use('/users', userRoutes);

module.exports = router;
