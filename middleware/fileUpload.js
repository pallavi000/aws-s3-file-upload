const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const path = require("path");

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  region: process.env.S3_REGION,
}); // Path to your S3 upload middleware

const upload = multer({
  storage: multerS3({
    s3: client,
    bucket: "exommerce-pallavi",

    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName =
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
      cb(null, fileName);
    },
  }),
});

module.exports = upload;
