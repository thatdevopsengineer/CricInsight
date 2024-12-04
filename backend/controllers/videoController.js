const UserModel = require('../models/User');

// Endpoint to upload video
exports.uploadVideo = async (req, res) => {
  const { email, videos } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    videos.forEach(video => {
      if (!video.url) throw new Error('Invalid video URL');
      user.videos.push({ url: video.url, uploadedAt: new Date(video.uploadedAt || Date.now()) });
    });

    await user.save();
    res.status(200).json({ message: 'Videos uploaded successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
