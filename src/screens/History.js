import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert, Button, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTripID, setTrips } from '../redux/actions';
import GlobalStyle from '../utils/GlobalStyle';
import CheckBox from '@react-native-community/checkbox';

export default function History({ navigation }) {

    const { trips } = useSelector(state => state.tripReducer);
    const dispatch = useDispatch();

    const Item = [
      {name: 'Work'},
      {name: 'Groceries'},
      {name: 'Travel'},
      {name: 'Gym'},
      {name: 'Other'},
    ];

    const [type, setType] = useState('');

    useEffect(() => {
        getTrips();
    }, [])

    const getTrips = () => {
        AsyncStorage.getItem('Trips')
        .then(trips => {
            const parsedTasks = JSON.parse(trips);
            if (parsedTasks && typeof parsedTasks === 'object') {
                dispatch(setTrips(parsedTasks));
            }
        })
        .catch(error => console.log(error))
    };

    const deleteTrip = (id) => {
      const filteredTasks = trips.filter(trip => trip.ID !== id);
      AsyncStorage.setItem('Trips', JSON.stringify(filteredTasks))
      .then(() => {
          dispatch(setTrips(filteredTasks));
          Alert.alert('Success!', 'Task removed successfully.');
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.body}> 
      {type==='' ? 
      <View>
        <Text style={styles.header_text}> Previous trips </Text>
        <FlatList 
        style={styles.page_view}
          data={Item}
          renderItem={({ item }) => (
            <View style={styles.btn_view}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {setType(item.name)}}
              >
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        /> 
        </View>
      : 
        <View>
          <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                  style={{ marginTop:'5%', marginLeft: '5%' }}
                  onPress={() => {setType('')}}
                >
                  <FontAwesome5 
                      name={'chevron-circle-left'}
                      size={30}
                      color={'#555'}
                />
            </TouchableOpacity>
            <Text style={styles.header_text}>{type}</Text>
          </View>
        <FlatList 
            data={trips}
            renderItem={({ item }) => (
              <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            dispatch(setTripID(item.ID));
                            navigation.navigate('Trip');
                        }}
                >
              {type=== (item.Iname) ? 
                  <View style={styles.item_body}>
                    <Text 
                        style = {styles.title}
                        numberOfLines= {1}
                    >
                        {item.Vehicle}, {item.Car}
                    </Text>
                    <Text
                        style = {styles.subtitle}
                        numberOfLines= {1}
                    >
                        {item.Fuel} {item.Test}
                    </Text>
                    <TouchableOpacity
                            style={styles.delete}
                            onPress={() => {deleteTrip(item.ID)}}
                        >
                            <FontAwesome5 
                                name={'trash'}
                                size={25}
                                color={'#ff3636'}
                            />
                      </TouchableOpacity>
                  </View>
                
                : 
                null
              }
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header_text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '5%',
    marginLeft: '5%',
  },
  page_view: {
    margin: '10%',
  },
  btn_view: {
    backgroundColor: '#e1fbff',
    marginBottom: 10,
  },
  button: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: "15%",
    height: 80,
  },
  text: {
    fontSize: 20,
  },
  item_body: {
    flex: 1,
    backgroundColor: '#fbe1ff',
    marginTop: '5%',
  },
  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
      color: '#999999',
      fontSize: 20,
      margin: 5,
  },
});