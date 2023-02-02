import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from "react-native-modal";
import { SelectList } from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import { setTrips, getEmission, getFuels, getElectricity } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
// import RNFS from 'react-native-fs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import dayjs from 'dayjs';
import { CalculateTripEmissions } from '../utils/CalculateTripEmissions';
import { fuelTypes, carTypes, units, methods } from '../utils/Enums';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => {},
    error => {console.log(error)},
);



export default function Trip({ navigation }) {

    const { emission, trips, tripID, fuels, electricity } = useSelector(state => state.tripReducer);
    const dispatch = useDispatch();

    const [vehicle, setVehicle] = useState("");
    const [car, setCar] = useState("");
    const [fuel, setFuel] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [consumption, setConsumption] = useState("");
    const [passengers, setPassengers] = useState(1);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [favorites, setFavorites] = useState(false);
    const [distance, setDistance] = useState(0);
    const [iname, setIName] = useState("");
    const [fuelList, setFuelList] = useState(null);
    const [tripEmissions, setTripEmissions] = useState(0);

    const [test, setTest] = useState(""+date.toISOString().split('T')[0]);
    

    let total_emission;
  
    const data = [
        {key:'1', value: methods[1]},
        {key:'2', value: methods[2]},
        {key:'3', value: methods[3]},
        {key:'4', value: methods[4]},
        {key:'5', value: methods[5]},
        {key:'6', value: methods[6]},
        {key:'7', value: methods[7]},
        {key:'8', value: methods[8]},
        {key:'9', value: methods[9]},
        {key:'10', value: methods[10]},
    ];

    const carTypeData = [
        {key:'1', value: carTypes[1]},
        {key:'2', value: carTypes[2]},
        {key:'3', value: carTypes[3]},
        {key:'4', value: carTypes[4]},
        {key:'5', value: carTypes[5]},
    ];

    const fuelTypeData = [
        {key:'1', value: fuelTypes[1]},
        {key:'2', value: fuelTypes[2]},
        {key:'3', value: fuelTypes[3]},
    ];

    
    const Item = [
        {name: 'Work'},
        {name: 'Groceries'},
        {name: 'Travel'},
        {name: 'Gym'},
        {name: 'Other'},
    ];

    useEffect(() => {
        let temp = [];
        switch(fuelType){
            case fuelTypes[1]:
                temp = fuels.filter(val => val.unit == 3);
                break;
            case fuelTypes[2]:
                temp = fuels.filter(val => val.unit === 4);
                break;
            case fuelTypes[3]:
                temp = electricity;
                break;
            default:
                break;
        }
        let newFuelList = [];
        for(let i = 0; i<temp.length; i++){
            newFuelList.push(temp[i].fuel);
        }
        setFuelList(newFuelList);
    }, [fuelType]);

    useEffect(() => {
        let avgConsumption;
        if(vehicle === "Car" && car.length !== 0 && fuelType !== 0){
            console.log("arvot", vehicle, car, fuelType)
            let desiredUnit = 0
            switch(fuelType){
                case fuelTypes[1]:
                    desiredUnit = 5;
                    break;
                case fuelTypes[2]:
                    desiredUnit = 6;
                    break;
                case fuelTypes[3]:
                    desiredUnit = 7;
                    break;
            }
            console.log(car, desiredUnit);
            avgConsumption = emission.filter(x => x.method === car && x.unit === desiredUnit); 
            console.log(avgConsumption);
        } else {
            console.log("vehicle", vehicle);
            avgConsumption = emission.filter(x => x.method === vehicle); 
            console.log(avgConsumption);
        }
        setConsumption(avgConsumption.length !== 0 ? avgConsumption[0].fuelConsumption : 0);
        //console.log("Consumption set", avgConsumption[0].fuelConsumption);
    }, [vehicle, car, fuelType])
    

    useEffect(() => {
        /*navigation.addListener('focus', ()=> {
            getTrip();
        });*/
        dispatch(getEmission());
        createTable();
        dispatch(getFuels());
        dispatch(getElectricity());
        //date_converter();
        //getTrip();
    }, []);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Trips "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Vehicle TEXT, Vehicle_Type TEXT, Fuel TEXT, Distance INTEGER, Date TEXT, Category TEXT, Emission INTEGER);"
            )
        })
    };

    const getTrip = () => {
        /*const Trip = trips.find(trip => trip.ID === tripID);
        if (Trip) {
            setVehicle(Trip.Vehicle);
            setCar(Trip.Car);
            setFuel(Trip.Fuel);
            //setDate(Trip.Date);
            setTest(Trip.Test);
            setIName(Trip.Iname);*/
        //}
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT ID, Vehicle, Vehicle_Type, Fuel, Distance, Date, Category FROM Trips WHERE ID=1",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            //var DB_id = results.rows.item(0).ID;
                            var db_vehicle = results.rows.item(0).Vehicle;
                            var db_distance = results.rows.item(0).Distance;
                            var db_category = results.rows.item(0).Category;
                            var db_vehicleType = results.rows.item(0).Vehicle_Type;
                            var db_fuel = results.rows.item(0).Fuel;
                            var dbDate = results.rows.item(0).Date;
    
                            //setID(DB_id);
                            setVehicle(db_vehicle);
                            setDistance(db_distance);
                            setIName(db_category);
                            setFuel(db_fuel);
                            setCar(db_vehicleType);
                            setTest(dbDate);
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    };

    const setTrip = async () => {
        if (vehicle.length == 0) {
            Alert.alert('warning', 'Please write your task title.')
        }
        else {
            try {
                /*var Trip = {
                    ID: tripID,
                    Vehicle: vehicle,
                    Car: car,
                    Fuel: fuel,
                    //Date: date,
                    Test: test,
                    Iname: iname,
                }*/
                /*const index = trips.findIndex(trip => trip.ID === tripID);
                let newTrips = [];
                if (index > -1) {
                    newTrips = [...trips];
                    newTrips[index] = Trip;
                } else {
                    newTrips = [...trips, Trip];
                }*/

                /*AsyncStorage.setItem('Trips', JSON.stringify(newTrips))
                .then(() => {
                    dispatch(setTrips(newTrips));
                    Alert.alert('Success!', 'Task saved successfully.');
                    setFavorites(false);
                    navigation.goBack();
                })
                .catch(error => console.log(error))*/
                console.log("-----SETTING TRIP-------");
                console.log("Date: " + date);

                await db.transaction( async (tx) => {
                    await tx.executeSql(
                        "INSERT INTO Trips (Vehicle, Vehicle_Type, Fuel, Distance, Date, Category, Emission) VALUES (?,?,?,?,?,?,?)",
                        [vehicle, car, fuel, distance, test, iname, calculate()]
                    );
                })
                //navigation.navigate("Map");
            } catch (error) {
                console.log(error);
            }
        }
    };

    /*const date_converter = () => {
        var date_test = date;
        const new_date = date_test.toISOString().split('T')[0]; //date_test.toISOString().substring(0, 10);
        console.log(new_date);
        setTest(new_date);

        var d = date;
        d = new Date(d.getTime() - 3000000);
        var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
        console.log(date_format_str.substring(0,10));
    }*/

    const calculate = () => {
        let methodToFind = "";
        console.log("CALCULATING", fuel);
        if(vehicle === "Car"){
            methodToFind = car;
        }
        else {
            methodToFind = vehicle;
        }

        let desiredUnit = 0;
        let desiredFuel = "";
        switch(fuelType){
            case fuelTypes[1]:
                desiredUnit = 5;
                desiredFuel = fuels.filter(x => x.fuel === fuel);
                break;
            case fuelTypes[2]:
                desiredUnit = 6;
                console.log(fuels);
                desiredFuel = fuels.filter(x => x.fuel === fuel);
                console.log(desiredFuel);
                break;
            case fuelTypes[3]:
                desiredUnit = 7;
                desiredFuel = electricity.filter(x => x.fuel === fuel);
                break;
            default:
                desiredUnit = 0;
        }

        console.log(methodToFind, desiredUnit);
        const desired = emission.filter(x => x.method === methodToFind && x.unit === desiredUnit);
        console.log(desired[0]);
        if(desired.length === 0){
            //setTripEmissions(0);
            return 0;
        }

        let value = CalculateTripEmissions(methodToFind, desired[0].emissions, parseFloat(distance), parseInt(passengers), parseFloat(consumption), desiredFuel.length === 0 ? 0 : desiredFuel[0].emissions);
        //setTripEmissions(value);
        return value;
      };


  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
    <View style={styles.body}>
        <Text style={styles.header_text}>Add new trip</Text>
        <Text>Transportation method</Text>
        <SelectList
            boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
            setSelected={(val) => {
                setVehicle(val);
                setFuelType(0);
                setFuel("");
            }} 
            data={data} 
            save="value"
        />
        {vehicle === 'Car' ? 
            <View>
                <Text>Type of Car</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => setCar(val)} 
                    data={carTypeData} 
                    save="value"
                />
            </View> : null}
        {vehicle !== methods[1] && vehicle !== methods[2] && vehicle !== methods[8] && vehicle !== methods[9] && vehicle !== methods[10]? 
            <View>
                <Text>Type of fuel</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => {
                        setFuelType(val);
                        setFuel("");
                    }} 
                    data={fuelTypeData} 
                    save="value"
                />
                <Text>{fuelType === fuelTypes[3] ? "Fuel for generating electricity" : "Fuel"}</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => setFuel(val)} 
                    data={fuelList} 
                    save="value"
                />
                <Text>{`Consumption (${fuelType === fuelTypes[1] ? units[5] : fuelType === fuelTypes[2] ? units[6] : units[7]})`}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => setConsumption(val)}
                    defaultValue={consumption.toString()}
                    keyboardType="decimal-pad"
                    inputMode="decimal"
                />
                <Text>Number of Passengers</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => setPassengers(val.replace(/[^0-9]/g, ''))}
                    value={passengers}
                    keyboardType="decimal-pad"
                />
            </View>
        : 
        null
        }
        <Text>{"Total distance (km)"}</Text>
        <TextInput
            style={styles.input}
            value={distance}
            onChangeText={(value) => setDistance(value)}
            keyboardType="decimal-pad"
        />
        <Text>Date of trip</Text>
        <View style={styles.date_view}>
            <TextInput editable={false} selectTextOnFocus={false} style={{ width: '90%'}} placeholder={test} />
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
                    setDate(date)
                    //date_converter()
                    setTest(date.toISOString().split('T')[0])
                    setOpen(false)
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
                        <Button title='OK' onPress={() => {setFavorites(false)}} />
                        <Button title='Cancel' onPress={() => {setFavorites(false)}}/>
                    </View>

                </Modal>
            :null
            }
        </View>
        <View>
            <Text style={styles.result_text}>
                {vehicle.length !== 0 ? calculate(vehicle, car) : 0} g CO2 -ekv
            </Text>
        </View>
        <Button title='Save' onPress={() => { 
            setTrip();
            navigation.navigate('Result',
            { 
                vehicle: vehicle,
                car: car,
                fuel: fuel,
                distance: distance,
                total_emission: calculate(vehicle, car)
            });}} />
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
    result_text: {
        fontSize: 20
    }

});
