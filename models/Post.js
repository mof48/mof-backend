import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  displayName: { type: String, required: true },
  avatar: { type: String },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of user IDs who liked
  visibility: {
    type: String,
    enum: ['public', 'private', 'shadow'],
    default: 'public'
  },

  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
