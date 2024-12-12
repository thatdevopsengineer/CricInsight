const AWS = require('aws-sdk');

// Set AWS region and credentials
// AWS.config.update({
//   region: 'ap-south-1', 
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

AWS.config.update({
  region: 'ap-south-1', 
  accessKeyId: 'AKIA6GBMD5EDTAP5GVQ7', 
  secretAccessKey: '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',
});

const s3 = new AWS.S3();

module.exports = s3;
