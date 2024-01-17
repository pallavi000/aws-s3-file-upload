const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const fileUpload = require("./routes/fileupload");
const { default: mongoose } = require("mongoose");

const app = express();

// Mongo DB Connections
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("MongoDB Connection Succeeded.");
  })
  .catch((error) => {
    console.log("Error in DB connection: " + error);
  });

app.use(cors());
app.use(express.json());
app.use("/api/file-upload", fileUpload);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist/index.html"));
  });
}
app.listen(5000, () => {
  console.log("app is running");
});
