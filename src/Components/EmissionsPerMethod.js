import { View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

function formatEmissionsPerMethodData(data) {
    let finalData = [
      {
        name: "Bike",
        emissions: 0,
        color: "#0562f7",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Car",
        emissions: 0,
        color: "#f70d05",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Bus",
        emissions: 0,
        color: "#05f73e",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Train",
        emissions: 0,
        color: "#f7f705",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Airplane",
        emissions: 0,
        color: "#b705f7",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Moped",
        emissions: 0,
        color: "#f78e05",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Motorbike",
        emissions: 0,
        color: "#f705f3",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "E-Scooter",
        emissions: 0,
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
          finalData[0].emissions += row.emissions;
          break;
        case 'car':
          finalData[1].emissions += row.emissions;
          break;
        case 'bus':
          finalData[2].emissions += row.emissions;
          break;
        case 'train':
          finalData[3].emissions += row.emissions;
          break;
        case 'plane':
          finalData[4].emissions += row.emissions;
          break;
        case 'moped':
          finalData[5].emissions += row.emissions;
          break;
        case 'motorbike':
          finalData[6].emissions += row.emissions;
          break;
        case 'escooter':
          finalData[7].emissions += row.emissions;
          break;
        default:
          break;
      }
    }
  
    return(finalData);
  }
  

export default function EmissionsPerMethod({data, chartConfig}){
    let finaldata = [{}];
    finaldata = formatEmissionsPerMethodData(data);
    return (
        <View style={{backgroundColor: '#ffffff'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', marginTop: 10}}>Emissions per transportation method</Text>
            <PieChart
            style={{
                marginTop: 50
            }}
            data={finaldata}
            width={Dimensions.get("window").width}
            height={200}
            chartConfig={chartConfig}
            accessor={"emissions"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            avoidFalseZero={true}>    
            </PieChart>
        </View>
    );
}