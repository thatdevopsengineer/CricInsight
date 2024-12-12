import Stripe from 'stripe';
import User from '../models/User';
import Subscription from '../models/Subscription';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { amount, currency = 'usd', planId } = req.body;

  try {
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: currency,
      metadata: { 
        planId, 
        userId: req.user.id 
      }
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Payment Intent Error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

export const activateSubscription = async (req, res) => {
  const { planId, paymentIntentId } = req.body;
  const user = req.user;

  try {
    // Verify payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    // Determine subscription details based on plan
    const subscriptionDetails = {
      'weekly': { 
        duration: 7, 
        videoUploads: 5, 
        features: ['basic_analysis'] 
      },
      'monthly': { 
        duration: 30, 
        videoUploads: null, // unlimited 
        features: ['detailed_analysis', 'ai_suggestions'] 
      },
      'yearly': { 
        duration: 365, 
        videoUploads: null, // unlimited
        features: ['comprehensive_reports', 'priority_support'] 
      }
    };

    // Create subscription record
    const subscription = new Subscription({
      user: user._id,
      planId: planId,
      startDate: new Date(),
      endDate: new Date(Date.now() + subscriptionDetails[planId].duration * 24 * 60 * 60 * 1000),
      paymentIntentId: paymentIntentId,
      features: subscriptionDetails[planId].features,
      maxVideoUploads: subscriptionDetails[planId].videoUploads
    });

    await subscription.save();

    // Update user with subscription
    user.activeSubscription = subscription._id;
    await user.save();

    res.status(200).json({ 
      message: 'Subscription activated successfully', 
      subscription 
    });
  } catch (error) {
    console.error('Subscription Activation Error:', error);
    res.status(500).json({ error: 'Failed to activate subscription' });
  }
};

export const checkSubscriptionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('activeSubscription');
    
    if (!user.activeSubscription) {
      return res.status(200).json({ 
        hasActiveSubscription: false,
        message: 'No active subscription' 
      });
    }

    const subscription = user.activeSubscription;
    const isActive = new Date() <= subscription.endDate;

    res.status(200).json({
      hasActiveSubscription: isActive,
      subscriptionDetails: isActive ? subscription : null
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check subscription status' });
  }
};