const express = require("express");
const router = express.Router();
const {
  S3Client,
  ListObjectsCommand,
  ListBucketsCommand,
} = require("@aws-sdk/client-s3");

const fs = require("fs");
const path = require("path");
const upload = require("../middleware/fileUpload");

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  region: process.env.S3_REGION,
}); // Path to your S3 upload middleware

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

module.exports = router;
