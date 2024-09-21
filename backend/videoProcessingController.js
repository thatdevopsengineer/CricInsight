// const ffmpeg = require('fluent-ffmpeg');
// const path = require('path');
// const fs = require('fs');

// // Trim video
// exports.trimVideo = (req, res) => {
//   const { startTime, duration, filePath } = req.body;
//   const outputFilePath = path.join(__dirname, 'output', `trimmed_${Date.now()}.mp4`);

//   ffmpeg(filePath)
//     .setStartTime(startTime)
//     .setDuration(duration)
//     .output(outputFilePath)
//     .on('end', () => {
//       res.status(200).send({ message: 'Video trimmed successfully', filePath: outputFilePath });
//     })
//     .on('error', (err) => {
//       console.error('Error trimming video:', err);
//       res.status(500).send({ message: 'Error trimming video' });
//     })
//     .run();
// };

// // Add new video
// exports.addVideo = (req, res) => {
//   const { newVideoPath, videoList } = req.body;

//   const updatedList = [...videoList, newVideoPath]; // Add the new video to the list
//   res.status(200).send({ updatedList });
// };

// // Delete video
// exports.deleteVideo = (req, res) => {
//   const { videoPath } = req.body;

//   fs.unlink(videoPath, (err) => {
//     if (err) {
//       console.error('Error deleting video:', err);
//       res.status(500).send({ message: 'Error deleting video' });
//     } else {
//       res.status(200).send({ message: 'Video deleted successfully' });
//     }
//   });
// };
