import express from 'express';
import { updateUserProfile, updateShadowProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'; // ✅ import protect middleware

const router = express.Router();

// ✅ Add protected route to test JWT and user access
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: 'Welcome, ' + req.user.name });
});

// ✅ User updates
router.patch('/profile', protect, updateUserProfile);
router.patch('/shadow-profile', protect, updateShadowProfile);

export default router;
