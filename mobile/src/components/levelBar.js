import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar, Dimensions, Text } from "react-native";

const LEVEL_WINS_REQUIRED = [0, 1, 5, 10, 25, 50, 500];

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default function LevelBar(props) {
  const totalWidth = 0.7 * deviceWidth;
  const barWidth = LEVEL_WINS_REQUIRED[props.level + 1]
    ? props.wins / LEVEL_WINS_REQUIRED[props.level + 1]
    : 0;

  return (
    <View style={styles.container(totalWidth, barWidth)}>
      <View style={styles.backgroundBar(totalWidth, barWidth)}></View>
      <View style={styles.foregroundBar(totalWidth, barWidth)}></View>
      <View style={styles.labelContainer(totalWidth, barWidth)}>
        <View style={styles.viewPreviousLevel(totalWidth)}>
          <Text style={styles.labelLevel}>
            {props.level > 0 ? `Nível ${props.level - 1}` : ""}
          </Text>
        </View>
        <Text style={styles.labelWins}>{props.wins}</Text>
        <View style={styles.viewNextLevel(totalWidth)}>
          <Text style={styles.labelLevel}>Nível {props.level + 1}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (totalWidth, barWidth) => ({
    alignItems: "flex-start",
    margin: 0,
    height: 0.1 * deviceHeight,
    width: totalWidth,
  }),
  backgroundBar: (totalWidth, barWidth) => ({
    position: "absolute",
    borderRadius: 45,
    height: 0.025 * deviceHeight,
    width: totalWidth,
    backgroundColor: "#C4C4C4",
  }),
  foregroundBar: (totalWidth, barWidth) => ({
    position: "absolute",
    borderRadius: 45,
    height: 0.025 * deviceHeight,
    width: barWidth * totalWidth,
    backgroundColor: "#4DD599",
  }),
  labelContainer: (totalWidth, barWidth) => ({
    width: totalWidth,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 0.07 * deviceHeight,
    padding: 10,
  }),
  labelWins: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    color: "#003F5C",
  },
  viewPreviousLevel: (totalWidth) => ({
    position: "absolute",
    alignItems: "flex-start",
    width: totalWidth,
    justifyContent: "flex-end",
  }),
  viewNextLevel: (totalWidth) => ({
    position: "absolute",
    alignItems: "flex-end",
    width: totalWidth,
    justifyContent: "flex-end",
  }),
  labelLevel: {
    color: "#003F5C",
  },
});
