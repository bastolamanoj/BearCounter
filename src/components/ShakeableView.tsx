import React, { useRef, useState } from 'react';
import { View, Image, Animated, Text, TouchableOpacity, StyleSheet, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ShakeableViewProps {
  plusCount: Function;
  minusCount: Function;
  count: number
}

const ShakeableView: React.FC<ShakeableViewProps> = ({plusCount, minusCount, count}) => {
// const ShakeableView = ({setCount}) => {

  const rotateValue = useRef(new Animated.Value(0)).current; // Initial rotation value
  const shakeValue = useRef(new Animated.Value(0)).current; // Initial shake value
  const [shaking, setShaking] = useState(false); // Track if shake animation is running
  // const [count, setCount] = useState<number>(0);

const storeOrUpdateData = async (key: string, newValue: string) => {
  try {
    const existingValue = await AsyncStorage.getItem(key);

    if (existingValue !== null) {
      console.log('Key exists. Updating value...');
      await AsyncStorage.setItem(key, newValue);
    } else {
      console.log('Key does not exist. Creating new key-value pair...');
      await AsyncStorage.setItem(key, newValue);
    }
  } catch (e) {
    console.log('Error checking key or updating value', e);
  }
};


  // Function to rotate the image
  const rotateAnimation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { iterations: 2 }
    ).start(() => rotateValue.setValue(0)); // Reset to 0 after animation
  };

  // Function to shake the image
  const shakeAnimation = () => {
    if (!shaking) {
      setShaking(true);
      Animated.sequence([
        Animated.timing(shakeValue, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeValue, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeValue, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start(() => setShaking(false));
    }
  };

  // Handle press event
  const handlePress = () => {
    rotateAnimation(); // Start rotating on press
    shakeAnimation(); // Start shaking on press
    plusCount();
  };

  // Handle long press event
  const handleLongPress = () => {
    rotateAnimation(); // Start rotating on long press
    shakeAnimation(); // Start shaking on long press
    if(count > 0){
      minusCount();

    }
  };

  // Interpolating rotate animation value
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Interpolating shake translation value
  const shake = shakeValue.interpolate({
    inputRange: [-10, 10],
    outputRange: [-10, 10],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} onLongPress={handleLongPress}>
        <Animated.Image
          source={require('../assets/images/counter.png')} // Replace with your beer cap image URL
          style={[styles.image, { transform: [{ rotate }, { translateX: shake }] }]}
        />
        <View style={{position: 'absolute', left:0, top:0, flex:1,
            borderWidth:1, borderColor:'red', justifyContent:'center',
            alignItems:'center'}}>
            <Text 
              style={[ styles.counterText,{ color: 'white', borderWidth:1, top: 15, left: 35 }]}>
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
    fontSize: 80
  }
});

export default  ShakeableView;