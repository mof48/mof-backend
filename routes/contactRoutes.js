const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');

router.post('/request', authMiddleware, contactController.sendRequest);
router.post('/accept', authMiddleware, contactController.acceptRequest);
router.post('/decline', authMiddleware, contactController.declineRequest);

module.exports = router;