import express from 'express';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import {
  getDashboardStats,
  getChartData,
  getRecentApprovals
} from '../controllers/adminController.js';

const router = express.Router();

// Admin-protected routes
router.use(auth, isAdmin);

router.get('/stats', getDashboardStats);
router.get('/chart-data', getChartData);
router.get('/recent-approvals', getRecentApprovals);

export default router;
