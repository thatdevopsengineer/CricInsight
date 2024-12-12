const UserModel = require('../models/User');

// Get user by email
exports.getUser = async (req, res) => {
    const { email } = req.query;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send user data without password or with a placeholder
        res.status(200).json({
            email: user.email,
            name: user.name,
            password: "********", // Placeholder
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    try {
        // Find the user
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Prepare updated data
        const updates = { name: `${firstName} ${lastName}` };

        // Update the password only if a new one is provided and it's not a placeholder
        if (password && password !== "********") {
            const bcrypt = require("bcrypt");
            updates.password = await bcrypt.hash(password, 10);
        }

        // Update user in the database
        const updatedUser = await UserModel.findOneAndUpdate(
            { email },
            updates,
            { new: true } // Return the updated document
        );

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    const { email } = req.query;

    UserModel.findOneAndDelete({ email })
        .then(deletedUser => {//     default: null, // Default can be null if unset

            if (!deletedUser) {
                return res.status(404).json("User not found");
            }
            res.json("User deleted successfully");
        })
        .catch(err => res.status(500).json(err));
};

// Get user shots
exports.getUserShots = async (req, res) => {
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
};

// Save shots data
exports.saveShotsData = async (req, res) => {
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
};

// Get username
exports.getUsername = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const firstName = user.name.split(' ')[0];

        res.json({ firstName: firstName });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.saveChatMessage = async (req, res) => {
    try {
      const { email, message } = req.body;
  
      if (!email || !message) {
        return res.status(400).json({ error: 'Email and message are required' });
      }
  
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.chatHistory.push(message);
      await user.save();
  
      res.status(201).json({ message: 'Chat message saved successfully' });
    } catch (error) {
      console.error('Error saving chat message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Get chat history
  exports.getChatHistory = async (req, res) => {
    try {
      const { email } = req.query;
  
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
  
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Sort chat history by timestamp
      const sortedChatHistory = user.chatHistory.sort((a, b) => a.timestamp - b.timestamp);
  
      res.status(200).json(sortedChatHistory);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Get shots by date
exports.getShotsByDate = async (req, res) => {
    const { email, date } = req.query;

    if (!email || !date) {
        return res.status(400).json({ error: 'Email and date are required' });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const shotsData = user.shotsPlayed.find(
            (entry) => new Date(entry.date).toISOString() === new Date(date).toISOString()
        );

        if (!shotsData) {
            return res.status(404).json({ error: 'No data found for the selected date' });
        }

        res.status(200).json(shotsData);
    } catch (err) {
        console.error('Error fetching shots by date:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
