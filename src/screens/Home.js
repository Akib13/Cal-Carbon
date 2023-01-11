import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, {useEffect} from 'react';
import CustomButton from '../utils/CustomButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { setTripID, setTrips } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {

  const {trips} = useSelector(state => state.tripReducer);//new
    const dispatch = useDispatch(); //new

    useEffect(() => { //new
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

  return (
    <View style={styles.body}>
      <View style={styles.text_view}>
        <Text style={styles.text}>
          What would you like to do?
        </Text>
      </View>
      <View style={styles.btn_view}>
        <View style={styles.btn_view_row}>
          <TouchableOpacity
            style={styles.button}
            data = {trips}
            onPress={() => {
                dispatch(setTripID(trips.length + 1)); //new
                navigation.navigate('Trip');
            }}
          >
            <FontAwesome5 
                name={'plus-circle'}
                size={60}
                color={'#0080ff'}
            />
            <Text>Add new journey</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.btn_view_row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                  navigation.navigate('History');
              }}
            >
              <FontAwesome5 
                  name={'history'}
                  size={60}
                  color={'#0080ff'}
              />
              <Text>Repeat journey</Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.text_view, {justifyContent: 'flex-start'}]}>
        <Text style={[styles.text, {fontSize: 20}]}>
            Your emissions this month is: X CO2e
          </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text_view: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    margin: 20,
  },
  btn_view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  btn_view_row: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    height: '50%',
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#0080ff',
    borderBottomWidth: 5,
  },
});