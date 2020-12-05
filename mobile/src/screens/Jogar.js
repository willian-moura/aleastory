import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { useSelector } from "react-redux";

import Button from "../components/button";
import Input from "../components/inputText";
import InputTextButton from "../components/inputTextButton";
import Card from "../components/card";
import Stages from "../components/stages";
import CardHeader from "../components/cardHeader";
import VoteWord from "../components/voteWord";
import MostVotedWord from "../components/mostVotedWord";
import Logo from "../components/logo";
import PlayersList from "../components/playersList";
import GameOver from "../components/gameOver";
import Starting from "../components/starting";

const STAGE_NAME = ["Aguardando", "1a Etapa", "2a Etapa"];

export default function Jogar() {
  const socketRef = useRef({});
  const [user, setUser] = useState(useSelector((state) => state.user));

  const [players, setPlayers] = useState({});
  const [submittedWords, setSubmittedWords] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [gameDuration, setGameDuration] = useState(0);
  const [stage, setStage] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [lastBestWord, setLastBestWord] = useState({});
  const [status, setStatus] = useState("");
  const [stageDuration, setStageDuration] = useState(0);
  const [stageClock, setStageClock] = useState(0);
  const [finalClock, setFinalClock] = useState(0);
  const [winner, setWinner] = useState(null);

  const [wordToSend, setWordToSend] = useState("");
  const [sended, setSended] = useState(false);
  const [voted, setVoted] = useState(false);
  const [playersList, setPlayersList] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [starting, setStarting] = useState(false);

  const setState = (state) => {
    setPlayers(state["players"]);
    setSubmittedWords(state.submittedWords);
    setCurrentRound(state.currentRound);
    setGameDuration(state.gameDuration);
    setStage(state.stage);
    setCurrentText(state.currentText);
    setLastBestWord(state.lastBestWord);
    setStatus(state.status);
    setStageDuration(state.stageDuration);
    setStageClock(state.stageClock);
  };

  const handleSubmitWord = (word) => {
    const ws = socketRef.current;
    if (word != "") {
      setSended(true);
      const packet = {
        type: "submit-word",
        data: {
          word,
          player: user.username,
        },
      };
      setWordToSend("");
      ws.send(JSON.stringify(packet));
    } else {
      console.log("Empty word!");
    }
  };

  const handleWordToSend = (value) => {
    let word = value;
    if (/\s/.test(value)) {
      word = value.split(" ")[0];
    }
    setWordToSend(word);
  };

  useEffect(() => {
    socketRef.current = new WebSocket("ws://192.168.0.6:3333/game");
    const ws = socketRef.current;
    ws.onopen = () => {
      console.log("WebSocket Client Connected");

      const packet = {
        type: "init-info",
        data: {
          player: {
            username: user.username,
            playerlevel: user.level,
          },
        },
      };

      ws.send(JSON.stringify(packet));
    };

    ws.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };

    ws.onmessage = (message) => {
      const packet = JSON.parse(message.data);

      if (
        packet.type != "update-stageclock" &&
        packet.type != "update-duration"
      ) {
        console.log(packet);
      }

      if (packet.type == "setup") {
        console.log(`Receiving ${packet.type}`);
        setState(packet.data);
      }

      if (packet.type == "add-player") {
        console.log(`Receiving ${packet.type}`);
        setPlayers(packet.players);
      }

      if (packet.type == "remove-player") {
        console.log(`Receiving ${packet.type}`);
        setPlayers(packet.players);
      }

      if (packet.type == "update-duration") {
        setGameDuration(packet.duration);
      }

      if (packet.type == "update-stageclock") {
        setStageClock(packet.stageClock);
      }

      if (packet.type == "submit-stage") {
        setSended(false);
        console.log(`Receiving ${packet.type}`);
        setStage(packet.stage);
        setStageClock(packet.stageClock);
        setStatus(packet.status);
        setPlayers(packet.players);
      }

      if (packet.type == "vote-stage") {
        setVoted(false);
        console.log(`Receiving ${packet.type}`);
        setStage(packet.stage);
        setStageClock(packet.stageClock);
        setSubmittedWords(packet.words);
        setStatus(packet.status);
        setPlayers(packet.players);
      }

      if (packet.type == "waiting-stage") {
        console.log(`Receiving ${packet.type}`);
        setStarting(false);
        setStage(packet.stage);
        setStageClock(packet.stageClock);
        setCurrentText(packet.text);
        setCurrentRound(packet.round);
        setSubmittedWords(packet.words);
        // (limpar lista de palavras)
        setLastBestWord(packet.lastBestWord);
        setPlayers(packet.players);
        setStatus(packet.status);
      }

      if (packet.type == "submitted-word") {
        console.log(`The player ${packet.player} submitted a word`);
        setPlayers(packet.players);
      }

      if (packet.type == "player-voted") {
        console.log(`The player ${packet.player} voted in a word`);
        setPlayers(packet.players);
      }

      if (packet.type == "game-over") {
        console.log(packet);
        setGameOver(true);
        setFinalClock(packet.finalClock);
        setPlayers(packet.players);
        setCurrentText(packet.currentText);
        setWinner(packet.winnerPlayer);
      }

      if (packet.type == "starting") {
        console.log(`starting`);
        setGameOver(false);
        setStarting(true);
        setWinner(null);
        setFinalClock(packet.finalClock);
      }

      if (packet.type == "err") {
        console.log(`[ERROR] ${packet.data}`);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <View style={styles.view}>
      <StatusBar hidden={true} />

      <CardHeader
        user={user}
        players={players}
        setPlayersList={setPlayersList}
      />

      <Stages counter={stageClock} stage={stage} />

      <Card text={currentText} />

      {stage == 1 && !sended && (
        <View>
          <InputTextButton
            value={wordToSend}
            onChangeText={handleWordToSend}
            placeholder="Digite algo..."
            button="Enviar"
            onButtonPress={() => handleSubmitWord(wordToSend)}
          />
        </View>
      )}

      {!voted && (
        <VoteWord
          user={user}
          submittedWords={submittedWords}
          stage={stage}
          voted={voted}
          setVoted={setVoted}
          ws={socketRef.current}
        />
      )}

      <MostVotedWord stage={stage} lastBestWord={lastBestWord} />

      <PlayersList
        players={players}
        playersList={playersList}
        setPlayersList={setPlayersList}
        gameDuration={gameDuration}
      />

      <GameOver player={winner} gameOver={gameOver} finalText={currentText} />

      <Starting starting={starting} finalClock={finalClock} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#003F5C",
    alignItems: "center",
  },
  logo: {},
  button: {
    margin: 10,
  },
  buttons: {
    justifyContent: "center",
  },
});
