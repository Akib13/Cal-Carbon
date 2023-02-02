import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert, Button, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEmission } from '../redux/actions';
import GlobalStyle from '../utils/GlobalStyle';
import CheckBox from '@react-native-community/checkbox';
import SQLite from 'react-native-sqlite-storage';
import { CalculateTripEmissions } from '../utils/CalculateTripEmissions';

const db = SQLite.openDatabase(
  {
      name: 'MainDB',
      location: 'default',
  },
  () => {},
  error => {console.log(error)},
);

export default function Result({ route, navigation }) {

  const { emission, base_vehicle, base_vehicle_type, base_fuel, base_emission, base_fuel_emission, base_consumption, base_passengers } = useSelector(state => state.tripReducer);
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
            console.log("Saving data");
            db.transaction((tx)=> {
                tx.executeSql(
                    "UPDATE Trips SET Emission=? WHERE ID=?",
                    [route.params.total_emission, Id],
                    () => {Alert.alert("Success!", "Your data has been updated.")},
                    error => {console.log(error)}
                );
                tx.executeSql('SELECT * FROM Trips', [], (tx, results) => {
                  for (let i = 0; i < results.rows.length; i++){
                      console.log(JSON.stringify(results.rows.item(i)));
                  }    
              }
              );
            })
            
        } catch (error) {
            console.log(error);
        }
    }
  };

  const comparisonOfResults = () => {
    const baselineEmissions = calculate_base();
    const actualEmissions = parseFloat(route.params.total_emission)
    console.log(route.params.total_emission, baselineEmissions)
    if(actualEmissions < baselineEmissions){
      return(
        <View style={styles.result_container} borderColor="green">
          <Text>You saved {baselineEmissions - actualEmissions} kg of CO2e emissions during this trip. Good job!</Text>
        </View>

      );
    } else if(actualEmissions > baselineEmissions){
      return(
        <View style={styles.result_container} borderColor="red">
          <Text style={{textAlign: 'center', textShadowColor: "black", textShadowOffset: {width: 1, height: 1}}}>You emitted {actualEmissions - baselineEmissions} kg more of CO2e during this trip than you would have using your baseline method. Try to stick to less emitting methods next time!</Text>
        </View>
      );
    } else {
      return(
        <View style={styles.result_container} borderColor="green">
          <Text>Your emisions were equal to your baseline method emissions. Good job!</Text>
        </View>
      );
    }
  }


  const calculate_base = () => {
    //get type of car in case base_vehicle is simply car, use base_vechicle in other cases
    const baselineMethod = base_vehicle_type.length === 0 ? base_vehicle : base_vehicle_type;
    return CalculateTripEmissions(baselineMethod, base_emission, route.params.distance, base_passengers, base_consumption, base_fuel_emission);
  }

  return (
    <View style={styles.body}>
      <Text style={styles.top_text}>Emissions for your trip</Text>
      <Text style={styles.mid_text}>Total Emissions</Text>
      <View>
        <Text style={styles.result_text}>
          {route.params.total_emission} g CO2 -ekv
        </Text>
      </View>
      <Text style={styles.mid_text}>Baseline Emissions</Text>
      <View>
        <Text style={styles.result_text}>
          {calculate_base()} g CO2 -ekv
        </Text>
      </View>
      <View>
        {comparisonOfResults()}
      </View>
    <Button title='Done' onPress={() => {
      updateData();
      navigation.navigate('Map')}}/>
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
    marginBottom: "15%",
  },
  mid_text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  result_text: {
    fontSize: 18,
    marginBottom: '10%'
  },
  result_container: {
    fontSize: 15,
    borderWidth: 1,
    padding: 5,
    marginBottom: "5%"
  }
});