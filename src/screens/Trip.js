import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';


export default function Trip({ navigation }) {

    const [selected, setSelected] = useState("");
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [favorites, setFavorites] = useState(false);
  
  const data = [
      {key:'1', value:'Car'},
      {key:'2', value:'Bus'},
      {key:'3', value:'Train'},
      {key:'4', value:'Plain', disabled:true},
      {key:'5', value:'Walk', disabled:true},
      {key:'6', value:'Bike'},
      {key:'7', value:'Other'},
  ]

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
    <View style={styles.body}>
        <Text style={styles.header_text}>Add new trip</Text>
        <Text>Transportation method</Text>
        <SelectList
            boxStyles={{ borderColor:'#fff', borderBottomColor: '#000', borderRadius: 0, marginBottom: 10 }}
            setSelected={(val) => setSelected(val)} 
            data={data} 
            save="value"
        />
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
                  color={'#0080ff'}
              />
            </TouchableOpacity>
        </View>
        
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
                  color={'#0080ff'}
              />
            </TouchableOpacity>
        </View>
        <Text>Total distance</Text>
        <TextInput
            style={styles.input}
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
                  color={'#0080ff'}
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
        </View>
        <Button title='Calculate Emission' onPress={() => {navigation.navigate('Result')}} />
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