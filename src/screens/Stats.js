import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
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

export default function Stats() {

  const [emission, setEmission] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Trips",
          [],
          (tx, results) => {
            var temp = 0;
            for (let i = 0; i < results.rows.length; ++i){
              temp += results.rows.item(i).Emission;
            }
            setEmission(temp);
          }
        );
      });
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Your total emission</Text>
      <Text style={styles.text}>{emission}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});