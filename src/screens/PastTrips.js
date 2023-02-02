import { useEffect } from "react";
import { useState } from "react";
import { Alert, View, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import SQLite from 'react-native-sqlite-storage';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => {},
    error => {console.log(error)},
);


function PastTripListItem({trip}){
    const deleteTrip = (id) => {
        Alert.alert("U sure?", "bruh " + id);
        /*try {
            db.transaction((tx) => {
              tx.executeSql(
                `DELETE * FROM Trips where ID=?`,
                [id],
                (tx, results) => {
                  console.log(results);
                }
              );
            });
          } catch (error) {
              console.log(error);
          }*/
    };

    console.log(trip.Date, trip.Vehicle, trip.Distance, trip.Emission);

    return(
        <View style={{flexDirection: 'row', flexWrap: 'wrap',textAlign: 'center', borderWidth: 1, flex: 0.5, justifyContent: 'space-evenly'}}>
            <Text style={{margin: 5}}>{trip.Date ?? "Hi"}</Text>
            <Text style={{margin: 5}}>{trip.Vehicle ?? "Hi"}</Text>
            <Text style={{margin: 5}}>{trip.Distance ?? "Hi"}</Text>
            <Text style={{margin: 5}}>{trip.Emission ?? "Hi"}</Text>
            <TouchableOpacity style={{margin: 5}} onPress={() => {deleteTrip(trip.ID)}}>
                <FontAwesome5 
                    name={'trash'}
                    size={25}
                    color={'#ff3636'}
                />
            </TouchableOpacity>
        </View>
    );
}

export default function PastTrips(){

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            console.log("GETTING DATA");
            try {
              db.transaction((tx) => {
                tx.executeSql(
                  `SELECT * FROM Trips`,
                  [],
                  (tx, results) => {
                    let addition = [];
                    for(let i =0; i<results.rows.length; i++){
                      addition.push(results.rows.item(i));
                      setTrips(addition);
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
    }, [])

    return(
        <View>
            {trips.length === 0 ? <Text>No trips available</Text> : 
            <View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'space-evenly'}}>
                    <Text style={{margin: 5}}>Date</Text>
                    <Text style={{margin: 5}}>Method</Text>
                    <Text style={{margin: 5}}>Distance</Text>
                    <Text style={{margin: 5}}>Emissions</Text>
                    <Text style={{margin: 5}}>Delete</Text>
                </View>
                <ScrollView>
                    {trips.map((trip) => {return <PastTripListItem trip={trip} />})}
                </ScrollView>
            </View>}
        </View>
    );
}