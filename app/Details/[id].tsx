import { View, Text, StyleSheet, StatusBar, Button, Image, ImageBackground, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface DataItem {
  title: string;
  date: string;
  beer: string;
  key: string;
}

const Details: React.FC = () => {

  // const [data, setData] = useState([]);
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from AsyncStorage and update the state
    //  AsyncStorage.clear();
    const fetchData = async () => {
      const storedData = await getAllDataSortedByDate();
      const sortedData = [...storedData].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      // const sortedData = await getAllDataSortedByDate();
      console.log('Fetched Data:', sortedData); // Debugging line
      // Format the data to match the required FlatList structure
      const formattedData = (sortedData || []).map((item, index) => ({
        title: 'Title Text', // Placeholder title, update if needed
        date: item.date,
        beer: item.value.toString(), // Assuming values are numbers
        key: `item${index}`,
      }));

      setData(formattedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to fetch and sort data by date
  const getAllDataSortedByDate = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      
      const dateKeys = allKeys.filter(key => !isNaN(Date.parse(key)));
      
      const keyValuePairs = await AsyncStorage.multiGet(allKeys);

      const data = keyValuePairs.map(([key, value]) => ({
        date: key,
        value: value ? parseFloat(value) : 0,

      }));

      return data;
  

    } catch (e) {
      console.log('Error fetching and sorting data by date', e);
      return [];
    }
  }; alert

  const _onPress = (item: { title: string, key: string }) => {
    console.log('Item pressed:', item);
  };
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'MyCustomFont': require('../../src/assets/fonts/28_Days_Later.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }



  return (
    <View style={[styles.container, { height: '100%', width: '100%' }]}>
      <StatusBar hidden={true} barStyle="dark-content" />

      <ImageBackground source={require('../../src/assets/images/bg01.png')}
        style={[styles.bgImage, { height: '100%', width: '100%' }]} resizeMode="cover" >

        <View style={[{ position: 'absolute', top: 0, left: 20 }]}>
          <Image
            source={require('../../src/assets/images/beercounterpic00.png')}
            resizeMode='contain'
            style={[{ width: 180, height: 180, borderRadius: 10 }]}
          />
        </View>
        <View style={styles.blackBoardContainer}>
          <Image
            source={require('../../src/assets/images/bb01.jpg')}
            resizeMode='stretch'
            style={[{ width: '100%', height: '100%', borderRadius: 10 }]}
          />
        </View>

        <View style={styles.blackBoardTextContainer}>
          <View style={[styles.Details, { marginBottom: 20 }]}>
            <Text style={[styles.detailsText, { color: 'pink', textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: 'pink' }]}> Date </Text>
            <Text style={[styles.detailsText, , { color: 'pink', textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: 'pink' }]}> Beers </Text>
          </View>
          {
            loading  ? (
              <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
            ) :(
              <FlatList
              data={data}
              renderItem={({ item, index, separators }) => (
                <TouchableHighlight
                  key={item.key}
                  onPress={() => _onPress(item)}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}>
  
                  <View style={styles.Details}>
                    <Text style={[styles.detailsText, { color: 'white', textTransform: 'lowercase' }]}> {item.date} </Text>
                    <Text style={[styles.detailsText, , { color: 'white',textTransform: 'lowercase' }]}> {item.beer} </Text>
                  </View>
  
                </TouchableHighlight>
  
              )}
            />
            )
          }
        
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <View>
            <Text style={styles.buttonText}>OK</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1
  },
  Details: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 0,
    rowGap: 1,
    justifyContent: 'space-between',
    marginBottom: 8

  },
  detailsText: {
    fontSize: 20,
    fontFamily: 'MyCustomFont'
  },
  blackBoardContainer: {
    width: '93%',
    height: '75%',
    position: 'relative',
    top: 155,
    marginHorizontal: 10

  },
  blackBoardTextContainer: {
    width: '93%',
    height: '67%',
    position: 'absolute',
    top: 155,
    marginHorizontal: 10,
    // borderWidth: 1,
    padding: 30
  },

  // button styles
  button: {
    borderWidth: 1, // Border thickness
    borderColor: '#fff', // Border color (black, for example)
    borderRadius: 50, // Makes the button round
    paddingVertical: 7,
    paddingHorizontal: 20,
    bottom: 35,
    right: 40,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70
  },
  buttonText: {
    color: '#fff', // Text color (black, for example)
    fontSize: 16, // Text size
    fontWeight: 'bold',
    fontFamily: 'MyCustomFont'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
  },
});


export default Details;

