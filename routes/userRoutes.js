import express from 'express';
import { updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.patch('/profile', protect, updateUserProfile);
router.patch('/shadow-profile', protect, updateShadowProfile);

export default router;
