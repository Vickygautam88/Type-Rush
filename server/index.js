// Imports
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

// Create a Server
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = require("socket.io")(server);

// Middle Ware
app.use(express.json());

// Connection to MongoDB
const DB =
  "mongodb+srv://system:system@cluster0.9bn1st4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Listening to Socket IO
io.on("Connection", (socket) => {
  console.log(socket.id);
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((e) => {
    console.log(e);
  });

// listen to Server
server.listen(port, "0.0.0.0", () => {
  console.log(`Server started and running on port ${port}`);
});
