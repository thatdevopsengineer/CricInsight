const express = require('express');
const router = express.Router();
const {
  checkoutSession,
  createPaymentIntent
} = require('../controllers/paymentController');

// Route for creating a checkout session
router.post('/checkout-session', checkoutSession);

// Route for creating a payment intent
router.post('/intent', createPaymentIntent);

module.exports = router;
