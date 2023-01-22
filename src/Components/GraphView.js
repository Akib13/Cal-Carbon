import { useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { PieChart, BarChart, ContributionGraph } from 'react-native-chart-kit';
import TimeFramePicker , {timeFrameEnum} from './TimeFramePicker';
import TestGraph from './TestGraph';

const data = [
    {
      name: "Walk",
      emissions: 0,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Bike",
      emissions: 0,
      color: "#01781d",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Car",
      emissions: 5276,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Bus",
      emissions: 853,
      color: "#92d4a4",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Train",
      emissions: 50,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 0, 0, 0, 0, 0],
        colors: [
          (opacity = 1) => '#BE95FF',
          (opacity = 1) => '#fcba03',
          (opacity = 1) => '#fc0303',
          (opacity = 1) => '#035efc',
          (opacity = 1) => '#c203fc',
          (opacity = 1) => '#fc03be',
        ]
      }
    ]
  };

  const kmData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [200, 40, 280, 150, 99, 143],
        colors: [
          (opacity = 1) => '#BE95FF',
          (opacity = 1) => '#fcba03',
          (opacity = 1) => '#fc0303',
          (opacity = 1) => '#035efc',
          (opacity = 1) => '#c203fc',
          (opacity = 1) => '#fc03be',
        ]
      }
    ]
  };

  const baselineData = [
      {date: "2022-01-09", count: 0}, 
      {date: "2022-01-10", count: 0},
      {date: "2022-01-11", count: 1},
      {date: "2022-01-12", count: 0.5},
      {date: "2022-01-13", count: 1},
      {date: "2022-01-14", count: 0.2},
      {date: "2022-01-15", count: 0.2}
    ];

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

  const chartConfig={
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    barPercentage: 0.5,
    fillShadowGradientFromOpacity: 0,
    fillShadowGradientFromOpacity: 0,
    fillShadowGradientOpacity: 0,
    fillShadowGradient: "#c2cbd1",
    color: (opacity = 1) => {return opacity <= 0.2 ? `rgba(11, 252, 3, ${opacity})` : `rgba(219, 12, 4, ${opacity})`},
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  const baselineDataColors = ["red", "green"];

function renderGraph(choice, timeFrame){
    console.log(timeFrameEnum[timeFrame]);

    switch(choice) {
        case 'pie':
          return (
            <View style={{backgroundColor: '#ffffff'}}>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', marginTop: 10}}>Emissions per transportation method</Text>
              <PieChart
              style={{
                  marginTop: 50
                }}
                data={data}
                width={Dimensions.get("window").width}
                height={200}
                chartConfig={chartConfig}
                accessor={"emissions"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                avoidFalseZero={true}>    
              </PieChart>
            </View>);
        case 'bar':
          console.log("Martin on paras");
          return(
            <View>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', marginTop: 10}}>Total emissions this year</Text>
              <BarChart
                style={{
                  marginTop: 80,
                  alignItems: 'center'
                }}
                data={barData}
                width={Dimensions.get("window").width -20}
                height={220}
                yAxisLabel="g CO2e"
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                withCustomBarColorFromData={true}
                fromZero={true}
                flatColor={true}
              />
            </View>);
          case 'km':
            return(
              <View>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', marginTop: 10}}>Total kilometers travelled this year</Text>
                <BarChart
                  style={{
                    marginVertical: 50,
                    alignItems: 'center'
                  }}
                  data={kmData}
                  width={Dimensions.get("window").width - 20}
                  height={220}
                  yAxisLabel="km "
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                  withCustomBarColorFromData={true}
                  fromZero={true}
                  showBarTops={false}
                />
              </View>);
          case 'em':
            return(
            <TestGraph chartConfig={chartConfig}/>
            );
          case 'tripsPerMethod':
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
}

function GraphView({choice}){

    const [timeFrame, setTimeFrame] = useState(1);
    console.log(timeFrame);

    return(
        <View>
            {renderGraph(choice, timeFrame)}
            <TimeFramePicker choice={(x) => setTimeFrame(x)} chosen={timeFrame} />
        </View>
        )
}

export default GraphView;