import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
} from "react-native";

import api from "../services/api";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default function RankingGlobal() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    api
      .get("/users")
      .then((resp) => {
        setPlayers(resp.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Ranking global</Text>
      </View>
      <View>
        <FlatList
          style={styles.listContainer}
          data={players}
          keyExtractor={(player) => player.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: player, index }) => (
            <View style={styles.playerContainer}>
              <View style={styles.positionContainer}>
                <View style={styles.position}>
                  <Text style={styles.positionText}>{index + 1}º</Text>
                </View>
              </View>
              <Text style={styles.username}>{player.username}</Text>
              <Text style={styles.score}>{player.wins}</Text>
              <View style={styles.levelContainer}>
                <View style={styles.level}>
                  <Text style={styles.levelText}>{player.level}</Text>
                </View>
              </View>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003F5C",
    alignItems: "center",
  },
  titleContainer: {
    margin: 10,
  },
  titleText: {
    fontSize: 36,
    marginVertical: 30,
    color: "#FFF",
  },
  listContainer: {
    marginBottom: 0.16 * deviceHeight,
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
