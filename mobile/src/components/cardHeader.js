import React, { Component } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

const CardHeader = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.username}>{props.user.username}</Text>
        <Text style={styles.score}>0 pontos</Text>
        <View style={styles.levelContainer}>
          <View style={styles.level}>
            <Text style={styles.levelText}>{props.user.level}</Text>
          </View>
        </View>
      </View>
      <View style={styles.positionContainer}>
        <View style={styles.position}>
          <Text style={styles.positionText}>1º</Text>
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
