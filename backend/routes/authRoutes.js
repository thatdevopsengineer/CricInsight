const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword, googleLogin } = require('../controllers/authController');

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.post('/reset-password/:token', resetPassword);

// Google login
router.post('/google-login', googleLogin);

module.exports = router;
