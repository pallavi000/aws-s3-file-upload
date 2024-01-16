const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const fileUpload = require("./routes/fileupload");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/file-upload", fileUpload);
app.listen(5000, () => {
  console.log("app is running");
});
