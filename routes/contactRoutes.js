import express from 'express';
import {
  sendContactRequest,
  getUserRequests,
  respondToRequest,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, sendContactRequest);
router.get('/', protect, getUserRequests);
router.patch('/:id', protect, respondToRequest);

export default router;
