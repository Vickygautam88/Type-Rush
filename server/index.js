const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

// Create a Server
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);

// Middle Ware
app.use(express.json());

// Connection to MongoDB

// listen to Server
server.listen(port, "0.0.0.0", () => {
  console.log(`Server started and running on port ${port}`);
});