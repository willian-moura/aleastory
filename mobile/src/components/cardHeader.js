import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

const CardHeader = (props) => {
  const [players, setPlayers] = useState(props.players);
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    setPlayers(props.players);
    setUser(props.user);
  }, [props]);

  return (
    <View style={styles.global}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => props.setPlayersList(true)}>
          <View style={styles.card}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.score}>
              {players[user.username] && players[user.username].score}
            </Text>
            <View style={styles.levelContainer}>
              <View style={styles.level}>
                <Text style={styles.levelText}>{user.level}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.positionContainer}>
          <View style={styles.position}>
            <Text style={styles.positionText}>
              {players[user.username] && players[user.username].matchRank}º
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

CardHeader.defaultProps = {
  color: "#FFF",
  width: 0.8 * deviceWidth,
  height: 0.6 * deviceHeight,
  margin: 10,
  textSize: 18,
};

const styles = StyleSheet.create({
  global: {
    marginTop: 10,
    minWidth: 0.8 * deviceWidth,
    minHeight: 0.06 * deviceHeight,
    alignItems: "center",
  },
  container: {
    marginTop: 10,
    minWidth: 0.8 * deviceWidth,
    minHeight: 0.06 * deviceHeight,
    alignItems: "flex-end",
  },
  card: {
    position: "relative",
    paddingLeft: 25,
    backgroundColor: "#BAE8E8",
    borderRadius: 8,
    minWidth: 0.7 * deviceWidth,
    minHeight: 0.08 * deviceHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  username: {},
  score: {
    marginLeft: 10,
  },
  levelContainer: {
    position: "absolute",
    padding: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 0.7 * deviceWidth,
    minHeight: 0.08 * deviceHeight,
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
    position: "absolute",
    alignItems: "flex-start",
    justifyContent: "center",
    minWidth: 0.75 * deviceWidth,
    minHeight: 0.08 * deviceHeight,
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

export default CardHeader;
