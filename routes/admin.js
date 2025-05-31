const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isAdmin } = require('../middleware/auth');

// 🔐 SECRET KEY from .env
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ 1. Impersonate Member
router.get('/impersonate/:id', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ 2. Search Users (by name, email, tier)
router.get('/search-users', isAdmin, async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json([]);

    const users = await User.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { email: new RegExp(query, 'i') },
        { tier: new RegExp(query, 'i') },
      ],
    }).select('name email tier');
    
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to search users' });
  }
});

// ✅ 3. Recent Approvals (return userId)
router.get('/recent-approvals', isAdmin, async (req, res) => {
  try {
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name tier createdAt');

    const formatted = recentUsers.map((u) => ({
      name: u.name,
      tier: u.tier,
      date: u.createdAt.toLocaleDateString(),
      userId: u._id,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recent approvals' });
  }
});

module.exports = router;
