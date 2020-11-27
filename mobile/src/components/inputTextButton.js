import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  TextInput,
  View,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
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
        paddingBottom: 10,
        width: props.width,
      }}
    >
      <View
        style={{
          position: "absolute",
          alignItems: "flex-start",
          width: props.width * 0.8,
          height: props.height,
        }}
      >
        <TextInput
          style={{
            color: props.color,
            fontSize: props.textSize,
          }}
          placeholder={props.placeholder}
          placeholderTextColor="#FFF5"
          onChangeText={props.onChangeText}
          secureTextEntry={props.pass}
          value={props.value}
        />
      </View>
      {props.button ? (
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={props.onButtonPress}
            background={TouchableNativeFeedback.SelectableBackground()}
            style={styles.button}
          >
            <View>
              <Text style={styles.buttonText}>{props.button}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFF5",
    borderRadius: 45,
    width: 0.2 * deviceWidth,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF5",
    textAlign: "center",
  },
});

export default Input;
