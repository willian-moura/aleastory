import React, { Component } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

const Stages = (props) => {
  return (
    <View style={styles.container}>
      <View style={props.stage === 1 ? styles.stageOn : styles.stageOff}>
        <Text style={styles.stageText}>1ª Etapa</Text>
      </View>
      <View style={props.stage === 2 ? styles.stageOn : styles.stageOff}>
        <Text style={styles.stageText}>2ª Etapa</Text>
      </View>
      <View style={styles.counterContainer}>
        <View style={styles.counter}>
          <Text style={styles.counterText}>{props.counter}</Text>
        </View>
      </View>
    </View>
  );
};

Stages.defaultProps = {
  color: "#FFF",
  width: 0.8 * deviceWidth,
  height: 0.6 * deviceHeight,
  margin: 10,
  textSize: 18,
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    minWidth: 0.8 * deviceWidth,
    minHeight: 0.06 * deviceHeight,
    flexDirection: "row",
  },
  counterContainer: {
    position: "absolute",
    margin: 5,
    minWidth: 0.8 * deviceWidth,
    minHeight: 0.06 * deviceHeight,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  stageOff: {
    backgroundColor: "#4DD599",
    borderRadius: 45,
    margin: 5,
    width: 0.4 * deviceWidth,
    minHeight: 0.06 * deviceHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  stageOn: {
    backgroundColor: "#FB5B5A",
    borderRadius: 45,
    margin: 5,
    width: 0.4 * deviceWidth,
    minHeight: 0.06 * deviceHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  stageText: {
    fontWeight: "bold",
    fontSize: 22,
    fontFamily: "Roboto",
    color: "#FFF",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 2 },
  },
  counter: {
    position: "absolute",
    backgroundColor: "#FFF",
    borderRadius: 45,
    width: 0.08 * deviceHeight,
    height: 0.08 * deviceHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    fontWeight: "bold",
    fontSize: 24,
    fontFamily: "Roboto",
    color: "#000",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 2 },
  },
});

export default Stages;
