const express = require('express');
const router = express.Router();
const { uploadVideo, getLastVideoAnalysis } = require('../controllers/videoController');

// Upload video
router.post('/upload-video', uploadVideo);

router.get('/last-analysis', getLastVideoAnalysis);


module.exports = router;
