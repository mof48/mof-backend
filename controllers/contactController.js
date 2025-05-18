const Contact = require('../models/Contact');

// Send a contact request
exports.sendRequest = async (req, res) => {
  const { toUserId, message } = req.body;
  const fromUserId = req.user.id;

  try {
    const existing = await Contact.findOne({ from: fromUserId, to: toUserId });
    if (existing) return res.status(400).json({ message: 'Request already sent or exists.' });

    const request = await Contact.create({ from: fromUserId, to: toUserId, message, status: 'pending' });
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send request', error: err.message });
  }
};

// Accept contact request
exports.acceptRequest = async (req, res) => {
  try {
    const request = await Contact.findByIdAndUpdate(req.body.requestId, { status: 'accepted' }, { new: true });
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: 'Failed to accept request', error: err.message });
  }
};

// Decline contact request
exports.declineRequest = async (req, res) => {
  try {
    const request = await Contact.findByIdAndUpdate(req.body.requestId, { status: 'declined' }, { new: true });
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: 'Failed to decline request', error: err.message });
  }
};