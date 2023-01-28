import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { setBaseVehicle, setBaseVehicleType, setBaseFuel } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Baseline({ navigation }) {

    const { base_vehicle, base_vehicle_type, base_fuel } = useSelector(state => state.tripReducer);
    const dispatch = useDispatch();

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

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
    <View style={styles.body}>
        <Text style={styles.header_text}>Add Baseline</Text>
        <Text>Transportation method</Text>
        <SelectList
            boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
            setSelected={(val) => dispatch(setBaseVehicle(val))} 
            data={data} 
            save="value"
        />
        {base_vehicle === 'Car' ? 
            <View>
                <Text>Type of Car</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => dispatch(setBaseVehicleType(val))} 
                    data={data_1} 
                    save="value"
                />
                <Text>Type of fuel</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => dispatch(setBaseFuel(val))} 
                    data={data_2} 
                    save="value"
                />
            </View>
            : 
            null
        }
        {base_vehicle === 'Bus' ? 
            <View>
                <Text>Type of Bus</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => dispatch(setBaseVehicleType(val))} 
                    data={data_bus} 
                    save="value"
                />
                <Text>Type of fuel</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => dispatch(setBaseFuel(val))} 
                    data={data_2} 
                    save="value"
                />
            </View>
            : 
            null
        }
        {base_vehicle === 'Motorbike' ? 
            <View>
                <Text>Type of fuel</Text>
                <SelectList
                    boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
                    setSelected={(val) => dispatch(setBaseFuel(val))} 
                    data={data_2} 
                    save="value"
                />
            </View>
            : 
            null
        }
        <Button title='Save' onPress={() => navigation.goBack()} />
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