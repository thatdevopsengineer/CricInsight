const mongoose = require('mongoose');

const ShotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true }, 
  date: { type: Date, required: true }, 
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  videos: [
    {
      url: { type: String, required: true },
      uploadedAt: { type: Date, required: true },
      videoNumber: { type: Number, required: true },  // Added video number
    }
  ],
  shotsPlayed: [
    {
      date: { type: Date, required: true }, 
      shots: [ShotSchema], 
    }
  ],
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
