const express = require('express');
const router = express.Router();
const { getUser, updateUser, deleteUser, getUserShots, saveShotsData, getUsername } = require('../controllers/userController');

// Get user by email
router.get('/', getUser);

// Update user profile
router.post('/updateUser', updateUser);

// Delete user by email
router.delete('/deleteUser', deleteUser);

// Get user shots
router.get('/shots', getUserShots);

// Save shots data
router.post('/shots', saveShotsData);

// Get username by email
router.get('/username', getUsername);

module.exports = router;
