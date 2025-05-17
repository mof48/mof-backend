import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { handleJoin } from '../controllers/joinController.js';

const router = express.Router();

// POST /api/join
router.post('/', upload.single('idFile'), handleJoin);

export default router;
