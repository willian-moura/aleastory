import React from 'react';
import { View, Text, Dimensions, Platform, StyleSheet } from 'react-native'

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

const Logo = (props) => {
    return (
        <View style={styles.view}>
            <Text style={styles.text}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        margin: 50,
        alignItems: 'center'
    },
    text:{
        fontSize: 42,
        color: '#FFF',
        textAlign: 'center',
    }
})

Logo.defaultProps = {
    value: 'AleaStory'
}

export default Logo