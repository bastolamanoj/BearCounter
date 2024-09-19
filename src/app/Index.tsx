import { View, Text, StatusBar, StyleSheet, StyleProp, ViewStyle, ImageBackground, Image } from 'react-native'
import React from 'react'
// import backgroundImage from '../assets/images/background.png';

const backgroundImg = '';

const getFormattedDate = () => {
  const today = new Date();

  const day = today.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);  // E.g., "September"
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(today);  // E.g., "Friday"

  return { day, month, weekday };
};
const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

const Index = () => {

  const dateInfo = getFormattedDate();

  return (
    <View style={[styles.container,{height:'100%', width: '100%'}]}>
      <StatusBar barStyle="dark-content" />

      {/* Background image */}
      <ImageBackground source={require('../assets/images/background.png')} style={[styles.bgImage,{height:'100%', width: '100%'}]} resizeMode="cover" >
      
          <View style={styles.calenderContainer}>
            <Image
              source={require('../assets/images/calender.png')}
              resizeMode='contain'
              style={[{width:120, height:150}]}
            />
            <Text style={styles.overlayText}>This </Text>
          </View>

          <View style={styles.counterContainer}>
            <Image
              source={require('../assets/images/counter.png')}
              resizeMode='contain'
              style={{width: 200, height: 200}}
            />
          </View>

          {/* Image in bottom-left corner */}
          <View style={styles.doneForTodayContainer}>
            <Image
              source={require('../assets/images/donefortoday.png')}
              resizeMode='contain'
              style={{width:150, height:150 }}
            />
          </View>
     
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    // justifyContent: 'center',
    // alignContent: 'space-around'
  },
  calenderContainer: {
    position: 'absolute',
    left:20,
    top: 270
  },
  counterContainer: {
    position: 'absolute',
    right:0,
    top: 270
  },
  doneForTodayContainer: {
    position: 'absolute',  // Absolute positioning to place the image relative to its parent
    left: -9,               // Align the image to the left
    bottom: -37,             // Align the image to the bottom
    padding: 10,           // Optional: Add some padding for spacing
  },
  image: {
    width: 200,
    height: 150,
  },
  overlayText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Index;
