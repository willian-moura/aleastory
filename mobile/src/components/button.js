import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={props.style} width={props.width}>
                <Text style={{color: props.textColor, fontSize: props.textSize, textAlign: 'center'}}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const styles= StyleSheet.create({
    view: {
        width: 200, 
        backgroundColor: '#FFF',
        borderRadius: 45,
        shadowOffset: {height:25,width:25},
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    }

})

Button.defaultProps = {
    title: 'Button',
    style: styles.view,
    textColor: '#3B3B3B',
    textSize: 24,
    width: styles.view.width,
}


export default Button