const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const UserModel = require('./models/FormData'); 
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer'); 
const router = express.Router();


const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/cricinsight', {
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
        return res.json("Already registered");
      } 
      return FormDataModel.create({ email, password, name });
    })
    .then(newUser => res.json(newUser))
    .catch(err => res.status(500).json(err));
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

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await FormDataModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const resetToken = generateResetToken(); 
    user.resetToken = resetToken;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link below to reset your password:\n\nhttp://localhost:3000/reset-password/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again." });
  }
});


// Endpoint to upload video
// Endpoint to upload video
router.post('/api/upload-video', async (req, res) => {
  try {
    const { email, videos } = req.body;

    if (!email || !videos || videos.length === 0) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add new videos to user's videos array
    user.videos.push(...videos.map(video => ({
      url: video.url,
      uploadedAt: video.uploadedAt
    })));

    await user.save();

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



// Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
