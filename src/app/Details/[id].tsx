import { View, Text, StyleSheet, StatusBar, Button, Image, ImageBackground, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from 'expo-router'
// import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
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

  useEffect(() => {
    // Fetch data from AsyncStorage and update the state
    const fetchData = async () => {
      const sortedData = await getAllDataSortedByDate();
     
      // Format the data to match the required FlatList structure
      const formattedData = (sortedData || []).map((item, index) => ({
        title: 'Title Text', // Placeholder title, update if needed
        date: item.date,
        beer: item.value.toString(), // Assuming values are numbers
        key: `item${index}`,
      }));
    
      setData(formattedData);
    };

    fetchData();
  }, []);

  // Function to fetch and sort data by date
  const getAllDataSortedByDate = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      // console.log(allKeys);
      const dateKeys = allKeys.filter(key => !isNaN(Date.parse(key)));
      console.log(dateKeys);
      const keyValuePairs = await AsyncStorage.multiGet(allKeys);

      const data = keyValuePairs.map(([key, value]) => ({
        date: key,
        value: value ? parseFloat(value) : 0,
       
      }));
      
      console.log(data);
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return data;
      
    } catch (e) {
      return [];
      console.log('Error fetching and sorting data by date', e);
    }
  };alert

  const _onPress = (item: { title: string, key: string }) => {
    console.log('Item pressed:', item);
  };
  const navigation = useNavigation();


  return (
    <View style={[styles.container, { height: '100%', width: '100%' }]}>
      {/* <StatusBar barStyle="dark-content" /> */}

      <ImageBackground source={require('../../assets/images/bg01.png')}
        style={[styles.bgImage, { height: '100%', width: '100%' }]} resizeMode="cover" >

        <View style={[{ position: 'absolute', top: 0, left: 20 }]}>
          <Image
            source={require('../../assets/images/beercounterpic00.png')}
            resizeMode='contain'
            style={[{ width: 180, height: 180, borderRadius: 10 }]}
          />
        </View>
        <View style={styles.blackBoardContainer}>
          <Image
            source={require('../../assets/images/bb01.jpg')}
            resizeMode='stretch'
            style={[{ width: '100%', height: '100%', borderRadius: 10 }]}
          />
        </View>

        <View style={styles.blackBoardTextContainer}>
          <View style={[styles.Details, {marginBottom: 20}]}>
            <Text style={[styles.detailsText, { color: 'pink', textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: 'pink' }]}> Date </Text>
            <Text style={[styles.detailsText, , { color: 'pink', textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: 'pink' }]}> Beers </Text>
          </View>

          <FlatList
            data={data}
            renderItem={({ item, index, separators }) => (
              <TouchableHighlight
                key={item.key}
                onPress={() => _onPress(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>

                <View style={styles.Details}>
                  <Text style={[styles.detailsText, { color: 'white' }]}> {item.date} </Text>
                  <Text style={[styles.detailsText, , { color: 'white' }]}> {item.beer} </Text>
                </View>

              </TouchableHighlight>

            )}
          />
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
    fontSize: 20
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
    bottom: 33,
    right: 40,
    position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70
  },
  buttonText: {
    color: '#fff', // Text color (black, for example)
    fontSize: 16, // Text size
    fontWeight: 'bold',
  }
});


export default Details;

