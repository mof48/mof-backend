import express from 'express';
const router = express.Router();

// Dummy login route (customize later)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // TODO: Add real login logic
  res.json({ message: `Logged in as ${email}` });
});

export default router;
