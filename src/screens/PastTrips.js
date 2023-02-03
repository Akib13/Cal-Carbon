import { useEffect } from "react";
import { useState } from "react";
import { Alert, View, Text, Modal, Button } from "react-native";
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


function PastTripListItem({trip, deleteTrip}){


    console.log(trip.Date, trip.Vehicle, trip.Distance, trip.Emission);
    console.log("Rendering trip", trip.ID)

    return(
        <View style={{flexDirection: 'row', flexWrap: 'wrap',textAlign: 'center', borderWidth: 1, flex: 0.5, justifyContent: 'space-evenly'}}>
            <Text style={{margin: 5, width: 60}}>{trip.Date}</Text>
            <Text style={{margin: 5, width: 70}}>{trip.Vehicle}</Text>
            <Text style={{margin: 5, width: 70}}>{trip.Distance} km</Text>
            <Text style={{margin: 5, width: 70}}>{trip.Emission} kg CO2e</Text>
            <TouchableOpacity style={{margin: 5}} onPress={() => {deleteTrip(trip.ID)}}>
                <FontAwesome5 
                    name={'trash'}
                    size={20}
                    color={'#ff3636'}
                />
            </TouchableOpacity>
        </View>
    );
}

export default function PastTrips(){

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const deleteTrip = (id) => {
        //Alert.alert("U sure?", "bruh " + deleting);
        console.log("deleting", id, trips[1].ID)
        const newList = trips;
        try {
            db.transaction((tx) => {
              tx.executeSql(
                `DELETE FROM Trips where ID=?`,
                [id],
                (tx, results) => {
                  console.log(newList.filter(x => x.ID !== id));
                  setTrips(newList.filter(x => x.ID !== id));
                }
              );
            });
          } catch (error) {
              console.log(error);
          }
    };


    useEffect(() => {
            console.log("GETTING DATA");
            try {
              db.transaction((tx) => {
                tx.executeSql(
                  `SELECT * FROM Trips`,
                  [],
                  (tx, results) => {
                    console.log("DONE", results.rows.length)
                    let addition = [];
                    for(let i =0; i<results.rows.length; i++){
                        console.log(results.rows.item(i));
                      addition.push(results.rows.item(i));
                    }
                    setTrips(addition);
                    console.log("setting to false")
                    console.log("REsults: " + JSON.stringify(addition)); //{"Category":"","Emission":1470,"Date":"2023-01-28","Fuel":"Petrol","Distance":15,"Vehicle_Type":"Small car","Vehicle":"Car","ID":1} 
                  }
                );
              });
            } catch (error) {
                console.log(error);
            }
    }, [])

        return(
            <View style={{backgroundColor: 'white'}}>
                {trips.length === 0 ? <Text>No trips available</Text> : 
                <View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'space-evenly'}}>
                        <Text style={{margin: 5, width: 70}}>Date</Text>
                        <Text style={{margin: 5, width: 70}}>Method</Text>
                        <Text style={{margin: 5, width: 70}}>Distance</Text>
                        <Text style={{margin: 5, width: 70}}>Emissions</Text>
                        <Text style={{margin: 5, width: 40}}>Delete</Text>
                    </View>
                    <ScrollView>
                        {trips.map((trip) => <PastTripListItem key={trip.ID} trip={trip} deleteTrip={deleteTrip} />)}
                    </ScrollView>
                </View>}
            </View>
        );
}