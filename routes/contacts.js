const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/request', contactController.sendRequest);
router.post('/accept', contactController.acceptRequest);
router.post('/decline', contactController.declineRequest);

module.exports = router;
