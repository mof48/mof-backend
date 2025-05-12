// routes/admin.js
const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Controllers
const {
  getChartData,
  getRecentApprovals,
  getDashboardStats,
} = require('../controllers/adminController');

// 🔐 All routes below are protected (token + admin)
router.get('/stats', auth, isAdmin, getDashboardStats);
router.get('/chart-data', auth, isAdmin, getChartData);
router.get('/recent-approvals', auth, isAdmin, getRecentApprovals);

module.exports = router;
