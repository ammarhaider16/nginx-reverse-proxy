const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const replicaApp = process.env.APP_NAME;

// Any other folders being used need to be specified to the path

// When application starts, index.html will be served to the browser
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  console.log(`Request served by ${replicaApp}`);
});

// Node app is listening on port 3000
app.listen(port, () => {
  console.log(`${replicaApp} is listening on port ${port}`);
});
