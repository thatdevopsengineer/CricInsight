const FeedbackModel = require('../models/FeedbackModel');


exports.submitFeedback = async (req, res) => {
    try {
        const {
          name,
          email,
          overallSatisfaction,
          improvementSuggestions
        } = req.body;
    
        // Validation checks
        if (!name || !email) {
          return res.status(400).json({
            status: 'error',
            message: 'User information is missing'
          });
        }
    
        // Check if all categories are rated
        if (!overallSatisfaction || overallSatisfaction.length === 0) {
          return res.status(400).json({
            status: 'error',
            message: 'Please rate all categories'
          });
        }
    
        // Validate that all categories have a rating
        const categories = [
          "User profiling experience",
          "Ease of Uploading Videos",
          "Accuracy of Videos Analysis",
          "Adaptive Learning Effectiveness",
          "Payment Gateway Experience",
          "Correctness of Shot Classification",
          "Accuracy of Field Area Calculations",
          "Ease of Interpreting Shot Statistics",
          "AI Assistant Accuracy in Responding to Queries"
        ];
    
        // Check if all categories are rated
        const missingRatings = categories.filter(cat =>
          !overallSatisfaction.some(rating => rating.category === cat)
        );
    
        if (missingRatings.length > 0) {
          return res.status(400).json({
            status: 'error',
            message: `Please rate all categories. Missing ratings for: ${missingRatings.join(', ')}`
          });
        }
    
        // Check improvement suggestions
        if (!improvementSuggestions ||
          (!improvementSuggestions.serviceImprovement &&
            !improvementSuggestions.systemFrustrations &&
            !improvementSuggestions.systemIssues &&
            !improvementSuggestions.systemUsability &&
            !improvementSuggestions.platformNeeds &&
            !improvementSuggestions.professionalCapacity &&
            !improvementSuggestions.systemAdditions)) {
          return res.status(400).json({
            status: 'error',
            message: 'Please provide improvement suggestions'
          });
        }
    
        // Create new feedback
        const newFeedback = new FeedbackModel({
          user: { name, email },
          overallSatisfaction,
          improvementSuggestions
        });
    
        // Save feedback
        await newFeedback.save();
    
        // Respond with success message
        res.status(201).json({
          status: 'success',
          message: 'Feedback submitted successfully!',
          feedbackId: newFeedback._id
        });
    
      } catch (error) {
        console.error('Feedback submission error:', error);
    
        // Handle specific mongoose validation errors
        if (error.name === 'ValidationError') {
          return res.status(400).json({
            status: 'error',
            message: Object.values(error.errors)
              .map(err => err.message)
              .join(', ')
          });
        }
    
        // Generic error response
        res.status(500).json({
          status: 'error',
          message: 'An error occurred while submitting feedback'
        });
      }
};
