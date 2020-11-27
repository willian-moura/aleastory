import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { useSelector } from "react-redux";

import Button from "../components/button";
import Input from "../components/inputText";
import InputTextButton from "../components/inputTextButton";
import Card from "../components/card";
import Stages from "../components/stages";
import CardHeader from "../components/cardHeader";
import Logo from "../components/logo";

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

  const [wordToSend, setWordToSend] = useState("");
  const [sended, setSended] = useState(false);
  const [voted, setVoted] = useState(false);

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

  const handleVoteWord = (obj) => {
    const ws = socketRef.current;
    if (obj.player != user.username) {
      setVoted(true);
      const packet = {
        type: "vote-word",
        data: {
          word: obj.word,
          player: user.username,
        },
      };
      ws.send(JSON.stringify(packet));
    } else {
      console.log("You can't vote on your own word!");
    }
  };

  useEffect(() => {
    socketRef.current = new WebSocket("ws://192.168.0.7:3333/game");
    const ws = socketRef.current;
    ws.onopen = () => {
      console.log("WebSocket Client Connected");

      const packet = {
        type: "init-info",
        data: {
          player: {
            username: user.username,
            playerlevel: user.userlevel,
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
      }

      if (packet.type == "vote-stage") {
        setVoted(false);
        console.log(`Receiving ${packet.type}`);
        setStage(packet.stage);
        setStageClock(packet.stageClock);
        setSubmittedWords(packet.words);
        setStatus(packet.status);
      }

      if (packet.type == "waiting-stage") {
        console.log(`Receiving ${packet.type}`);
        setStage(packet.stage);
        setStageClock(packet.stageClock);
        setCurrentText(packet.text);
        setCurrentRound(packet.round);
        setSubmittedWords(packet.words);
        // (limpar lista de palavras)
        setLastBestWord(packet.lastBestWord);

        const bestWordPlayer = packet.bestWordPlayer;
        if (bestWordPlayer.player != null) {
          setPlayers(packet.players);
        } else {
          console.log("bestWordPlayer is NULL");
        }
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

      if (packet.type == "err") {
        console.log(`[ERROR] ${packet.data}`);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <View style={styles.view}>
      <StatusBar hidden={true} />

      {/* <View style={styles.logo}>
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
          {player} - {players[player].score}
        </Text>
      ))}

      {stage == 2 && !voted && (
        <View>
          <Text>Palavras submetidas: </Text>
          {submittedWords.map(
            (obj, index) =>
              obj.player != user.username && (
                <Button
                  key={index}
                  title={obj.word}
                  onPress={() => handleVoteWord(obj)}
                />
              )
          )}
        </View>
      )} */}

      <CardHeader user={user} players={players} />

      <Stages counter={stageClock} stage={stage} />

      <Card text={currentText} />
      {stage == 1 && !sended && (
        <View>
          <InputTextButton
            value={wordToSend}
            onChangeText={setWordToSend}
            placeholder="Digite algo..."
            button="Enviar"
            onButtonPress={() => handleSubmitWord(wordToSend)}
          />
        </View>
      )}
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
