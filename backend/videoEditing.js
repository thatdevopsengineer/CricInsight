const ffmpeg = require('fluent-ffmpeg');

const handleCutOperation = (inputFile, startTime, duration, outputFile) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFile)
      .setStartTime(startTime)
      .setDuration(duration)
      .output(outputFile)
      .on('end', resolve)
      .on('error', reject)
      .run();
  });
};

// Endpoint for cut operation in Express.js
app.post('/cut', async (req, res) => {
  const { inputFile, startTime, duration } = req.body;
  const outputFile = 'path/to/output.mp4';

  try {
    await handleCutOperation(inputFile, startTime, duration, outputFile);
    res.json({ success: true, outputFile });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});
