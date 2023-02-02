/*import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert, Button, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTripID, setTrips } from '../redux/actions';
import GlobalStyle from '../utils/GlobalStyle';
import CheckBox from '@react-native-community/checkbox';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
      name: 'MainDB',
      location: 'default',
  },
  () => {},
  error => {console.log(error)},
);


export default function History({ navigation }) {

    const { trips } = useSelector(state => state.tripReducer);
    const dispatch = useDispatch();

    const [vehicle, setVehicle] = useState("");
    const [distance, setDistance] = useState('');
    const [iname, setIName] = useState("");

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
        try {
          db.transaction((tx) => {
              tx.executeSql(
                  "SELECT Vehicle, Distance, Category FROM Trips WHERE ID=1",
                  [],
                  (tx, results) => {
                      var len = results.rows.length;
                      if (len > 0) {
                          var userName = results.rows.item(0).Vehicle;
                          var userAge = results.rows.item(0).Distance;
                          var db_category = results.rows.item(0).Category;
  
                          setVehicle(userName);
                          setDistance(userAge);
                          setIName(db_category);
                      }
                  }
              )
          })
      } catch (error) {
          console.log(error);
      }
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
                        {item.Vehicle}, {item.Car},{vehicle},{distance}
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
});*/


import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const db = SQLite.openDatabase(
  {
      name: 'MainDB',
      location: 'default',
  },
  () => {},
  error => {console.log(error)},
);

const History = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);

  const Item = [
    {name: 'Work'},
    {name: 'Groceries'},
    {name: 'Travel'},
    {name: 'Gym'},
    {name: 'Other'},
  ];

  const [type, setType] = useState('');

  useEffect(() => {
    navigation.addListener('focus', ()=> {
      getData();
  });  
  }, []);

  const getData = (type) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Trips WHERE Category=?",
          [type],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i){
              temp.push(results.rows.item(i));
            }
            setFlatListItems(temp);
            console.log(temp)
          }
        );
      });
    } catch (error) {
        console.log(error);
    }
  };

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.ID}
        style={{ backgroundColor: 'white', padding: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Trip', {
            Vehicle: item.Vehicle,
            Vehicle_Type: item.Vehicle_Type,
            Fuel_Type: item.Fuel_Type,
            Fuel: item.Fuel,
            Consumption: item.Consumption,
            Distance: item.Distance,
            Passengers: item.Passengers
          })}>
            <Text>Method: {item.Vehicle}</Text>
            {item.Vehicle_Type.length !== 0 ? <Text>Vehicle type: {item.Vehicle_Type}</Text> : null}
            <Text>Fuel: {item.Fuel}</Text>
            <Text>Distance: {item.Distance}</Text>
            <Text>Date: {item.Date}</Text>
            <Text>Type: {item.Category}</Text>
            <Text>Emission: {item.Emission}</Text>
          </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.body}> 
      {type === '' ? 
      <View>
        <Text style={styles.header_text}> Previous trips </Text>
        <FlatList 
        style={styles.page_view}
          data={Item}
          renderItem={({ item }) => (
            <View style={styles.btn_view}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {setType(item.name); getData(item.name)}}
              >
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        /> 
        </View>
      : 
      <View style={{ flex: 1, backgroundColor: 'white' }}>
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
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
      }
    </View>
  );
};
       {/*<SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
      </SafeAreaView>*/}

      {/*<View style={{ flex: 1, backgroundColor: 'white' }}>
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
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>*/}

      {/*<View style={styles.body}> 
      {type === '' ? 
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
      null
      }
    </View>*/}
 

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

export default History;