import express from 'express';
import auth from '../middleware/auth.js';
import upload from '../middleware/uploadMiddleware.js';
import {
  uploadCredential,
  getUserCredentialStatus,
  getAllCredentialRequests,
  verifyCredential,
  rejectCredential
} from '../controllers/credentialController.js';

const router = express.Router();

// All routes require auth
router.use(auth);

// Upload credential (only one allowed per user)
router.post('/upload', upload.single('credential'), uploadCredential);

// Get logged-in user's credential status
router.get('/status', getUserCredentialStatus);

// Admin-only routes
router.get('/requests', getAllCredentialRequests);
router.post('/verify/:id', verifyCredential);
router.post('/reject/:id', rejectCredential);

export default router;
