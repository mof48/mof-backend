import express from 'express';
import { createPost, getAllPosts } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/posts
// @desc    Create a new post (admin or shadow)
// @access  Private
router.post('/', protect, createPost);

// @route   GET /api/posts
// @desc    Get all posts (public or private feed)
// @access  Public or protected based on use case
router.get('/', getAllPosts);

export default router;

