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

const AWS = require('aws-sdk');
const awsConfig = require('../awsConfig'); 


// Configure AWS (add these lines)
AWS.config.update({
  region: 'ap-south-1', 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.getLastVideoAnalysis = async (req, res) => {
  try {
    // Query to get the most recent video analysis
    const params = {
      TableName: 'CricketVideoAnalysis',
      KeyConditionExpression: 'VideoId = :videoId',
      ExpressionAttributeValues: {
        ':videoId': 'practice-video'
      },
      ScanIndexForward: false, // Sort by timestamp in descending order
      Limit: 1 // Get only the most recent entry
    };

    const result = await dynamoDB.query(params).promise();

    if (result.Items && result.Items.length > 0) {
      return res.status(200).json(result.Items[0]);
    } else {
      return res.status(404).json({ message: 'No video analysis found' });
    }
  } catch (error) {
    console.error('Error fetching video analysis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};