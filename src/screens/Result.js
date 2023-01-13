import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert, Button, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEmission } from '../redux/actions';
import GlobalStyle from '../utils/GlobalStyle';
import CheckBox from '@react-native-community/checkbox';

export default function Result({ route }) {

  const { emission } = useSelector(state => state.tripReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmission());
  }, [])


  const calculate = (test) => {
    let x = test;
    x=x*2;
    return (x);
  };

  return (
    <View style={styles.body}>
      <Text> {route.params.vehicle}, {route.params.car} </Text>
      <FlatList 
        data={emission}
        renderItem={({item, index}) => (
            <View>
              { item.vehicle === route.params.vehicle ? <Text>{calculate(item.emission)}</Text>: null}
            </View>
        )}
        keyExtractor={(item, index) => index.toString()}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
});