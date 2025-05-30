import Joi from 'joi';
import Contact from '../models/Contact.js';

// Validation
const contactSchema = Joi.object({
  to: Joi.string().required(),
  message: Joi.string().allow('', null)
});

const statusSchema = Joi.object({
  status: Joi.string().valid('accepted', 'declined').required()
});

// Create a contact request
export const sendContactRequest = async (req, res) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newRequest = await Contact.create({
      from: req.user._id,
      ...value
    });

    res.status(201).json(newRequest);
  } catch (err) {
    console.error('Send contact error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all requests for user
export const getUserRequests = async (req, res) => {
  try {
    const requests = await Contact.find({
      $or: [{ from: req.user._id }, { to: req.user._id }]
    })
      .populate('from', 'name profilePhoto')
      .populate('to', 'name profilePhoto')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error('Get requests error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Respond to a contact request
export const respondToRequest = async (req, res) => {
  try {
    const { error, value } = statusSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const request = await Contact.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    if (request.to.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    request.status = value.status;
    await request.save();

    res.json(request);
  } catch (err) {
    console.error('Respond error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
