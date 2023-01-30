import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { setBaseVehicle, setBaseVehicleType, setBaseFuel, setBaseFuelType, setBaseEmission, setBaseConsumption, setBaseFuelEmission, getEmission, getElectricity, getFuels, setBasePassengers } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { fuelTypes, carTypes, units, methods, electricityFuels, liquidFuels, altFuels } from '../utils/Enums';

export default function Baseline({ navigation }) {

    const { base_vehicle, base_vehicle_type, base_fuel, emission, fuels, electricity, base_consumption, base_passengers, base_fuel_type, base_fuel_emission } = useSelector(state => state.tripReducer);
    const dispatch = useDispatch();
    const [fuelData, setFuelData] = useState([]);
    const [fuelType, setFuelType] = useState([]);
    const [vehicle, setVehicle] = useState(base_vehicle);
    const [vehicleType, setVehicleType] = useState(base_vehicle_type);
    const [fuel, setFuel] = useState(base_fuel);
    const [consumption, setConsumption] = useState(base_consumption);
    const [passengers, setPassengers] = useState(base_passengers);

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
        dispatch(getEmission());
        dispatch(getFuels());
        dispatch(getElectricity());
        console.log("BAse:", base_vehicle, base_vehicle_type, base_fuel_type, base_fuel, base_consumption, base_passengers, base_fuel_emission);
        setVehicle(base_vehicle);
        setVehicleType(base_vehicle_type);
        setFuelType(base_fuel_type);
        setFuel(base_fuel);
        setConsumption(base_consumption);
        setPassengers(base_passengers);
        console.log("After: ", vehicle, vehicleType, fuelType, fuel, consumption, passengers);
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
        dispatch(setBaseVehicle(vehicle));

        //save vehicle_type only for cars, otherwise empty the value
        if(vehicle === methods[3]){
            dispatch(setBaseVehicleType(vehicleType));
        }
        else {
            dispatch(setBaseVehicleType(''));
        }

        //save fuel type only for car, moped and motorbike
        if(vehicle === methods[3] || vehicle === methods[6] || vehicle === methods[7] ){
            dispatch(setBaseFuelType(fuelType));
        }
        //change fueltype to electricity for electric bike and electric scooter
        else if(vehicle === methods[4] || vehicle === methods[5]){
            dispatch(setBaseFuelType(3));
        }
        else {
            dispatch(setBaseFuelType(0));
        }

        //save fuel only if it's relevant, otherwise clear the value
        if(vehicle === methods[3] || vehicle === methods[4] || vehicle === methods[5] || vehicle === methods[6] || vehicle === methods[7] ){
            dispatch(setBaseFuel(fuel));
        }
        else {
            dispatch(setBaseFuel(''));
        }

        //save consumption only if it's relevant, otherwise clear the value
        if(vehicle === methods[3] || vehicle === methods[4] || vehicle === methods[5] || vehicle === methods[6] || vehicle === methods[7] ){
            dispatch(setBaseConsumption(parseFloat(consumption)));
        }
        else {
            dispatch(setBaseConsumption(0));
        }

        //save passengers only if it's relevant, otherwise clear the value
        if(vehicle === methods[3] || vehicle === methods[4] || vehicle === methods[5] || vehicle === methods[6] || vehicle === methods[7] ){
            dispatch(setBasePassengers(parseInt(passengers)));
        }
        else {
            dispatch(setBasePassengers(0));
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
        console.log("Fuelemissions:", desiredFuel.length !== 0 ? desiredFuel[0].emissions : 0);
        
        dispatch(setBaseFuelEmission(desiredFuel.length !== 0 ? desiredFuel[0].emissions : 0));
        console.log(methodToFind, desiredUnit, emission.filter(x => x.method === methodToFind && x.unit === desiredUnit));
        dispatch(setBaseEmission(emission.filter(x => x.method === methodToFind && x.unit === desiredUnit)[0].emissions));
    }

    useEffect(() => {
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
        let defaultkey = Object.keys(list).find(key => list[key] === defaultValue);
        let defaultOption = {key: defaultkey?.toString(), value: defaultValue?.toString()};
        return defaultOption;
    }

    function getConsumptionTitle(){
        console.log(fuelType === fuelTypes[1]);
        if(fuelType === 0){
            return "Consumption";
        }

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
            return "Error";
        }
    }

    //console.log("Tiedot", vehicle, vehicleType, fuelType, fuel, consumption, passengers);

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
    <View style={styles.body}>
        <Text style={styles.header_text}>Add Baseline</Text>
        <Text>Transportation method</Text>
        <SelectList
            boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
            setSelected={setVehicle} 
            data={methodsData} 
            save="value"
            defaultOption={getDefaultOption(methods, base_vehicle)}
        />
        {vehicle === methods[3] || vehicle === '3' ? 
            <View>
                <Text>Type of Car</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => setVehicleType(val)} 
                    data={carTypeData} 
                    save="value"
                    defaultOption={getDefaultOption(carTypes, base_vehicle_type)}
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
                    setSelected={(val) => {
                        setFuelType(val);
                    }} 
                    data={fuelTypeData} 
                    save="value"
                    defaultOption={getDefaultOption(fuelTypes, base_fuel_type)}
                />
            </View> : null
            }
            {vehicle === methods[3] || vehicle === methods[4] || vehicle === methods[5] || vehicle === methods[6] || vehicle === methods[7] ? 
            <View>
                <Text>{fuelType === fuelTypes[3] ? "Fuel for generating electricity" : "Fuel"}</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => setFuel(val)} 
                    data={fuelData} 
                    save="value"
                    defaultOption={getDefaultOption(base_fuel_type === fuelTypes[1] ? liquidFuels : base_fuel_type === fuelTypes[2] ? altFuels : electricityFuels, base_fuel)}
                />
                <Text>{getConsumptionTitle()}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => setConsumption(val)}
                    defaultValue={base_consumption.toString()}
                    value={consumption.toString()}
                    keyboardType="decimal-pad"
                    inputMode="decimal"
                />
                <Text>Number of Passengers</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => setPassengers(val)}
                    keyboardType="number-pad"
                    defaultValue={base_passengers.toString()}
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