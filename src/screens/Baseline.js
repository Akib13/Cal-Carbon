import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { getEmission, getElectricity, getFuels } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { fuelTypes, carTypes, units, methods, electricityFuels, liquidFuels, altFuels } from '../utils/Enums';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    (success) => {console.log("here", success.success)},
    error => {console.log("something went wrong", error)},
);

const createTable = async () => {
    console.log("Creating table")
    await db.transaction((tx) => {
         tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Baseline "
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Vehicle TEXT, Vehicle_Type TEXT, Fuel_Type TEXT, Fuel TEXT, Consumption TEXT, Passengers INTEGER, Emission TEXT, Fuel_Emission TEXT);",
            () => {console.log("DONE WITH table ")},
                error => {console.log(error)}
        );
    });
    console.log("TABLE CREATED")
     db.transaction((tx) => {
        tx.executeSql("SELECT count(*) FROM MainDB WHERE type='table'",
        (results) => {console.log("here", results)}
        )
    })
};


const updateData = (vehicle, vehicleType, fuelType, fuel, consumption, passengers, emissions, fuelEmissions, baselineExists) => {
    console.log("saving", vehicle, vehicleType, fuelType, fuel, consumption, passengers, emissions, fuelEmissions, baselineExists)
    db.transaction((tx) => {
        if(baselineExists){
            tx.executeSql(
                "UPDATE Baseline SET Vehicle=?, Vehicle_Type=?, Fuel_Type=?, Fuel=?, Consumption=?, Passengers=?, Emission=?, Fuel_Emission=? WHERE ID=1",
                [vehicle, vehicleType, fuelType, fuel, consumption, passengers, emissions, fuelEmissions],
                () => {console.log("Success!", "Your data has been updated.")},
                error => {console.log(error)}
            );
        } else {
            console.log("adding to db")
            tx.executeSql(
                "INSERT INTO Baseline ( Vehicle, Vehicle_Type, Fuel_Type, Fuel, Consumption, Passengers, Emission, Fuel_Emission) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [vehicle, vehicleType, fuelType, fuel, consumption, passengers, emissions, fuelEmissions],
                (tx, results) => {console.log("Results", results)},
                error => {console.log(error)}
            );
        }
    })
};

export default function Baseline({ navigation }) {

    const { emission, fuels, electricity } = useSelector(state => state.tripReducer);
    const dispatch = useDispatch();
    const [fuelData, setFuelData] = useState([]);
    const [fuelType, setFuelType] = useState(0);
    const [vehicle, setVehicle] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [fuel, setFuel] = useState("");
    const [consumption, setConsumption] = useState(0);
    const [passengers, setPassengers] = useState(1);
    const [baseLineExists, setBaselineExists] = useState(false);

    const getData = async () => {
        try {
            console.log("** GETTING DATA***");
           db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM Baseline",
                    [],
                    (tx, results) => {
                        console.log("RESULTS: ", results.rows.length)
                        var len = results.rows.length;
                        if (len > 0) {
                            setBaselineExists(true);
                            console.log("FOUND DATA");
                            //var DB_id = results.rows.item(0).ID;
                            var db_vehicle = results.rows.item(0).Vehicle;
                            var db_vehicleType = results.rows.item(0).Vehicle_Type;
                            var db_fueltype = results.rows.item(0).Fuel_Type;
                            var db_fuel = results.rows.item(0).Fuel;
                            var db_cons = results.rows.item(0).Consumption;
                            var dbpsg = results.rows.item(0).Passengers;
                            var dbemission = results.rows.item(0).Emission;
                            var dbfuelemission = results.rows.item(0).Fuel_Emission;
    
                            //setID(DB_id);
                            setVehicle(db_vehicle);
                            setVehicleType(db_vehicleType);
                            setFuel(db_fuel);
                            setFuelType(db_fueltype);
                            setConsumption(db_cons);
                            setPassengers(dbpsg);
                            console.log("*****DATA FROM DB******", db_vehicle, db_vehicleType, db_fueltype, db_fuel, db_cons, dbpsg, dbemission, dbfuelemission);
                        }else{
                            console.log("DIDN*T FIND DATA");
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    const methodsData = [
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

    useEffect(() => {
        createTable();
        getData();
        dispatch(getEmission());
        dispatch(getFuels());
        dispatch(getElectricity());
    }, []);

    useEffect(() => {
        console.log("Getting fuels", typeof(fuelType));
        let temp = [];
        switch(fuelType){
            case fuelTypes[1]:
            case "1":
            case 1:
                temp = fuels.filter(val => val.unit == 3);
                break;
            case fuelTypes[2]:
            case "2":
            case 2:
                temp = fuels.filter(val => val.unit === 4);
                break;
            case fuelTypes[3]:
            case "3":
            case 3:
                temp = electricity;
                break;
            default:
                break;
        }
        console.log(temp);
        let newFuelList = [];
        for(let i = 0; i<temp.length; i++){
            newFuelList.push({key: i.toString(), value: temp[i].fuel});
        }
        console.log(newFuelList);
        setFuelData(newFuelList);
    }, [fuelType])

    const saveBaselineMethod = () => {
        //save vehicle_type only for cars, otherwise empty the value
        if(vehicle !== methods[3]){
            setVehicleType('');
        }

        //change fueltype to electricity for electric bike and electric scooter
        if(vehicle === methods[4] || vehicle === methods[5]){
            setFuelType(fuelTypes[3]);
        }
        //reset fuel type only for all other methods except car, moped and motorbike
        else if(vehicle !== methods[3] || vehicle !== methods[6] || vehicle !== methods[7] ){
            console.log("Setting fueltype");
            setFuelType(fuelTypes[0]);
        }

        //save fuel only if it's relevant, otherwise clear the value
        if(vehicle !== methods[3] || vehicle !== methods[4] || vehicle !== methods[5] || vehicle !== methods[6] || vehicle !== methods[7] ){
            setFuel('');
        }

        //save consumption only if it's relevant, otherwise clear the value
        if(vehicle !== methods[3] || vehicle !== methods[4] || vehicle !== methods[5] || vehicle !== methods[6] || vehicle !== methods[7] ){
            setConsumption(0);
        }

        //save passengers only if it's relevant, otherwise clear the value
        if(vehicle !== methods[3] || vehicle !== methods[4] || vehicle !== methods[5] || vehicle !== methods[6] || vehicle !== methods[7] ){
            setPassengers(1);
        }
        
        let methodToFind = "";
        if(vehicle === "Car"){
            methodToFind = vehicleType;
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
                methodToFind = vehicle;
                break;
            default:
                desiredUnit = 0;
        }
        //console.log("Fuelemissions:", desiredFuel.length !== 0 ? desiredFuel[0].emissions : 0);
        
        const fuelEmissions = desiredFuel.length !== 0 ? desiredFuel[0].emissions : 0;
        console.log(methodToFind, desiredUnit, emission.filter(x => x.method === methodToFind && x.unit === desiredUnit));
        const emissions = emission.filter(x => x.method === methodToFind && x.unit === desiredUnit)[0].emissions;
        updateData(vehicle, vehicleType, fuelType, fuel, consumption, passengers, emissions, fuelEmissions, baseLineExists);
    }

    useEffect(() => {
        if(vehicle === methods[4] || vehicle === methods[5]){
            setFuelType(fuelTypes[3]);
        }

        let avgConsumption;
        if(vehicle === "Car" && vehicleType?.length !== 0 && fuelType !== 0){
            console.log("arvot", vehicle, vehicleType, fuelType)
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
            console.log(vehicleType, desiredUnit);
            if(desiredUnit === 7){
                avgConsumption = emission.filter(x => x.method === vehicle && x.unit === desiredUnit);     
            }
            else {
                avgConsumption = emission.filter(x => x.method === vehicleType && x.unit === desiredUnit); 
            }
            console.log(avgConsumption);
        } else {
            console.log("vehicle", vehicle);
            avgConsumption = emission.filter(x => x.method === vehicle); 
            console.log(avgConsumption);
        }
        setConsumption(avgConsumption.length !== 0 ? avgConsumption[0].fuelConsumption : 0);

        //console.log("Consumption set", avgConsumption[0].fuelConsumption);
    }, [vehicle, vehicleType, fuelType])

    useEffect(() => {
        if(vehicle === methods[4] || vehicleType === methods[5]){
            console.log("fuelType", fuelType);
            setFuelType(3);
            setFuel('');
            console.log("fuelType", fuelType);
        }
    }, [vehicle]);

    function getDefaultOption(list, defaultValue){
        console.log("Getting default:", list, defaultValue);
        let defaultkey = Object.keys(list).find(key => list[key] === defaultValue);
        let defaultOption = {key: defaultkey?.toString(), value: defaultValue?.toString()};
        console.log("Default option: ", defaultOption);
        return defaultOption;
    }

    function getConsumptionTitle(){
        console.log(fuelType === fuelTypes[1]);
        if(fuelType === 1 || fuelType === "1" || fuelType === fuelTypes[1]){
            return `Consumption (${units[5]})`
        }
        else if(fuelType === 2 || fuelType === "2" || fuelType === fuelTypes[2]){
            return `Consumption (${units[6]})`
        }
        else if(fuelType === 3 || fuelType === "3" || fuelType === fuelTypes[3]){
            return `Consumption (${units[7]})`
        }
        else {
            return "Consumption";
        }
    }

    console.log("Tiedot", vehicle, vehicleType, fuelType, fuel, consumption, passengers);

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
    <View style={styles.body}>
        <Text style={styles.header_text}>Add baseline</Text>
        <Text>Transportation method</Text>
        <SelectList
            boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
            setSelected={(val) => {
                console.log("CHOSEN: ", val)
                setVehicle(val)
            }} 
            data={methodsData} 
            save="value"
            placeholder={vehicle}
            value={() => getDefaultOption(methods, vehicle)}
        />
        {vehicle === methods[3] || vehicle === '3' ? 
            <View>
                <Text>Type of Car</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => setVehicleType(val)} 
                    data={carTypeData} 
                    save="value"
                    placeholder={vehicleType}
                    value={carTypeData.filter(x => x.value === vehicleType)}
                />
            </View>
            : 
            null
        }
        {vehicle === methods[3] || vehicle === methods[6] || vehicle === methods[7] ? 
            <View>
                <Text>Type of fuel</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => {setFuelType(val);}} 
                    data={fuelTypeData} 
                    save="value"
                    placeholder={fuelType}
                    defaultOption={() => fuelTypeData.filter(x => x.value === fuelType)}
                />
            </View> : null
            }
            {vehicle !== methods[1] && vehicle !== methods[2] && vehicle !== methods[4] && vehicle !== methods[5] && vehicle !== methods[8] && vehicle !== methods[9] && vehicle !== methods[10]? 
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
                    placeholder={fuelType}
                />
            </View>: null}
            {vehicle !== methods[1] && vehicle !== methods[2] && vehicle !== methods[8] && vehicle !== methods[9] && vehicle !== methods[10]? 
            <View>
                <Text>{getConsumptionTitle()}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => setConsumption(val)}
                    defaultValue={consumption.toString()}
                    value={consumption.toString()}
                    keyboardType="decimal-pad"
                    inputMode="decimal"
                />
                <Text>Number of Passengers</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => setPassengers(val)}
                    keyboardType="number-pad"
                    defaultValue={passengers.toString()}
                />
            </View>
        : 
        null
        }
        <Button title='Save' onPress={() => {
            saveBaselineMethod();
            navigation.goBack();
            }
        } />
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
});