import { View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { methods } from "../utils/Enums";

function formatEmissionsPerMethodData(data, finalData) {
    const length = data.length;

    for (let i = 0; i < length; i++){
      let row = data[i];
  
      switch(row.Vehicle){
        case methods[1]:
          console.log(finalData[0]);
          finalData[0].emissions += row.Emission;
          break;
        case methods[2]:
          finalData[1].emissions += row.Emission;
          break;
        case methods[3]:
          finalData[2].emissions += row.Emission;
          break;
        case methods[4]:
          finalData[3].emissions += row.Emission;
          break;
        case methods[5]:
          finalData[4].emissions += row.Emission;
          break;
        case methods[6]:
          finalData[5].emissions += row.Emission;
          break;
        case methods[7]:
          finalData[6].emissions += row.Emission;
          break;
        case methods[8]:
          finalData[7].emissions += row.Emission;
          break;
        case methods[9]:
          finalData[8].emissions += row.Emission;
          break;
        case methods[10]:
          finalData[9].emissions += row.Emission;
          break;
        case methods[11]:
          finalData[10].emissions += row.Emission;
          break;
        default:
          break;
      }
    }

    const cleaned = finalData.filter(x => x.emissions !== 0);
  
    return(cleaned);
  }
  

export default function EmissionsPerMethod({data, chartConfig, loading}){
  let finalData = [
    {
      name: methods[1],
      emissions: 0,
      color: "#0562f7",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: methods[2],
      emissions: 0,
      color: "#f70d05",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: methods[3],
      emissions: 0,
      color: "#05f73e",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: methods[4],
      emissions: 0,
      color: "#f7f705",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: methods[5],
      emissions: 0,
      color: "#b705f7",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: methods[6],
      emissions: 0,
      color: "#f78e05",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: methods[7],
      emissions: 0,
      color: "#f705f3",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: methods[8],
      emissions: 0,
      color: "#2d05f7",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: methods[9],
      emissions: 0,
      color: "#f7f705",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: methods[10],
      emissions: 0,
      color: "#b705f7",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: methods[11],
      emissions: 0,
      color: "#f78e05",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];
  if(!loading){
    finalData = formatEmissionsPerMethodData(data, finalData);
  }
    return (
        <View style={{backgroundColor: '#ffffff'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', marginTop: 10}}>Emissions per transportation method</Text>
            {loading === true ? <View height={250}></View> : <PieChart
            style={{
                marginTop: 50
            }}
            data={finalData}
            width={Dimensions.get("window").width}
            height={200}
            chartConfig={chartConfig}
            accessor={"emissions"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            avoidFalseZero={true}>    
            </PieChart>}
        </View>
    );
}