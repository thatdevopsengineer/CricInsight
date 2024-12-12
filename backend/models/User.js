const mongoose = require('mongoose');
const crypto = require('crypto');

const ShotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

// const VideoSchema = new mongoose.Schema({
//   url: { 
//     type: String, 
//     validate: {
//       validator: function(v) {
//         return /^(https?:\/\/[^\s]+)$/.test(v); // Valid URL regex
//       },
//       message: props => `${props.value} is not a valid URL!`
//     },
//   },
//   videoNumber: { 
//     type: Number, 
//     default: null, // Default can be null if unset
//   },
//   uploadedAt: { type: Date, required: true, default: Date.now },
// });
const ChatMessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ShotsPlayedSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  shots: [ShotSchema],
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    // New fields for password reset
    resetPasswordToken: { 
      type: String, 
      default: null 
    },
    resetPasswordExpires: { 
      type: Date, 
      default: null 
    },
    // videos: { type: [VideoSchema], default: [] },
    shotsPlayed: [ShotsPlayedSchema],
    chatHistory: [ChatMessageSchema],
    facebookId: {
      type: String,
      unique: true,
      sparse: true 
    },
    // In User model
subscribedPlan: {
  type: String,
  enum: ['Basic', 'Popular', 'Advance'],
},
isSubscribed: {
  type: Boolean,
  default: false
},
subscribedAt: Date

  },
  { timestamps: true }
);

// Method to generate password reset token
UserSchema.methods.generatePasswordResetToken = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;