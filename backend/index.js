const cors = require('cors');
const express = require('express');
const FormDataModel = require('./models/FormData');
const UserModel = require('./models/FormData');
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer');
const router = express.Router();
const crypto = require('crypto');
const User = require('./models/FormData'); // Adjust path as necessary


const app = express();
app.use(express.json());
app.use(cors());




// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

require('dotenv').config();
const mongoose = require('mongoose');
const { CleaningServices } = require('@mui/icons-material');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Routes
// Register user
app.post('/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const name = `${firstName} ${lastName}`;

  FormDataModel.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ error: "Already registered" });
      }
      return FormDataModel.create({ email, password, name });
    })
    .then(newUser => res.status(201).json(newUser))
    .catch(err => {
      console.log("Error during registration:", err); // Logs the error
      res.status(500).json({ error: err });
    });
});


// Login user
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  FormDataModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.json("No records found!");
      }
      if (user.password === password) {
        return res.json("Success");
      }
      res.json("Wrong password");
    })
    .catch(err => res.status(500).json(err));
});

app.post('/forgot-password', async (req, res) => {
  console.log('Request body:', req.body);
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      return res.status(404).json({ message: 'No user found with this email' });
    }

    user.generatePasswordResetToken();
    console.log('Generated token:', user.resetPasswordToken);
    await user.save();

    const resetURL = `http://localhost:3000/reset-password/${user.resetPasswordToken}`;
    console.log('Reset URL:', resetURL);

    const mailOptions = { /* email setup */ };
    await transporter.sendMail(mailOptions);
    console.log('Email sent');

    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Reset Password Route
app.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Find user with valid reset token
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update password
    user.password = newPassword; // Note: In production, hash the password
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to upload video
app.post('/api/upload-video', async (req, res) => {
  const { email, videos } = req.body;

  if (!email || !videos || !Array.isArray(videos) || videos.length === 0) {
    return res.status(400).json({ error: 'Invalid request: Missing email or videos' });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add new videos to user's collection
    videos.forEach((video) => {
      if (!video.url) {
        throw new Error('Invalid video URL');
      }
      user.videos.push({
        url: video.url,
        uploadedAt: new Date(video.uploadedAt || Date.now()),
      });
    });

    await user.save();

    console.log(`Videos uploaded successfully for user: ${email}`);
    res.status(200).json({ message: 'Videos uploaded successfully', user });
  } catch (error) {
    console.error('Error uploading videos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



function generateResetToken() {
  // Implement your token generation logic here (e.g., using crypto or JWT)
  return 'some_generated_token';
}

// Google login
const client = new OAuth2Client('84137165849-n5rpca9u1cfmerfb7um368peoc94doq5.apps.googleusercontent.com');
app.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "84137165849-n5rpca9u1cfmerfb7um368peoc94doq5.apps.googleusercontent.com",
    });

    const { name, email } = ticket.getPayload();

    let user = await FormDataModel.findOne({ email });

    if (!user) {
      user = new FormDataModel({
        email,
        name,
      });

      await user.save();
    }

    res.status(200).json({ email });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ message: "Google login failed" });
  }
});


// Get user by email
app.get('/user', (req, res) => {
  const { email } = req.query;

  FormDataModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json("User not found");
      }
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
});

// Update user details
app.post('/updateUser', (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  const name = `${firstName} ${lastName}`;

  FormDataModel.findOneAndUpdate({ email }, { name, password }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json("User not found");
      }
      res.json(updatedUser);
    })
    .catch(err => res.status(500).json(err));
});

// Delete user by email
app.delete('/deleteUser', (req, res) => {
  const { email } = req.query;

  FormDataModel.findOneAndDelete({ email })
    .then(deletedUser => {
      if (!deletedUser) {
        return res.status(404).json("User not found");
      }
      res.json("User deleted successfully");
    })
    .catch(err => res.status(500).json(err));
});

//save shots data
app.post('/api/shots', async (req, res) => {
  try {
    const { date, email, shots } = req.body;

    if (!date || !email) {
      return res.status(400).json({ error: 'Missing requirfolder anded fields' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        $push: {
          shotsPlayed: {
            date: new Date(date),
            shots: shots.map(shot => ({
              name: shot.name,
              percentage: shot.percentage,
            })),
          },
        },
      },
      { new: true }
    );

    res.status(201).json(updatedUser);
  } catch (err) {
    console.error('Error saving shots data:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});


app.get('/api/user/shots', async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const dates = user.shotsPlayed.map(shot => ({ date: shot.date }));
    res.json(dates);
  } catch (err) {
    console.error('Error fetching user shots:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/username', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await FormDataModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const firstName = user.name.split(' ')[0];

    res.json({ firstName: firstName });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// axios.post('/api/add-video', videoData)
//   .then(response => {
//     console.log("Video added successfully");
//   })
//   .catch(error => {
//     console.error("Error adding video:", error);
//   });


// const videoRoutes = require('./videoRoutes');
// app.use('/api/video', videoRoutes);


// First, import the new Feedback model
const FeedbackModel = require('./models/FeedbackModel'); // Create this model as per previous suggestion

// Add this route to your existing backend file
app.post('/submit-feedback', async (req, res) => {
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
});

// Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
