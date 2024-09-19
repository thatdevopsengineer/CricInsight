const mongoose = require('mongoose');

const ShotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true }, // Replace 'value' with 'percentage'
  date: { type: Date, required: true }, // This date can refer to the shot's session date
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shotsPlayed: [
    {
      date: { type: Date, required: true }, // Date of the session when shots were played
      shots: [ShotSchema], // Array of shots with names and percentages
    }
  ],
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
