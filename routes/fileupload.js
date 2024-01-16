const express = require("express");
const router = express.Router();
const client = require("../config/s3Client");
const {
  ListObjectsCommand,
  ListBucketsCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const {
  getSignedUrl,
  S3RequestPresigner,
} = require("@aws-sdk/s3-request-presigner");

const upload = require("../middleware/fileUpload");

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
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: "abc.jpg",
    });
    const url = await getSignedUrl(client, command, {
      expiresIn: 300,
    });
    res.send(url);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
