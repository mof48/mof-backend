import express from 'express';
import {
  updateUserProfile,
  updateShadowProfile,
  getAllUsers, // ✅ NEW
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// PATCH routes
router.patch('/profile', protect, updateUserProfile);
router.patch('/shadow-profile', protect, updateShadowProfile);

// ✅ NEW: Get all users
router.get('/', protect, getAllUsers);

export default router;
