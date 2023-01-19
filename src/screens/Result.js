import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert, Button, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEmission } from '../redux/actions';
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

export default function Result({ route, navigation }) {

  const { emission } = useSelector(state => state.tripReducer);
  const dispatch = useDispatch();

  const [Id, setID] = useState('');

  let total_emission;

  useEffect(() => {
    dispatch(getEmission());
    getData();
  }, []);

  const getData = () => {
    try {
        db.transaction((tx) => {
            /*tx.executeSql(
                "SELECT ID, Vehicle, Vehicle_Type, Fuel, Distance, Category FROM Trips",
                [],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        var DB_id = results.rows.item(0).ID;
                        var vehicle = results.rows.item(0).Vehicle;
                        var distance = results.rows.item(0).Distance;
                        var db_category = results.rows.item(0).Category;
                        var vehicleType = results.rows.item(0).Vehicle_Type;
                        var fuel = results.rows.item(0).Fuel;
                        //var DBemission = results.rows.item(0).Emission;

                        setID(DB_id);
                        setVehicle(vehicle);
                        setDistance(distance);
                        setIName(db_category);
                        setFuel(fuel);
                        setCar(vehicleType);
                    }
                }
            )*/
            tx.executeSql(
              "SELECT ID FROM Trips WHERE Vehicle=? AND Vehicle_Type=? AND Fuel=?",
              [route.params.vehicle, route.params.car, route.params.fuel],
              (tx, results) => {
                  var len = results.rows.length;
                  if (len > 0) {
                      var DB_id = results.rows.item(0).ID;
                      setID(DB_id);
                  }
              }
          )
        })
    } catch (error) {
        console.log(error);
    }
  };

  const updateData = async () => {
    if (route.params.vehicle.length == 0) {
        Alert.alert("Warning!", "Please provide your name");
    }
    else {
        try {
            /*var user = {
                Name: name
            }
            await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
            Alert.alert("Success!", "Your data has been updated.");*/
            db.transaction((tx)=> {
                tx.executeSql(
                    "UPDATE Trips SET Emission=? WHERE ID=?",
                    [total_emission, Id],
                    () => {Alert.alert("Success!", "Your data has been updated.")},
                    error => {console.log(error)}
                )
            })
            
        } catch (error) {
            console.log(error);
        }
    }
  };

  const calculate = (base_emission) => {
    const distance = route.params.distance, avg_emission = base_emission, passengers = 1;
    total_emission = (distance * avg_emission)/passengers;
    return (total_emission);
  };

  return (
    <View style={styles.body}>
      <Text style={styles.top_text}>Emissions for your trip</Text>
      <Text style={styles.mid_text}>Total Emissions</Text>
      {emission.map((item, id) => {
        key={id}
        //console.log(item, id);
        return (
          <View key={id}>
            { item.vehicle === route.params.vehicle &&
              item.vehicle_type === route.params.car &&
              item.fuel_type === route.params.fuel
              ?
                <View>
                  <Text style={styles.result_text}>
                    {calculate(item.emission)} g CO2 -ekv
                  </Text>
                </View>
              : null}
          </View>
        )
      })}
    <Button title='save' onPress={updateData}/>
    <Button title='Done' onPress={() => {navigation.navigate('Map', { 
      emsn: total_emission
      })}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent: 'center',
  },
  top_text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: "25%",
  },
  mid_text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  result_text: {
    fontSize: 18,
    marginBottom: '5%'
  }
});