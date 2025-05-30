import Joi from 'joi';
import Credential from '../models/Credential.js';

// Validation schema for verifying and rejecting by ID param
const idParamSchema = Joi.object({
  id: Joi.string().required()
});

// Upload new credential (1 per doctor)
export const uploadCredential = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'File is required' });

    const fileUrl = `/uploads/credentials/${req.file.filename}`;

    const existing = await Credential.findOne({ doctor: req.user._id });
    if (existing) await existing.deleteOne();

    const credential = await Credential.create({
      doctor: req.user._id,
      fileUrl
    });

    res.status(201).json(credential);
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Check current user's credential status
export const getUserCredentialStatus = async (req, res) => {
  try {
    const credential = await Credential.findOne({ doctor: req.user._id });
    res.json({ status: credential?.status || 'not_submitted' });
  } catch (err) {
    console.error('Status check error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin: get all credential requests
export const getAllCredentialRequests = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

    const requests = await Credential.find()
      .populate('doctor', 'name email')
      .sort({ uploadedAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error('Fetch requests error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin: verify credential
export const verifyCredential = async (req, res) => {
  try {
    const { error } = idParamSchema.validate(req.params);
    if (error) return res.status(400).json({ error: error.details[0].message });

    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

    await Credential.findByIdAndUpdate(req.params.id, { status: 'verified' });
    res.sendStatus(200);
  } catch (err) {
    console.error('Verify error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin: reject credential
export const rejectCredential = async (req, res) => {
  try {
    const { error } = idParamSchema.validate(req.params);
    if (error) return res.status(400).json({ error: error.details[0].message });

    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

    await Credential.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.sendStatus(200);
  } catch (err) {
    console.error('Reject error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
