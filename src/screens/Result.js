import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert, Button, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEmission } from '../redux/actions';
import GlobalStyle from '../utils/GlobalStyle';
import CheckBox from '@react-native-community/checkbox';

export default function Result({ route, navigation }) {

  const { emission } = useSelector(state => state.tripReducer);
  const dispatch = useDispatch();

  let total_emission;

  useEffect(() => {
    dispatch(getEmission());
  }, []);

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
    <Button title='Done' onPress={() => {navigation.navigate('Home', { 
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