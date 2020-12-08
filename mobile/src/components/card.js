import React, { Component } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

const Card = (props) => {
  return (
    <View
      style={[
        styles.container,
        props.style,
        { backgroundColor: props.backgroundColor || "#BAE8E8" },
      ]}
    >
      {!!props.text && <Text>{props.text}</Text>}
      {props.children}
    </View>
  );
};

Card.defaultProps = {
  color: "#FFF",
  width: 0.8 * deviceWidth,
  height: 0.6 * deviceHeight,
  margin: 10,
  textSize: 18,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    minWidth: 0.8 * deviceWidth,
    minHeight: 0.3 * deviceHeight,
  },
});

export default Card;
