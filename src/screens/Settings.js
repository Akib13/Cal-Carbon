import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => {},
    error => {console.log(error)},
);

export default function Settings({ navigation }) {

  const onPressHandler = () => {
    navigation.navigate('Baseline');
  };

  const onPressDelete = () => {
    const del = SQLite.deleteDatabase(
      {name: 'MainDB', location: 'default'},  
      () => { console.log('db deleted');  },
      error => {
          console.log("ERROR: " + error); 
      }
      );
  };

  

  return (
    <View style={styles.body}>
      <View style={styles.page_view}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DefaultMethod')}
        >
          <Text style={styles.text}>Default Method</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressHandler}
        >
          <Text style={styles.text}>Baseline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PastTrips')}
        >
          <Text style={styles.text}>Modify past trips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressDelete}
        >
          <Text style={[styles.text, {color: '#f22'}]}>Reset all data</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  page_view: {
    margin: '15%',
  },
  button: {
    height: '15%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: '5%'
  },
  text: {
    fontSize: 20,
  },
});
