// models/Subscription.js
import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planType: {
    type: String,
    enum: ['Basic', 'Popular', 'Advance'],
    required: true
  },
  stripeSessionId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'cancelled'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true
  },
  paidAt: {
    type: Date
  }
}, { timestamps: true });

export default mongoose.model('Subscription', SubscriptionSchema);