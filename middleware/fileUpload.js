const multer = require("multer");
const multerS3 = require("multer-s3");
const client = require("../config/s3Client");
const path = require("path");

// Path to your S3 upload middleware
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
