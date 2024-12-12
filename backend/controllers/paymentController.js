const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a Stripe checkout session
const checkoutSession = async (req, res) => {
  try {
    const { priceId } = req.body;

    if (!priceId) {
      throw new Error("priceId is missing.");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/dashboard/adaptive-learning?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Create a Stripe payment intent
const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      throw new Error("Payment amount is required.");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description: "Your payment description here",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      client_secret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  checkoutSession,
  createPaymentIntent,
};
