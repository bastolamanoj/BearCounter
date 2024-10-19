import React, { useRef } from 'react';
import { View, Animated, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';



interface ShakeableViewProps {
    plusCount: Function;
    minusCount: Function;
    count: number
  }


const Shake: React.FC<ShakeableViewProps> = ({plusCount, minusCount, count}) =>  {
    const rotateValue = useRef(new Animated.Value(0)).current;

    const startRotation = () => {
        rotateValue.setValue(0); // Reset rotation value
        
        // Repeat the animation 5 times
        let repeatCount = 5; // Define the total repeat count
    
        const rotateAnimation = (isReversed: boolean, count: number) => {
            if (count === 0) return; // Stop when count reaches 0
    
            Animated.timing(rotateValue, {
                toValue: isReversed ? 0 : 1, // Rotate from 0 to 1
                duration: 50, // Duration of the rotation
                useNativeDriver: true,
            }).start(() => {
                rotateValue.setValue(isReversed ? 1 : 0); // Reset for the next repetition
                rotateAnimation(!isReversed, count - 1); // Reverse direction and decrement count
            });
        };
    
        rotateAnimation(false, repeatCount); // Start the animation
    };
    const rotateInterpolate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['-5deg', '5deg'], // Rotate between -5 and 5 degrees
    });

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={startRotation}>
                <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                    <Image source={require('../assets/images/counter.png')} style={styles.image} />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 190, // Set your image width
        height: 190, // Set your image height
    },
});

export default Shake;
