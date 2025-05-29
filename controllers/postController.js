import Post from '../models/Post.js';
import User from '../models/User.js';

export const createPost = async (req, res) => {
  try {
    const { content, identity } = req.body;
    const user = await User.findById(req.user._id);

    const persona = identity === 'shadow'
      ? user.shadowProfile
      : { name: user.name, profilePhoto: user.profilePhoto };

    const post = await Post.create({
      content,
      author: req.user._id,
      displayName: persona.name,
      avatar: persona.profilePhoto,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
