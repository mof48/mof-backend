import express from 'express';
import auth from '../middleware/auth.js';
import {
  sendContactRequest,
  getUserRequests,
  respondToRequest
} from '../controllers/contactController.js';

const router = express.Router();

// All contact routes require authentication
router.use(auth);

router.post('/', sendContactRequest);
router.get('/', getUserRequests);
router.patch('/:id', respondToRequest);

export default router;
