const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const UserModel = require('./models/FormData'); // Adjust path as needed


const app = express();

// Middleware
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


// app.post('/api/videos', async (req, res) => {
//   try {
//     const {  email } = req.body;

//     if (!email) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const updatedUser = await UserModel.findOneAndUpdate(
//       { email },
//       {
//         $push: {
//           videoAnalysis: {
//             // videoId,
//             // date: new Date(date),
//             shots: [] // Add if needed
//           },
//         },
//       },
//       { new: true }
//     );

//     res.status(201).json(updatedUser);
//   } catch (err) {
//     console.error('Error saving video data:', err);
//     res.status(500).json({ error: 'Internal server error', details: err.message });
//   }
// });

// Save shots data
app.post('/api/shots', async (req, res) => {
  try {
    const { date, email, shots } = req.body;

    // Basic validation
    if (!date || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
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
              percentage: shot.percentage, // Include percentage in the shots
            })),
            // Add more fields if needed
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


// Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
