import Contact from '../models/Contact.js';

// Create a contact request
export const sendContactRequest = async (req, res) => {
  try {
    const { to, message } = req.body;
    const newRequest = await Contact.create({
      from: req.user._id,
      to,
      message,
    });
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get requests where user is sender or receiver
export const getUserRequests = async (req, res) => {
  try {
    const requests = await Contact.find({
      $or: [{ from: req.user._id }, { to: req.user._id }],
    })
      .populate('from', 'name profilePhoto')
      .populate('to', 'name profilePhoto')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update request status
export const respondToRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await Contact.findById(id);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    if (request.to.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    request.status = status;
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
