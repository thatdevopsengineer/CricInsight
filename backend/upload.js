const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./config/awsConfig');  // Import AWS S3 config

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'cricinsight-videos-bucket',  // Replace with your S3 bucket name
    acl: 'public-read',  // Make the files publicly readable (adjust as needed)
    key: function (req, file, cb) {
       const userEmail = localStorage.getItem('userEmail');
      const fileName = Date.now() + '-' + file.originalname;
      cb(null, `videos/${userEmail}/${fileName}`);
    }
  })
});

module.exports = upload;
