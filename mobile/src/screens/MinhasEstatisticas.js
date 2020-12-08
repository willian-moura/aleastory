import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Card from "../components/card";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default function MinhasEstatisticas() {
  const [user, setUser] = useState(useSelector((state) => state.user));
  const navigation = useNavigation();

  const getWinsRate = () => {
    let value = user.wins / user.matches_played;
    return value.toFixed(2);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleBack}>
      <Text style={styles.titleText}>Minhas Estatísticas</Text>
      <Card style={styles.card}>
        <View style={styles.levelCardContainer}>
          <Card backgroundColor="#FFF" style={styles.levelCard}>
            <Text style={styles.levelText}>Nível</Text>
            <Text style={[styles.levelText, { fontWeight: "bold" }]}>
              {user.level}
            </Text>
          </Card>
        </View>
        <Text style={styles.cardHeaderText}>{user.username}</Text>
        <Text style={styles.subtitleLabel}>Número de vitórias</Text>
        <Text style={styles.subtitleValue}>{user.wins}</Text>
        <Text style={styles.subtitleLabel}>Maior pontuação atingida</Text>
        <Text style={styles.subtitleValue}>{user.bigger_score}</Text>
        <Text style={styles.subtitleLabel}>Partidas jogadas</Text>
        <Text style={styles.subtitleValue}>{user.matches_played}</Text>
        <Text style={styles.subtitleLabel}>Taxa de aproveitamento</Text>
        <Text style={styles.subtitleValue}>{getWinsRate()}</Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003F5C",
    alignItems: "center",
  },
  titleText: {
    fontSize: 36,
    marginVertical: 30,
    color: "#FFF",
  },
  card: {
    minWidth: 0.8 * deviceWidth,
    minHeight: 0.7 * deviceHeight,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 35,
    paddingHorizontal: 10,
  },
  cardHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003F5C",
  },
  levelCardContainer: {
    position: "absolute",
    minWidth: 0.8 * deviceWidth,
    minHeight: 0.7 * deviceHeight,
    alignItems: "flex-end",
  },
  levelCard: {
    minWidth: 0.18 * deviceWidth,
    minHeight: 0.18 * deviceWidth,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  levelText: {
    fontSize: 18,
    color: "#003F5C",
  },
  subtitleLabel: {
    fontSize: 20,
    color: "#003F5C",
  },
  subtitleValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003F5C",
  },
});
