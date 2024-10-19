import React, { useRef, useState } from 'react';
import { View, Image, Animated, Text, TouchableOpacity, TouchableWithoutFeedback,StyleSheet, Easing,Vibration  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

interface ShakeableViewProps {
  plusCount: Function;
  minusCount: Function;
  count: number
}

const ShakeableView: React.FC<ShakeableViewProps> = ({plusCount, minusCount, count}) => {

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

  const [fontsLoaded] = useFonts({
    'MyCustomFont': require('../assets/fonts/28_Days_Later.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Handle press event
  const handlePress = () => {
    Vibration.vibrate(100);
   startRotation();
    plusCount();
  };

  // Handle long press event
  const handleLongPress = () => {
    Vibration.vibrate(100);
    startRotation();
    if(count > 0){
      minusCount();

    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} // This removes the fade effect
      onPress={handlePress} onLongPress={handleLongPress}>
        <Animated.Image style={[styles.image,{ transform: [{ rotate: rotateInterpolate }] }]}
          source={require('../assets/images/counter.png')} // Replace with your beer cap image URL
          // style={[styles.image, { transform: [{ rotate }, { translateX: shake }] }]}
          // style={[styles.image]}
        />
        <View style={{position: 'absolute', left:0, top:0, flex:1, height:200, width:200,
            // borderWidth:1, borderColor:'red', 
            justifyContent:'center',
            alignItems:'center'}}>
            <Text 
              style={[ styles.counterText,{ color: 'white',
              //  borderWidth:1 
               }]}>
              {count}
            </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200, // Adjust the size of the image as needed
  },

  counterText: {
    fontSize: 80,
    fontFamily: 'MyCustomFont'
    // height:200,
    //  width:200
  }
});

export default  ShakeableView;