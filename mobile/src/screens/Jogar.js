import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, StatusBar} from 'react-native'
import { useSelector } from 'react-redux'

import Button from '../components/button'
import Logo from '../components/logo'

const STAGE_NAME = [
    'Aguardando',
    '1a Etapa',
    '2a Etapa'
]

export default function Jogar(){
    const ws = new WebSocket('ws://192.168.0.6:3333/game');

    const [user, setUser] = useState(useSelector(state => state.user))

    const [players, setPlayers] = useState({})
    const [submittedWords, setSubmittedWords] = useState([])
    const [currentRound, setCurrentRound] = useState(0)
    const [gameDuration, setGameDuration] = useState(0)
    const [stage, setStage] = useState(0)
    const [currentText, setCurrentText] = useState('')
    const [lastBestWord, setLastBestWord] = useState({})
    const [status, setStatus] = useState('')
    const [stageDuration, setStageDuration] = useState(0)
    const [stageClock, setStageClock] = useState(0)

    const setState = (state) => {
        setPlayers(state["players"])
        setSubmittedWords(state.submittedWords)
        setCurrentRound(state.currentRound)
        setGameDuration(state.gameDuration)
        setStage(state.stage)
        setCurrentText(state.currentText)
        setLastBestWord(state.lastBestWord)
        setStatus(state.status)
        setStageDuration(state.stageDuration)
        setStageClock(state.stageClock)
    }

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket Client Connected');

            const packet = {
                type : 'init-info',
                data : {
                    player : {
                        username : user.username,
                        playerlevel : user.userlevel
                    }
                }
            }

            ws.send(JSON.stringify(packet))
        }

        ws.onclose = () => {
            console.log('WebSocket Client Disconnected');
        }

        ws.onmessage = (message) => {
            
            const packet = JSON.parse(message.data)

            if (packet.type != 'update-stageclock' && packet.type != 'update-duration'){
                console.log(packet)
            }

            if (packet.type == 'setup'){
                console.log(`Receiving ${packet.type}`)
                setState(packet.data)
            }

            if (packet.type == 'add-player'){
                console.log(`Receiving ${packet.type}`)
                setPlayers(packet.players)
            }

            if (packet.type == 'remove-player'){
                console.log(`Receiving ${packet.type}`)
                setPlayers(packet.players)
            }

            if (packet.type == 'update-duration'){
                setGameDuration(packet.duration)
            }

            if (packet.type == 'update-stageclock'){
                setStageClock(packet.stageClock)
            }

            if (packet.type == 'submit-stage'){
                console.log(`Receiving ${packet.type}`)
                setStage(packet.stage)
                setStageClock(packet.stageClock)
                setStatus(packet.status)
            }

            if (packet.type == 'vote-stage'){
                console.log(`Receiving ${packet.type}`)
                setStage(packet.stage)
                setStageClock(packet.stageClock)
                setSubmittedWords(packet.words)
                setStatus(packet.status)
            }

            if (packet.type == 'waiting-stage'){
                console.log(`Receiving ${packet.type}`)
                setStage(packet.stage)
                setStageClock(packet.stageClock)
                setCurrentText(packet.text)
                setCurrentRound(packet.round)
                setSubmittedWords(packet.words)
                // (limpar lista de palavras)
                setLastBestWord(packet.lastBestWord)

                const bestWordPlayer = packet.bestWordPlayer;
                if (bestWordPlayer.player != null){
                    setPlayers(packet.players)
                } else {
                    console.log('bestWordPlayer is NULL')
                }
                setStatus(packet.status)          
            }

            if (packet.type == 'submitted-word'){
                console.log(`The player ${packet.player} submitted a word`);

                let aux = players
                aux[packet.player].score = packet.score
                setPlayers(aux)
            }

            if (packet.type == 'player-voted'){
                console.log(`The player ${packet.player} voted in a word`);

                let aux = players
                aux[packet.player].score = packet.score
                setPlayers(aux)
            }

            if (packet.type == 'err'){
                console.log(`[ERROR] ${packet}`)
            }

        }

        return () => ws.close()
    }, [])

    return (
        <View style={styles.view}>
            <StatusBar hidden={true} />

            <View style={styles.logo}>
                <Logo />
            </View>

            <Text>Duração: {gameDuration}</Text>

            <Text>Round: {currentRound}</Text>

            <Text>{STAGE_NAME[stage]}</Text>

            <Text>{stageClock}</Text>

            <Text>{status}</Text>

            <Text>Players: </Text>
            {Object.keys(players).map((player, index) => (
                <Text key={player}>
                    {player}
                </Text>
            ))}

            <Text>Palavras submetidas: </Text>
            {submittedWords.map((obj, index) => (
                <Text key={index}>
                    {obj.word}
                </Text>
            ))}
                         

        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#003F5C', 
        alignItems: 'center',
    },
    logo:{
        
    },
    button: {
        margin: 10
    },
    buttons: {
        justifyContent: 'center',
    }
})