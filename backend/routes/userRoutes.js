const express = require('express');
const router = express.Router();
const { getUser, updateUser, deleteUser, getUserShots, saveShotsData, getUsername, saveChatMessage, getChatHistory, getShotsByDate  } = require('../controllers/userController');

// Get user by email
router.get('/', getUser);

// Update user profile
router.post('/updateUser', updateUser);

// Delete user by email
router.delete('/deleteUser', deleteUser);

// Get user shots
router.get('/getshots', getUserShots);

// Save shots data
router.post('/saveshots', saveShotsData);

// Get username by email
router.get('/username', getUsername);

//Save users chat with AI Assistant
router.post('/saveChatMessage', saveChatMessage);
router.get('/chatHistory', getChatHistory);

router.get('/getshotsbydate', getShotsByDate);



module.exports = router;
