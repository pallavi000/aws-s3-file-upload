const express = require("express");
const Image = require("../model/Image");
const router = express.Router();
const client = require("../config/s3Client");
const {
  ListObjectsCommand,
  ListBucketsCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const upload = require("../middleware/fileUpload");
const invoke = require("../utils/helper");

router.get("/buckets", async (req, res) => {
  try {
    const command = new ListBucketsCommand({});
    const data = await client.send(command);
    res.send(data.Buckets);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/files", async (req, res) => {
  try {
    const params = {
      Bucket: "exommerce-pallavi",
    };
    const command = new ListObjectsCommand(params);
    const data = await client.send(command);
    res.send(data.Contents);
  } catch (error) {
    res.send(error.message);
  }
});

// file upload
router.post("/files", upload.single("file"), (req, res) => {
  console.log(req.body, req.file, "reqqqqqqqqqqqqqqqqqqqqqqqqq");
  return res.send("ok");
});

router.get("/generate-api", async (req, res) => {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: req.query.fileName || "unknown",
      ContentType: req.query.fileType || "unknown",
    });
    const url = await getSignedUrl(client, command, {
      expiresIn: 300,
    });
    res.send(url);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/image", async (req, res) => {
  try {
    const image = await Image.create({
      name: req.body.name,
      image: process.env.S3_BUCKET_URL + "/" + req.body.name,
    });
    res.send(image);

    invoke("sendMail", {
      to: "bhattaraipallavi4@gmail.com",
      subject: "aws mail",
      body: "successfully create image",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/image", async (req, res) => {
  try {
    const images = await Image.find();
    res.send(images);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
