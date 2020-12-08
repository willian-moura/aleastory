import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useSelector } from "react-redux";

export default function LevelBar() {
  const [user, setUser] = useState(useSelector((state) => state.user));
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {},
});
