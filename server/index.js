// Imports
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const Game = require("./models/Game");

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
  socket.on("create-game", async ({ nickname }) => {
    try {
      let game = new Game();
      const sentence = await getSentence();
      game.words = sentence;
      let player = {
        socketID: socket.id,
        nickname,
        isPartyLeader: true,
      };
      game.players.push(player);
      game = await game.save();

      const gameId = game._id.toString();
      socket.join(gameId);
      io.to(gameId).emit("updateGame", game);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("Join =game", async ({ nickname, gameId }) => {
    try {
      if (!gameId.match(/^[0-9a-fA-F]{24}$/)) {
        socket.emit("notCorrectGame", "Please enter a valid game ID");
        return;
      }
      let game = await Game.findById(gameId);

      if (game.isJoin) {
        const id = game._id.toString();
        let player = {
          nickname,
          socketID: socket.id,
        };
        socket.join(id);
        game.players.push(player);
        game = await game.save();
        io.to(gameId).emit("updateGame", game);
      } else {
        socket.emit(
          "notCorrectGame",
          "The game is in progress, please try again later!"
        );
      }
    } catch (e) {
      console.log(e);
    }});
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
