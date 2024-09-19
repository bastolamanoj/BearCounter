
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

interface ButtonProps{
    onPress?: () => void;
    btnStyle?: StyleProp<ViewStyle>;
    btnText: string
}

const Button: React.FC<ButtonProps> = ({
    onPress = () => {},
    btnStyle = {},
    btnText
}) => {
    return (
     <TouchableOpacity
     onPress={onPress}
     style={[styles.btnStyle, btnStyle]}
     >
         <Text>{btnText}</Text>
     </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    btnStyle: {
        height: 48,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderWidth:1
    }
});

export default Button;