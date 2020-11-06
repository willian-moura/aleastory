const express = require('express')
const createGame = require('../game/game.js')

const wsHelper = require('../utils/socketHelper')

WebSocketServer = require("ws").Server

module.exports = function (server) {
    const sockets = new WebSocketServer({server, path: '/game'});

    const game = createGame()
    game.start()

    sockets.on('connection', (socket) => {

        game.subscribe((command) => {
            if (command.type != 'update-stageclock' && command.type != 'update-duration'){
                console.log(`> Emitting ${command.type}`)
            }
            socket.send(JSON.stringify(command))
        })

        var player = {
            username: 'guess',
            playerlevel: 0,
        };

        socket.send(wsHelper.encoderPacket('setup', game.state))

        socket.on('message', (message) => {
            
            const packet = JSON.parse(message)

            // init-info
            if(packet.type == 'init-info'){
                player = packet.data.player

                console.log(`> PlayerName: ${player.username}\n> PlayerLevel: ${player.playerlevel}`);

                game.addPlayer({ 
                    player: player.username,
                    playerLevel: player.playerlevel,
                });
            }

            // submit-word
            if(packet.type == 'submit-word'){
                if (game.state.stage === 1) {

                    let command = packet.data
                    command.player = player.username

                    const msg = game.submitWord(command);

                    if (msg.status){
                        console.log(msg.msg)
                    } else {
                        let responsePacket = 
                            wsHelper.encoderPacket(
                                'err', 
                                { error: msg.msg }
                            )
                        socket.send(responsePacket)
                    }

                } else {
                    let responsePacket = 
                        wsHelper.encoderPacket(
                            'err', 
                            { error: "words must been submit only in the stage 1" }
                        )
                    socket.send(responsePacket);
                }
            }

            // vote-word
            if (packet.type == 'vote-word'){
                let command = packet.data
                command.player = player.username

                const msg = game.voteWord(command);

                if (msg.status){
                    console.log(msg.msg);
                }
                else {
                    let responsePacket = 
                        wsHelper.encoderPacket(
                            'err', 
                            { error: msg.msg }
                        )
                    socket.send(responsePacket);
                }
            }

        });

        socket.on('disconnect', () => {
            game.removePlayer({ player: player.username });
            console.log(`> Player disconnected: ${player.username}`);
        });

    })
}