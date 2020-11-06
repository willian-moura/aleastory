import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, StatusBar} from 'react-native'
import { useSelector } from 'react-redux'

import Button from '../components/button'
import Logo from '../components/logo'

export default function Menu(){
    const ws = new WebSocket('ws://192.168.0.6:3333/game');

    const [user, setUser] = useState(useSelector(state => state.user))
    const [stageClock, setStageClock] = useState(0)

    const handlePlay = () => {

    }

    const handleStatistics = () => {

    }

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket Client Connected');

            const packet = {
                type : 'init-info',
                data : {
                    player : {
                        username : user.username,
                        playerlevel : user.userlevel
                    }
                }
            }

            ws.send(JSON.stringify(packet))
        };
        ws.onclose = () => {
            console.log('WebSocket Client Disconnected');
        }
        ws.onmessage = (message) => {
            
            const packet = JSON.parse(message.data)

            if (packet.type != 'update-stageclock' && packet.type != 'update-duration'){
                console.log(packet)
            }

            if (packet.type == 'update-stageclock'){
                setStageClock(packet.stageClock)
            }

        };
    }, [])

    return (
        <View style={styles.view}>
            <StatusBar hidden={true} />

            <View style={styles.logo}>
                <Logo />
            </View>

            <Text>{stageClock}</Text>
                         

        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#003F5C', 
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    logo:{
        
    },
    button: {
        margin: 10
    },
    buttons: {
        justifyContent: 'center',
    }
})