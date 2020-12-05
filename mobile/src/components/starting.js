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
    props.starting && (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciando em {props.finalClock}</Text>
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
});

export default PlayersList;
