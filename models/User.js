const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'member', 'guest', 'speaker'],
      default: 'member',
    },
    tier: {
      type: String,
      enum: ['gold-rose', 'platinum-lily', 'diamond-orchid'],
      default: 'gold-rose',
    },
    membershipNumber: {
      type: String,
      unique: true,
    },
    state: {
      type: String,
    },
    profession: {
      type: String,
    },
    shadowProfile: {
      name: String,
      bio: String,
    },
    avatar: {
      type: String, // URL to profile image
    },
    isTherapist: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // ✅ Adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('User', userSchema);
