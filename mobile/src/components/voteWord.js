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

const VoteWord = (props) => {
  const show =
    props.submittedWords.length == 0 ||
    (props.submittedWords.length == 1 &&
      props.submittedWords[0].player === props.user.username);

  const handleVoteWord = (obj) => {
    const ws = props.ws;
    if (obj.player != props.user.username) {
      props.setVoted(true);
      const packet = {
        type: "vote-word",
        data: {
          word: obj.word,
          player: props.user.username,
        },
      };
      ws.send(JSON.stringify(packet));
    } else {
      console.log("You can't vote on your own word!");
    }
  };

  return (
    !show &&
    props.stage === 2 &&
    !props.voted && (
      <View style={styles.container}>
        <Text style={styles.title}>Escolha a melhor palavra </Text>
        {props.submittedWords.map(
          (obj, index) =>
            obj.player != props.user.username && (
              <TouchableOpacity
                key={index}
                onPress={() => handleVoteWord(obj)}
                background={TouchableNativeFeedback.SelectableBackground()}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{obj.word}</Text>
                </View>
              </TouchableOpacity>
            )
        )}
      </View>
    )
  );
};

VoteWord.defaultProps = {
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
  button: {
    backgroundColor: "#4DD599",
    borderRadius: 45,
    margin: 5,
    width: 0.6 * deviceWidth,
    minHeight: 0.06 * deviceHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 23,
    lineHeight: 27,
    textAlign: "center",
    color: "#FFF",
  },
});

export default VoteWord;
