import { View, Text, StatusBar, StyleSheet, StyleProp, ViewStyle, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useState,useEffect  } from 'react'
// import ShakeableView from '../src/components/ShakeableView';
import ShakeableView from '@/src/components/ShakeableView';
import { useRouter,useNavigation , Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { registerRootComponent } from 'expo';

// import backgroundImage from '../assets/images/background.png';cls

const backgroundImg = '';

const getFormattedDate = () => {
  const today = new Date();

  const day = today.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);  // E.g., "September"
  const month1 = new Intl.DateTimeFormat('en-US', { month:  '2-digit' }).format(today);  // E.g., "Sep"
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(today);  // E.g., "Friday"

  return { day, month, weekday, today,month1 };
};
const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

const Home = () => {
  const router = useRouter();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  const dateInfo = getFormattedDate();
  const [count, setCount] = useState(0);
  // const [count, setCount] = useState<number>(0);

  const increaseBeerCount= ()=>{
    setCount(count+1);
  }
  const decreaseBeerCount= ()=>{
    setCount(count- 1);
  }

  const goToDetailsPage = async (): Promise<void> => {
    const key= dateInfo.today.getFullYear() + '-'+ dateInfo.month1 + '-'+ dateInfo.day;

    let val: string = count.toString();
     await storeOrUpdateData(key,val);
    //  await storeOrUpdateData('2024-09-01', '10');
    //  await storeOrUpdateData('2023-09-01', '10');
    //  await storeOrUpdateData('2024-10-25', '10');
    router.push('/Details/1');
  }

  const storeOrUpdateData = async (key: string, newValue: string) => {
    try {
      const existingValue = await AsyncStorage.getItem(key);
  
      if (existingValue !== null) {
        console.log('Key exists. Updating value...');
  
        // Parse existing value as an integer and add it to the new value
        const parsedExistingValue = parseInt(existingValue, 10);
        const parsedNewValue = parseInt(newValue, 10);
  
        if (!isNaN(parsedExistingValue) && !isNaN(parsedNewValue)) {
          const updatedValue = parsedExistingValue + parsedNewValue;
          
          // Store the updated value as a string
          await AsyncStorage.setItem(key, updatedValue.toString());
        } else {
          console.log('Error: One of the values is not a valid number');
        }
      } else {
        console.log('Key does not exist. Creating new key-value pair...');
  
        // Store the new value directly if no existing value is found
        await AsyncStorage.setItem(key, newValue);
      }
    } catch (e) {
      console.log('Error checking key or updating value', e);
    }
  };
  
  return (
    <View style={[styles.container, { height: '100%', width: '100%' }]}>
      <StatusBar hidden={true} barStyle="dark-content" />

      {/* Background image */}
      <ImageBackground source={require('../src/assets/images/background.png')} style={[styles.bgImage, { height: '100%', width: '100%' }]} resizeMode="cover" >

        <View style={styles.calenderContainer}>
          <Image
            source={require('../src/assets/images/calender.png')}
            resizeMode='contain'
            style={[{ width: 120, height: 150 }]}
          />

        </View>
        <View style={[styles.calenderTextContainer, { flex: 1, justifyContent: 'center', rowGap: 0, alignItems: 'center', flexDirection: 'column' }]}>
          <Text style={styles.calenderText}> {dateInfo.month} </Text>
          <Text style={[styles.calenderText, { color: 'black', fontSize: 25, fontFamily: 'sans-serif' }]}> {dateInfo.day} </Text>
          <Text style={[styles.calenderText, { color: '#4F75FF', fontWeight: 400 }]}> {dateInfo.weekday} </Text>
        </View>

        <View style={styles.counterContainer}>
          {/* <Image
              source={require('../assets/images/counter.png')}
              resizeMode='contain'
              style={{width: 200, height: 200}}
            /> */}
          <ShakeableView plusCount={increaseBeerCount} minusCount={decreaseBeerCount} count={count} />
          {/* <Text style={[styles.counterText, { color: 'white', position: 'absolute', top: 15, left: 35 }]}> {count} </Text> */}
        </View>

        {/* Image in bottom-left corner */}
        <View style={styles.doneForTodayContainer}>
          <TouchableOpacity activeOpacity={1} // This removes the fade effect
           onPress={goToDetailsPage}>
            <Image
              source={require('../src/assets/images/donefortoday.png')}
              resizeMode='contain'
              style={{ width: 150, height: 150 }}
            />
          </TouchableOpacity>
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
    left: 20,
    top: 270,
    // borderColor: 'red',
    // borderWidth: 1
  },
  calenderTextContainer: {
    position: 'absolute',
    height: 90,
    width: 100,
    left: 30,
    top: 305,
    transform: [{ rotate: '22deg' }],
    // borderColor: 'red',
    // borderWidth: 1
  },
  counterContainer: {
    position: 'absolute',
    right: 0,
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
  calenderText: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 16,
    textTransform: 'uppercase'
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
  counterText: {
    fontSize: 120
  }
});

// registerRootComponent(Home);

export default Home;
