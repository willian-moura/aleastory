const express = require("express");
const createGame = require("../game/game.js");

const wsHelper = require("../utils/socketHelper");
const WebSocket = require("ws");

module.exports = function (server) {
  const sockets = new WebSocket.Server({ server, path: "/game" });

  const game = createGame();
  game.start();

  var socket_list = [];

  sockets.on("connection", (socket) => {
    console.log(`player connected`);
    game.subscribe((command) => {
      if (
        command.type != "update-stageclock" &&
        command.type != "update-duration"
      ) {
        // console.log(`> Emitting ${command.type}`)
      }
      socket.send(JSON.stringify(command));
    });

    var player = {
      username: null,
      playerlevel: null,
    };

    socket.on("message", (message) => {
      const packet = JSON.parse(message);

      // init-info
      if (packet.type == "init-info") {
        player = packet.data.player;

        const socketPlayer = {
          socket,
          player: player.username,
        };

        socket_list.push(socketPlayer);

        console.log(
          `> PlayerName: ${player.username}\n> PlayerLevel: ${player.playerlevel}`
        );

        game.addPlayer({
          player: player.username,
          playerLevel: player.playerlevel,
        });

        socket.send(wsHelper.encoderPacket("setup", game.state));
      }

      // submit-word
      if (packet.type == "submit-word") {
        console.log(
          `player ${packet.data.player} submitted ${packet.data.word}`
        );

        if (game.state.stage === 1) {
          let command = packet.data;
          //   command.player = player.username;

          const msg = game.submitWord(command);

          if (msg.status) {
            console.log(msg.msg);
          } else {
            let responsePacket = wsHelper.encoderPacket("err", {
              error: msg.msg,
            });
            socket.send(responsePacket);
          }
        } else {
          const responsePacket = wsHelper.encoderPacket("err", {
            error: "words must been submit only in the stage 1",
          });
          socket.send(responsePacket);
        }
      }

      // vote-word
      if (packet.type == "vote-word") {
        let command = packet.data;
        // command.player = player.username;

        const msg = game.voteWord(command);

        if (msg.status) {
          console.log(msg.msg);
        } else {
          const responsePacket = wsHelper.encoderPacket("err", {
            error: msg.msg,
          });
          socket.send(responsePacket);
        }
      }
    });

    socket.on("close", () => {
      if (player.username != null) {
        game.removePlayer({ player: player.username });
        console.log(`> Player disconnected: ${player.username}`);
      } else {
        console.log(`> Player disconnected, but not removed`);
      }
    });
  });
};
