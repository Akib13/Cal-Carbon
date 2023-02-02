import { View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { timeFrameEnum } from "../utils/Enums";
import { methods } from "../utils/Enums";

function formatTripsPerMethodData(data) {
    let finalData = [
      {
        name: methods[1],
        trips: 0,
        color: "#fcba03",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: methods[2],
        trips: 0,
        color: "#fc0303",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: methods[3],
        trips: 0,
        color: "#035efc",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: methods[4],
        trips: 0,
        color: "#c203fc",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: methods[5],
        trips: 0,
        color: "#fc03be",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: methods[6],
        trips: 0,
        color: "#07faa5",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: methods[7],
        trips: 0,
        color: "#fa9107",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: methods[8],
        trips: 0,
        color: "#024545",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: methods[9],
        trips: 0,
        color: "#450222",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: methods[10],
        trips: 0,
        color: "#b7ff0f",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: methods[11],
        trips: 0,
        color: "#c22362",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
    ];
  
    const length = data.length;
    console.log(length);
    for (let i = 0; i < length; i++){
      let row = data[i];
  
      switch(row.Vehicle){
        case methods[1]:
          console.log(finalData[0]);
          finalData[0].trips++;
          break;
        case methods[2]:
          finalData[1].trips++;
          break;
        case methods[3]:
          finalData[2].trips++;
          break;
        case methods[4]:
          finalData[3].trips++;
          break;
        case methods[5]:
          finalData[4].trips++;
          break;
        case methods[6]:
          finalData[5].trips++;
          break;
        case methods[7]:
          finalData[6].trips++;
          break;
        case methods[8]:
          finalData[7].trips++;
          break;
        case methods[9]:
          finalData[8].trips++;
          break;
        case methods[10]:
          finalData[7].trips++;
          break;
        case methods[11]:
          finalData[7].trips++;
          break;
        default:
          break;
      }
    }
  
    const cleaned = finalData.filter(x => x.trips !== 0);
    return(cleaned);
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

export default function TripsPerMethod({data, chartConfig, timeFrame}){
    let finaldata = [{}];
    finaldata = formatTripsPerMethodData(data);
    return (
        <View>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', marginTop: 10}}>Trips per transportation method</Text>
          {finaldata.length !== 0 ? <PieChart
          style={{
              marginTop: 50
            }}
            data={finaldata}
            width={Dimensions.get("window").width}
            height={200}
            chartConfig={chartConfig}
            accessor={"trips"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute={true}>    
          </PieChart> : <View height="250"><Text>No data available</Text></View>}
        </View>);
}