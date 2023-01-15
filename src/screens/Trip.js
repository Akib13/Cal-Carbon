import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from "react-native-modal";
import { SelectList } from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import { setTrips } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
// import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Trip({ navigation }) {

    const {trips, tripID} = useSelector(state => state.tripReducer);
    const dispatch = useDispatch();

    const [vehicle, setVehicle] = useState("");
    const [car, setCar] = useState("");
    const [fuel, setFuel] = useState("");
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [favorites, setFavorites] = useState(false);
    const [distance, setDistance] = useState('');

    const [test, setTest] = useState('');
  
    const data = [
        {key:'1', value:'Car'},
        {key:'2', value:'Bus'},
        {key:'3', value:'Train'},
        {key:'4', value:'Plane'},
        {key:'5', value:'Walk', disabled:true},
        {key:'6', value:'Bike'},
        {key:'7', value:'Motorbike'},
        {key:'8', value:'Moped'},
        {key:'9', value:'Other'},
    ];

    const data_1 = [
        {key:'1', value:'Small car'},
        {key:'2', value:'Medium car'},
        {key:'3', value:'Large car'},
        {key:'4', value:'Luxury car'},
        {key:'5', value:'Sports car'},
        {key:'6', value:'Pickup truck'},
        {key:'7', value:'Unknown'},
    ];

    const data_bus = [
        {key:'1', value:'City bus'},
        {key:'2', value:'Long Distance'}
    ];

    const data_2 = [
        {key:'1', value:'Petrol'},
        {key:'2', value:'Electricity'},
        {key:'3', value:'Other'},
    ];

    
    const Item = [
        {name: 'Work'},
        {name: 'Groceries'},
        {name: 'Travel'},
        {name: 'Gym'},
        {name: 'Other'},
    ];

    const [iname, setIName] = useState("Other");

    useEffect(() => {
        navigation.addListener('focus', ()=> {
            getTrip();
        });
    }, []);

    const getTrip = () => {
        const Trip = trips.find(trip => trip.ID === tripID);
        if (Trip) {
            setVehicle(Trip.Vehicle);
            setCar(Trip.Car);
            setFuel(Trip.Fuel);
            //setDate(Trip.Date);
            setTest(Trip.Test)
            setIName(Trip.iname);
        }
    };

    const setTrip = () => {
        if (vehicle.length == 0) {
            Alert.alert('warning', 'Please write your task title.')
        }
        else {
            try {
                var Trip = {
                    ID: tripID,
                    Vehicle: vehicle,
                    Car: car,
                    Fuel: fuel,
                    //Date: date,
                    Test: test,
                    Iname: iname,
                }
                const index = trips.findIndex(trip => trip.ID === tripID);
                let newTrips = [];
                if (index > -1) {
                    newTrips = [...trips];
                    newTrips[index] = Trip;
                } else {
                    newTrips = [...trips, Trip];
                }

                AsyncStorage.setItem('Trips', JSON.stringify(newTrips))
                .then(() => {
                    dispatch(setTrips(newTrips));
                    Alert.alert('Success!', 'Task saved successfully.');
                    setFavorites(false);
                    navigation.goBack();
                })
                .catch(error => console.log(error))
            } catch (error) {
                console.log(error);
            }
        }
    };


  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
    <View style={styles.body}>
        <Text style={styles.header_text}>Add new trip</Text>
        <Text>Transportation method</Text>
        <SelectList
            boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
            setSelected={(val) => setVehicle(val)} 
            data={data} 
            save="value"
        />
        {vehicle === 'Car' ? 
            <View>
                <Text>Type of Car</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => setCar(val)} 
                    data={data_1} 
                    save="value"
                />
                <Text>Type of fuel</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => setFuel(val)} 
                    data={data_2} 
                    save="value"
                />
                <Text>Number of Passengers</Text>
                <TextInput
                    style={styles.input}
                />
            </View>
            : 
            null
        }
        {vehicle === 'Bus' ? 
            <View>
                <Text>Type of Bus</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => setCar(val)} 
                    data={data_bus} 
                    save="value"
                />
                <Text>Type of fuel</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => setFuel(val)} 
                    data={data_2} 
                    save="value"
                />
                <Text>Number of Passengers</Text>
                <TextInput
                    style={styles.input}
                />
            </View>
            : 
            null
        }
        {vehicle === 'Motorbike' ? 
            <View>
                <Text>Type of fuel</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => setFuel(val)} 
                    data={data_2} 
                    save="value"
                />
                <Text>Number of Passengers</Text>
                <TextInput
                    style={styles.input}
                />
            </View>
            : 
            null
        }
        <Text>Departure address</Text>
        <View style={styles.date_view}>
            <TextInput style={{ width: '90%'}} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Map');
              }}
            >
              <FontAwesome5 
                  name={'map-marked-alt'}
                  size={28}
                  color={'#000'}
              />
            </TouchableOpacity>
        </View>
        
        <Text>Arrival address</Text>
        <View style={styles.date_view}>
            <TextInput style={{ width: '90%'}} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Map');
              }}
            >
              <FontAwesome5 
                  name={'map-marked-alt'}
                  size={28}
                  color={'#000'}
              />
            </TouchableOpacity>
        </View>
        <Text>Total distance</Text>
        <TextInput
            style={styles.input}
            value={distance}
            onChangeText={(value) => setDistance(value)}
        />
        <Text>Date of trip</Text>
        <View style={styles.date_view}>
            <TextInput editable={false} selectTextOnFocus={false} style={{ width: '90%'}} placeholder={String(date)} />
            <TouchableOpacity
              onPress={() => {
                setOpen(true);
              }}
            >
              <FontAwesome5 
                  name={'calendar-alt'}
                  size={28}
                  color={'#000'}
              />
            </TouchableOpacity>
            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    setTest(String(date))
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>

        <View style = {styles.checkbox}>
            <CheckBox 
                value={favorites}
                onValueChange={(newValue) => setFavorites(newValue)}
            />
            <Text style={styles.text}>
                Add to favorites
            </Text>
            {favorites ? 
                <Modal
                    isVisible={favorites}
                    >
                    <View style={{  height: '70%', backgroundColor: '#fff' }}>
                        <Text>Please select an appropriate type</Text>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={Item}
                            renderItem={({ item }) => (
                            <View>
                                <Text style={{ marginBottom: 10 }}
                                    onPress={() => {setIName(item.name)}} >
                                    {item.name}
                                </Text>
                            </View>
                        )}
                        />
                        <Text>{iname}</Text>
                        <Button title='OK' onPress={setTrip} />
                        <Button title='Cancel' onPress={() => {setFavorites(false)}}/>
                    </View>

                </Modal>
            :null
            }
        </View>
        <Button title='Calculate Emission' onPress={() => { navigation.navigate('Result',
            { 
                vehicle: vehicle,
                car: car,
                fuel: fuel,
                distance: distance
            })}} />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header_text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    input: {
        height: 40,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#fff',
        borderBottomColor: '#000',
    },
    date_view: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    checkbox: {
        flexDirection: 'row',
        margin: 10,
    },
    text: {
        fontSize: 20,
        color: '#000000',
    },

});
