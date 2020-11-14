import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser as setUserReducer } from "../redux/reducer";

import Button from "../components/button";
import Input from "../components/inputText";
import Logo from "../components/logo";

import api from "../services/api";
import messageHelper from "../utils/messageHelper";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = () => {
    const data = {
      username: user,
      password: pass,
    };
    api
      .post("/users/authenticate", data)
      .then((resp) => {
        console.log(resp.data);
        dispatch(setUserReducer(resp.data));
        setErrorMsg("");
        navigation.navigate("Menu");
      })
      .catch((error) => {
        setUser("");
        setPass("");
        error = messageHelper.formatError(error);
        console.log(error);
        setErrorMsg(error);
      });
  };

  useEffect(() => {
    setUser("");
    setPass("");
  }, []);

  return (
    <View style={styles.view}>
      <StatusBar hidden={true} />
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.inputs}>
        <Input value={user} onChangeText={setUser} placeholder="Usuário" />
        <Input
          value={pass}
          onChangeText={setPass}
          placeholder="Senha"
          pass={true}
        />
      </View>

      <Text style={styles.error}>{errorMsg}</Text>

      <Button title="Entrar" onPress={handleLogin} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Cadastro");
        }}
        background={TouchableNativeFeedback.SelectableBackground()}
      >
        <Text style={styles.cad}>Cadastrar-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#003F5C",
    alignItems: "center",
  },
  logo: {},
  inputs: {
    marginBottom: 50,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cad: {
    fontWeight: "bold",
    fontSize: 18,
    textDecorationLine: "underline",
    color: "#FFF",
    marginTop: 25,
  },

  error: {
    marginBottom: 25,
  },
});
