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

export default function Stats() {

  const [emission, setEmission] = useState('');
  const [choice, setChoice] = useState('pie');
  const [timeFrame, setTimeFrame] = useState(1);
  const endDate = dayjs().format();
  const [startDate, setStartDate] = useState(dayjs().subtract(6, 'days').format());
  const [showTimePicker, setShowTimePicker] = useState(true);

  useEffect(() => {
    console.log("Getting data between " + startDate + " and " + endDate);
    getData();
  }, [startDate]);

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM Trips where Date between '${startDate}' and '${endDate}'`,
          [],
          (tx, results) => {
            setEmission(results);
            console.log("REsults: " + JSON.stringify(results));
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
        break;
      default:
        setShowTimePicker(true);
    }
  }, [choice]);

  useEffect(() => {
    switch(timeFrame) {
      case 1:
        setStartDate(dayjs().subtract(6, 'days').format());
        break;
      case 2:
        setStartDate(dayjs().subtract(1, 'month').format());
        break;
      case 3:
        setStartDate(dayjs().subtract(3, 'month').format());
        break;
      case 4:
        setStartDate(dayjs().subtract(6, 'month').format());
        break;
      case 5:
        setStartDate(dayjs().subtract(1, 'year').format());
        break;
    }
  }, [timeFrame]);

  return (
    <View style={{backgroundColor: '#ffffff', height: '100%'}}>
      <View style={{marginTop: 20, alignContent: 'flex-start'}}>
          <View style={{zIndex: 1}}>
              <DropdownMenu choice={setChoice}/>
          </View>
          <GraphView choice={choice} timeFrame={timeFrame}/>
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