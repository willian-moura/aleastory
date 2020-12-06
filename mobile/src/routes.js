import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Login from "./screens/Login";
import Cadastro from "./screens/Cadastro";
import Menu from "./screens/Menu";
import Jogar from "./screens/Jogar";
import Estatisticas from "./screens/Estatisticas";
import MinhasEstatisticas from "./screens/MinhasEstatisticas";
import RankingGlobal from "./screens/RankingGlobal";

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="Cadastro" component={Cadastro} />
        <AppStack.Screen name="Menu" component={Menu} />
        <AppStack.Screen name="Jogar" component={Jogar} />
        <AppStack.Screen name="Estatisticas" component={Estatisticas} />
        <AppStack.Screen
          name="MinhasEstatisticas"
          component={MinhasEstatisticas}
        />
        <AppStack.Screen name="RankingGlobal" component={RankingGlobal} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
