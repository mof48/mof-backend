// controllers/joinController.js
import Joi from 'joi';
import JoinApplication from '../models/JoinApplication.js';

const joinSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  tier: Joi.string().required(),
  inviteCode: Joi.string().optional().allow(''),
  speakerCode: Joi.string().optional().allow('')
});

export const handleJoin = async (req, res) => {
  try {
    const { error, value } = joinSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    if (!req.file) {
      return res.status(400).json({ error: 'ID file is required' });
    }

    const newApplication = new JoinApplication({
      ...value,
      idFilePath: req.file.path
    });

    await newApplication.save();
    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (err) {
    console.error('Join error:', err.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
