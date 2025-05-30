// controllers/postController.js
import Joi from 'joi';
import Post from '../models/Post.js';
import User from '../models/User.js';

const postSchema = Joi.object({
  content: Joi.string().min(1).required(),
  identity: Joi.string().valid('real', 'shadow').required()
});

export const createPost = async (req, res) => {
  try {
    const { error, value } = postSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const persona = value.identity === 'shadow'
      ? user.shadowProfile
      : { name: user.name, profilePhoto: user.profilePhoto };

    const post = await Post.create({
      content: value.content,
      author: user._id,
      displayName: persona.name,
      avatar: persona.profilePhoto
    });

    res.status(201).json(post);
  } catch (err) {
    console.error('Create post error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('Get posts error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
