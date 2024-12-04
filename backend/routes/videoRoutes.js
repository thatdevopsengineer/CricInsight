const express = require('express');
const router = express.Router();
const { uploadVideo } = require('../controllers/videoController');

// Upload video
router.post('/upload-video', uploadVideo);

module.exports = router;
