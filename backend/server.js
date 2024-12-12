const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');


// Environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

// Session middleware (required for passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
// Connect to MongoDB
require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/payments', paymentRoutes);
// Import the new payment routes

// Use payment routes
app.use(passport.initialize());


const { NodeSSH } = require('node-ssh');
const fs = require('fs');
const ssh = new NodeSSH();

app.post('/execute-model', async (req, res) => {
  try {
    
    const privateKey = fs.readFileSync('/home/octaloop/.ssh/cricinsight-key.pem', 'utf8');

    await ssh.connect({
      host: '15.207.201.55',
      username: 'ubuntu',
      privateKey: privateKey, 
      passphrase: '', 
      
      debug: (message) => {
        console.log('SSH Debug:', message);
      }
    });

    const command = `
      cd CricInsight-Models &&
      source venv/bin/activate &&
      python3 cricket_video_analysis.py
    `;
    const result = await ssh.execCommand(command);

    console.log('STDOUT:', result.stdout);
    console.log('STDERR:', result.stderr);

    ssh.dispose();
    res.json({ message: 'Command executed successfully' });
  } catch (error) {
    console.error('Detailed Error:', error);
    res.status(500).json({ 
      error: 'Failed to execute command', 
      details: error.message 
    });
  }
});


// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
