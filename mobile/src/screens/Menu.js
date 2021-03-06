import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import Button from "../components/button";
import Logo from "../components/logo";

export default function Menu() {
  const navigation = useNavigation();

  const [user, setUser] = useState(useSelector((state) => state.user));

  const handlePlay = () => {
    navigation.navigate("Jogar");
  };

  const handleStatistics = () => {
    navigation.navigate("Estatisticas");
  };

  return (
    <View style={styles.view}>
      <StatusBar hidden={true} />

      <View style={styles.logo}>
        <Logo />
      </View>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Jogar" onPress={handlePlay} />
        </View>

        <View style={styles.button}>
          <Button title="Estatísticas" onPress={handleStatistics} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#003F5C",
    alignItems: "center",
    justifyContent: "space-around",
  },
  logo: {},
  button: {
    margin: 10,
  },
  buttons: {
    justifyContent: "center",
  },
});
