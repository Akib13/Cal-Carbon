/*import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Map() {
  return (
    <View>
      <Text>Map</Text>
    </View>
  )
}

const styles = StyleSheet.create({})*/

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  TextInput
} from 'react-native';
import CustomButton from '../utils/CustomButton';
import GlobalStyle from '../utils/GlobalStyle';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
      name: 'MainDB',
      location: 'default',
  },
  () => {},
  error => {console.log(error)},
);

export default function Map({ navigation }) {

  const [id, setID] = useState('');
  const [vehicle, setVehicle] = useState("");
  const [car, setCar] = useState("");
  const [fuel, setFuel] = useState("");
  const [distance, setDistance] = useState('');
  const [iname, setIName] = useState("");
  const [emission, setEmission] = useState('');
  const [date, setDate] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT ID, Vehicle, Vehicle_Type, Fuel, Distance, Date, Category, Emission FROM Trips WHERE ID=1",
                [],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        var DB_id = results.rows.item(0).ID;
                        var userName = results.rows.item(0).Vehicle;
                        var userAge = results.rows.item(0).Distance;
                        var db_category = results.rows.item(0).Category;
                        var vehicleType = results.rows.item(0).Vehicle_Type;
                        var fuel = results.rows.item(0).Fuel;
                        var dbDate = results.rows.item(0).Date;
                        var DBemission = results.rows.item(0).Emission;

                        setID(DB_id);
                        setVehicle(userName);
                        setDistance(userAge);
                        setIName(db_category);
                        setFuel(fuel);
                        setCar(vehicleType);
                        setDate(dbDate);
                        setEmission(DBemission);
                    }
                }
            )
        })
    } catch (error) {
        console.log(error);
    }
};

  return (
    <View>
      <Text>{id}, {vehicle}, {car}, {fuel}, {distance}, {iname}, {date}, {emission}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})