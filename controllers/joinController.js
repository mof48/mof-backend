import JoinApplication from '../models/JoinApplication.js';

export const handleJoin = async (req, res) => {
  try {
    const { name, email, tier, inviteCode, speakerCode } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'ID file is required' });
    }

    const newApplication = new JoinApplication({
      name,
      email,
      tier,
      inviteCode,
      speakerCode,
      idFilePath: req.file.path
    });

    await newApplication.save();

    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (err) {
    console.error('Join error:', err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
