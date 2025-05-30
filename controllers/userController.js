import Joi from 'joi';
import User from '../models/User.js';

// Validation schemas
const mainProfileSchema = Joi.object({
  profilePhoto: Joi.string().allow('', null),
  bannerPhoto: Joi.string().allow('', null),
  bio: Joi.string().allow('', null),
  location: Joi.string().allow('', null),
  specialization: Joi.string().allow('', null)
});

const shadowProfileSchema = Joi.object({
  name: Joi.string().allow('', null),
  bio: Joi.string().allow('', null),
  profilePhoto: Joi.string().allow('', null)
});

// ✅ Update main profile
export const updateUserProfile = async (req, res) => {
  try {
    const { error, value } = mainProfileSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('User not found');

    Object.assign(user, value);
    await user.save();

    res.json(user);
  } catch (err) {
    console.error('Update profile error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Update shadow profile
export const updateShadowProfile = async (req, res) => {
  try {
    const { error, value } = shadowProfileSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('User not found');

    Object.assign(user.shadowProfile, value);
    await user.save();

    res.json(user.shadowProfile);
  } catch (err) {
    console.error('Update shadow error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('_id name specialization profilePhoto');
    res.json(users);
  } catch (err) {
    console.error('Fetch users error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
