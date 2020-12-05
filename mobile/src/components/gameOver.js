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
import Card from "./card";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

const PlayersList = (props) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!props.gameOver) {
      setReady(false);
    }
  }, [props.gameOver]);

  return (
    props.gameOver && (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setReady(!ready)}>
          {!ready && (
            <View>
              <Text style={styles.title}>
                Parabéns {props.player && props.player.username}!
              </Text>
              <Text style={styles.title}>Você venceu a partida 👏🎊</Text>
              <View style={styles.playerContainer}>
                <Text style={styles.username}>
                  {props.player && props.player.username}
                </Text>
                <Text style={styles.score}>
                  {props.player && props.player.score} pontos
                </Text>
                <View style={styles.levelContainer}>
                  <View style={styles.level}>
                    <Text style={styles.levelText}>
                      {props.player && props.player.level}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          {ready && (
            <View>
              <View style={styles.card}>
                <Text style={styles.finalTextTitle}>Texto criado:</Text>
                <Card text={props.finalText} />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
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
    justifyContent: "center",
    backgroundColor: "#003F5C",
  },
  title: {
    color: "#FFF",
    fontSize: 27,
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
    marginLeft: 0.1 * deviceWidth,
    marginRight: 5,
  },
  score: {
    fontWeight: "bold",
    position: "absolute",
    marginLeft: 0.45 * deviceWidth,
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
  card: {
    alignItems: "center",
  },
  finalTextTitle: {
    color: "#FFF",
    fontSize: 38,
    fontWeight: "bold",
  },
});

export default PlayersList;
