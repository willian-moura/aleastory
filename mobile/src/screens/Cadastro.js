import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity, TouchableNativeFeedback , StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import {setUser as setUserReducer} from '../redux/reducer'

import Button from '../components/button'
import Input from '../components/inputText'
import Logo from '../components/logo'

import api from '../services/api'
import messageHelper from '../utils/messageHelper'

// var deviceHeight = Dimensions.get('window').height;
// var deviceWidth = Dimensions.get('window').width;

export default function Cadastro(){
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')

    const [errorMsg, setErrorMsg] = useState('')

    handleSignUp = () => {

        if (pass != passConfirm){
            setErrorMsg("As senhas são diferentes")
            return
        }

        const data = {
            username : user,
            password : pass
        }
        api.post('/users', data).then(
            (resp) => {
                let data = resp.data
                console.log(data)

                api.get(`/users/${data.id}`).then(
                    (resp) => {
                        console.log(resp.data)
                        dispatch(setUserReducer(resp.data))
                        setErrorMsg('')
                        navigation.navigate('Menu')
                    }
                )
            }
        ).catch(
            (error) => {
                error = messageHelper.formatError(error)
                console.log(error)
                setErrorMsg(error)
            }
        )
    }

    useEffect(() => {
        setUser('')
        setPass('')
        setPassConfirm('')
    }, [])

    return(
        <View style={styles.view}>
            <View style={styles.logo}>
                <Logo value='Cadastrar usuário'/>
            </View>
            <View style={styles.inputs}>
                <Input  value={user} onChangeText={setUser} 
                        placeholder='Usuário'/>
                <Input  value={pass} onChangeText={setPass} 
                        placeholder='Senha' pass={true}/>
                <Input  value={passConfirm} onChangeText={setPassConfirm} 
                        placeholder='Confirme a senha' pass={true}/>
            </View>

            <Text style={styles.error}>{errorMsg}</Text>    
            
            <Button title='Cadastrar' 
                onPress={handleSignUp} />
            
        </View>
    )

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#003F5C', 
        alignItems: 'center'
    },
    logo:{
        
    },
    inputs:{
        marginBottom: 25
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cad:{
        fontWeight: 'bold',
        fontSize: 18,
        textDecorationLine: 'underline', 
        color: '#FFF',
        
    },
    error :{
        marginBottom: 25
    }
})