import express from 'express';
import auth from '../middleware/auth.js';
import {
  updateUserProfile,
  updateShadowProfile,
  getAllUsers
} from '../controllers/userController.js';

const router = express.Router();

router.use(auth);

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome, ' + req.user.name });
});

router.patch('/profile', updateUserProfile);
router.patch('/shadow-profile', updateShadowProfile);
router.get('/all', getAllUsers);

export default router;
