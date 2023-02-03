import DropdownMenu, { graphOptions } from '../Components/DropDownMenu';
import GraphView from '../Components/GraphView';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import TimeFramePicker from '../utils/TimeFramePicker';
import dayjs from 'dayjs';

const db = SQLite.openDatabase(
  {
      name: 'MainDB',
      location: 'default',
  },
  () => {},
  error => {console.log(error)},
);

export default function Stats({ navigation }) {

  const [emission, setEmission] = useState('');
  const [choice, setChoice] = useState('pie');
  const [timeFrame, setTimeFrame] = useState(1);
  const endDate = dayjs().format('YYYY-MM-DD');
  const [startDate, setStartDate] = useState(dayjs().subtract(6, 'days').format('YYYY-MM-DD'));
  const [previousStartDate, setPrevousStartDate] = useState(dayjs().subtract(7, 'days').format('YYYY-MM-DD'));
  const [showTimePicker, setShowTimePicker] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log(startDate, previousStartDate, startDate !== previousStartDate);
    if(previousStartDate !== startDate){
      console.log("Getting data between " + startDate + " and " + endDate);
      getData();
      setPrevousStartDate(startDate);
    }
  }, [startDate]);

  const getData = () => {
    console.log("GETTING DATA");
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM Trips where Date between '${startDate}' and '${endDate}'`,
          [],
          (tx, results) => {
            let addition = [];
            for(let i =0; i<results.rows.length; i++){
              addition.push(results.rows.item(i));
              setEmission(addition);
            }
            console.log(emission[0]);
            setLoading(false);
            console.log("REsults: " + JSON.stringify(addition)); //{"Category":"","Emission":1470,"Date":"2023-01-28","Fuel":"Petrol","Distance":15,"Vehicle_Type":"Small car","Vehicle":"Car","ID":1} 
          }
        );
      });
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    setTimeFrame(1);
    switch(choice){
      case graphOptions[5].key:
      case graphOptions[6].key:
        setShowTimePicker(false);
        setTimeFrame(5);
        break;
      default:
        setShowTimePicker(true);
    }
  }, [choice]);

  useEffect(() => {
    switch(timeFrame) {
      case 1:
        setStartDate(dayjs().subtract(6, 'days').format('YYYY-MM-DD'));
        break;
      case 2:
        setStartDate(dayjs().subtract(1, 'month').format('YYYY-MM-DD'));
        break;
      case 3:
        setStartDate(dayjs().subtract(3, 'month').format('YYYY-MM-DD'));
        break;
      case 4:
        setStartDate(dayjs().subtract(6, 'month').format('YYYY-MM-DD'));
        break;
      case 5:
        setStartDate(dayjs().subtract(1, 'year').format('YYYY-MM-DD'));
        break;
    }
  }, [timeFrame]);


  return (
    <View style={{backgroundColor: '#ffffff', height: '100%'}}>
      <View style={{marginTop: 20, alignContent: 'flex-start'}}>
          <View style={{zIndex: 1}}>
              <DropdownMenu choice={setChoice}/>
          </View>
          <GraphView choice={choice} timeFrame={timeFrame} data={emission} loading={loading}/>
          {showTimePicker === true ? <TimeFramePicker choice={(x) => setTimeFrame(x)} chosen={timeFrame} /> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});