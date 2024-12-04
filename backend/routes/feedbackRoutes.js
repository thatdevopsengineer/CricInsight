const express = require('express');
const router = express.Router();
const { submitFeedback } = require('../controllers/feedbackController');

// Submit feedback
router.post('/submit-feedback', submitFeedback);

module.exports = router;
