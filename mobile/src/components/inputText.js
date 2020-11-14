import React, { Component } from "react";
import {
  TextInput,
  View,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

const Input = (props) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#FFF",
        margin: props.margin,
      }}
    >
      <TextInput
        style={{
          textAlign: "left",
          fontSize: props.textSize,
          width: props.width,
          height: props.height,
          color: props.color,
        }}
        placeholder={props.placeholder}
        placeholderTextColor="#FFF5"
        onChangeText={props.onChangeText}
        secureTextEntry={props.pass}
        value={props.value}
      />
    </View>
  );
};

Input.defaultProps = {
  placeholder: "Digite aqui",
  color: "#FFF",
  width: 0.7 * deviceWidth,
  height: 40,
  margin: 10,
  textSize: 18,
  pass: false,
};

export default Input;
