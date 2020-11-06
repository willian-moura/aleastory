import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();

import Login from './screens/Login'
import Menu from './screens/Menu'
import Cadastro from './screens/Cadastro'

export default function Routes(){
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{headerShown: false}} >
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Menu" component={Menu}/>
                <AppStack.Screen name="Cadastro" component={Cadastro}/>
            </AppStack.Navigator>

        </NavigationContainer>
    )
}