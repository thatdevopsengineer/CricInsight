const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  overallSatisfaction: [{
    category: { 
      type: String, 
      enum: [
        'User profiling experience',
        'Ease of Uploading Videos',
        'Accuracy of Videos Analysis',
        'Adaptive Learning Effectiveness',
        'Payment Gateway Experience',
        'Correctness of Shot Classification',
        'Accuracy of Field Area Calculations',
        'Ease of Interpreting Shot Statistics',
        'AI Assistant Accuracy in Responding to Queries'
      ],
      required: true 
    },
    rating: { 
      type: String, 
      enum: [
        'Very satisfied', 
        'Satisfied', 
        'Neutral', 
        'Unsatisfied', 
        'Very unsatisfied'
      ],
      required: true 
    }
  }],
  improvementSuggestions: { 
    serviceImprovement: { type: String, trim: true },
    systemAdditions: { type: String, trim: true },
    systemFrustrations: { type: String, trim: true },
    systemIssues: { type: String, trim: true },
    systemUsability: { type: String, trim: true },
    platformNeeds: { type: String, trim: true },
    professionalCapacity: { type: String, trim: true }
  },
  submittedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);

module.exports = FeedbackModel;