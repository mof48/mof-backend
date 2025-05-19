import express from 'express';
import {
  sendRequest,
  acceptRequest,
  declineRequest
} from '../controllers/contactController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/request', authMiddleware, sendRequest);
router.post('/accept', authMiddleware, acceptRequest);
router.post('/decline', authMiddleware, declineRequest);

export default router;
