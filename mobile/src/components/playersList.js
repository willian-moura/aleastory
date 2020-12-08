import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  TouchableNativeFeedback,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

const PlayersList = (props) => {
  const [players, setPlayers] = useState(props.players);
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    setPlayers(props.players);
    setMinutes(parseInt(props.gameDuration / 60));
    setSeconds(
      props.gameDuration % 60 < 10
        ? `0${props.gameDuration % 60}`
        : props.gameDuration % 60
    );
  }, [props]);

  return (
    props.playersList && (
      <TouchableOpacity
        style={styles.container}
        onPress={() => props.setPlayersList(false)}
      >
        <Text style={styles.time}>
          Tempo restante: {minutes}:{seconds}
        </Text>
        <Text style={styles.text}>Jogadores</Text>
        {Object.keys(players).map((player, index) => (
          <View style={styles.playerContainer} key={index}>
            <View style={styles.positionContainer}>
              <View style={styles.position}>
                <Text style={styles.positionText}>
                  {players[player] && players[player].matchRank}º
                </Text>
              </View>
            </View>
            <Text style={styles.username}>{player}</Text>
            <Text style={styles.score}>
              {players[player] && players[player].score}
            </Text>
            <View style={styles.levelContainer}>
              <View style={styles.level}>
                <Text style={styles.levelText}>{players[player].level}</Text>
              </View>
            </View>
          </View>
        ))}
      </TouchableOpacity>
    )
  );
};

PlayersList.defaultProps = {
  color: "#FFF",
  width: 0.8 * deviceWidth,
  height: 0.6 * deviceHeight,
  margin: 10,
  textSize: 18,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    margin: 10,
    borderRadius: 10,
    width: 0.9 * deviceWidth,
    height: 0.9 * deviceHeight,
    alignItems: "center",
    backgroundColor: "#003F5C",
  },
  time: {
    margin: 10,
    fontFamily: "Roboto",
    fontStyle: "normal",
    color: "#FFF",
    fontSize: 18,
    lineHeight: 27,
    textAlign: "center",
  },
  text: {
    margin: 10,
    fontFamily: "Roboto",
    fontStyle: "normal",
    color: "#FFF",
    fontSize: 23,
    lineHeight: 27,
    textAlign: "center",
  },
  playerContainer: {
    backgroundColor: "#BAE8E8",
    borderRadius: 10,
    margin: 10,
    width: 0.8 * deviceWidth,
    height: 0.08 * deviceHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  username: {
    position: "absolute",
    marginLeft: 0.2 * deviceWidth,
    marginRight: 5,
  },
  score: {
    fontWeight: "bold",
    position: "absolute",
    marginLeft: 0.55 * deviceWidth,
    marginRight: 5,
  },
  levelContainer: {
    position: "absolute",
    marginLeft: 0.65 * deviceWidth,
    marginRight: 5,
  },
  level: {
    backgroundColor: "#3B3B3B",
    borderRadius: 45,
    width: 0.05 * deviceHeight,
    height: 0.05 * deviceHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  levelText: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#FFF",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 2 },
  },
  positionContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  position: {
    backgroundColor: "#FFF",
    borderRadius: 45,
    width: 0.05 * deviceHeight,
    height: 0.05 * deviceHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  positionText: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#000",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 2 },
  },
});

export default PlayersList;
