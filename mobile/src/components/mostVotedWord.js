import React, { Component } from "react";
import {
  View,
  Dimensions,
  TouchableNativeFeedback,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

const MostVotedWord = (props) => {
  return (
    props.stage === 0 &&
    !!props.lastBestWord.word && (
      <View style={styles.container}>
        <Text style={styles.title}>A palavra mais votada foi:</Text>
        <View style={styles.wordCard}>
          <Text style={styles.wordText}>{props.lastBestWord.word}</Text>
        </View>
        <View style={styles.playerContainer}>
          <View style={styles.playerCard}>
            <Text style={styles.playerText}>{props.lastBestWord.player}</Text>
          </View>
        </View>
      </View>
    )
  );
};

MostVotedWord.defaultProps = {
  color: "#FFF",
  width: 0.8 * deviceWidth,
  height: 0.6 * deviceHeight,
  margin: 10,
  textSize: 18,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    margin: 0.2 * deviceHeight,
    borderRadius: 10,
    width: 0.8 * deviceWidth,
    height: 0.2 * deviceHeight,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BAE8E8",
  },
  title: {
    margin: 10,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 23,
    lineHeight: 27,
    textAlign: "center",
  },
  wordCard: {
    backgroundColor: "#4DD599",
    borderRadius: 45,
    margin: 0,
    width: 0.5 * deviceWidth,
    minHeight: 0.07 * deviceHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  wordText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 27,
    textAlign: "center",
    color: "#FFF",
  },
  playerContainer: {
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: 0.5 * deviceWidth,
    minHeight: 0.17 * deviceHeight,
  },
  playerCard: {
    position: "relative",
    backgroundColor: "#FFF",
    borderRadius: 45,
    margin: 0,
    width: 0.4 * deviceWidth,
    height: 0.03 * deviceHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  playerText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 27,
    textAlign: "center",
    color: "#000",
  },
});

export default MostVotedWord;
