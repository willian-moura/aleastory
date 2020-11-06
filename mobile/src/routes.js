import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();

import Login from './screens/Login'
import Cadastro from './screens/Cadastro'
import Menu from './screens/Menu'
import Jogar from './screens/Jogar'

export default function Routes(){
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{headerShown: false}} >
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Cadastro" component={Cadastro}/>
                <AppStack.Screen name="Menu" component={Menu}/>
                <AppStack.Screen name="Jogar" component={Jogar}/>
            </AppStack.Navigator>

        </NavigationContainer>
    )
}