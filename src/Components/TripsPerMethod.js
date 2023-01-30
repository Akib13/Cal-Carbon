import { View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

function formatTripsPerMethodData(data) {
    let finalData = [
      {
        name: "Bike",
        trips: 0,
        color: "#0562f7",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Car",
        trips: 0,
        color: "#f70d05",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Bus",
        trips: 0,
        color: "#05f73e",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Train",
        trips: 0,
        color: "#f7f705",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Airplane",
        trips: 0,
        color: "#b705f7",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Moped",
        trips: 0,
        color: "#f78e05",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Motorbike",
        trips: 0,
        color: "#f705f3",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "E-Scooter",
        trips: 0,
        color: "#2d05f7",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
    ];
  
    const length = data.length;
    console.log(length);
    for (let i = 0; i < length; i++){
      let row = data[i];
  
      switch(row.vehicle_type){
        case 'electricbike':
          console.log(finalData[0]);
          finalData[0].trips += row.trips;
          break;
        case 'car':
          finalData[1].trips += row.trips;
          break;
        case 'bus':
          finalData[2].trips += row.trips;
          break;
        case 'train':
          finalData[3].trips += row.trips;
          break;
        case 'plane':
          finalData[4].trips += row.trips;
          break;
        case 'moped':
          finalData[5].trips += row.trips;
          break;
        case 'motorbike':
          finalData[6].trips += row.trips;
          break;
        case 'escooter':
          finalData[7].trips += row.trips;
          break;
        default:
          break;
      }
    }
  
    return(finalData);
  }

  const perMethodData = [
    {
      name: "Walk",
      trips: 10,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Bike",
      trips: 50,
      color: "#01781d",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Car",
      trips: 52,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Bus",
      trips: 8,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Train",
      trips: 2,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

export default function TripsPerMethod({data, chartConfig}){
    let finaldata = [{}];
    finaldata = formatTripsPerMethodData(data);
    return (
        <View>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', marginTop: 10}}>Trips per transportation method</Text>
          <PieChart
          style={{
              marginTop: 50
            }}
            data={perMethodData}
            width={Dimensions.get("window").width}
            height={200}
            chartConfig={chartConfig}
            accessor={"trips"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute={true}>    
          </PieChart>
        </View>);
}