const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const { transporter } = require('../config');
const passport = require('passport');
const dotenv = require('dotenv');

const FacebookStrategy = require('passport-facebook').Strategy;


// Register user
exports.registerUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No records found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this email' });
    }

    user.generatePasswordResetToken();
    await user.save();

    const resetURL = `http://localhost:3000/reset-password/${user.resetPasswordToken}`;
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: user.email,
      subject: 'Password Reset Request',
      text: `Click the link to reset your password: ${resetURL}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = newPassword; // Hash the password in production
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Google login
const client = new OAuth2Client('84137165849-n5rpca9u1cfmerfb7um368peoc94doq5.apps.googleusercontent.com');

exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "84137165849-n5rpca9u1cfmerfb7um368peoc94doq5.apps.googleusercontent.com",
    });

    const { name, email } = ticket.getPayload();

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = new UserModel({ email, name });
      await user.save();
    }

    res.status(200).json({ email });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ message: "Google login failed" });
  }
};


// Facebook Login Strategy Configuration
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "https://cricinsight-backend.vercel.app/api/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'emails']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UserModel.findOne({ 
      facebookId: profile.id 
    });

    if (!user) {
      user = new UserModel({
        facebookId: profile.id,
        name: profile.displayName,
        email: profile.emails && profile.emails[0] ? profile.emails[0].value : null
      });

      await user.save();
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}
));

