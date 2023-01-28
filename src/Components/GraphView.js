import { View } from 'react-native';
import {timeFrameEnum} from '../utils/TimeFramePicker';
import EmissionsPerMethod from './EmissionsPerMethod';
import EmissionsByTime from './EmissionsByTime';
import TotalKilometers from './TotalKilometers';
import EmissionsVsBaseline from './EmissionsVsBaseline';
import TripsPerMethod from './TripsPerMethod';
import TripsByTime from './TripsByTime';
import AverageEmissions from './AverageEmissions';

  const baselineData = [
      {date: "2022-01-09", count: 0}, 
      {date: "2022-01-10", count: 0},
      {date: "2022-01-11", count: 1},
      {date: "2022-01-12", count: 0.5},
      {date: "2022-01-13", count: 1},
      {date: "2022-01-14", count: 0.2},
      {date: "2022-01-15", count: 0.2}
    ];

function buildChartConfig(timeFrame){
  const chartConfig={
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 2,
    barPercentage: 1,
    fillShadowGradientFromOpacity: 0,
    fillShadowGradientFromOpacity: 0,
    fillShadowGradientOpacity: 0,
    fillShadowGradient: "#c2cbd1",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  if(timeFrame === 5){
    chartConfig.barPercentage = 0.4;
  }

  return(chartConfig)

}
  
function renderGraph(choice, timeFrame, data){
    console.log(timeFrameEnum[timeFrame]);

    const chartConfig = buildChartConfig(timeFrame);

    switch(choice) {
        case 'pie':
          return (<EmissionsPerMethod data={data} chartConfig={chartConfig} />);
        case 'bar':
          return(<EmissionsByTime data={data} chartConfig={chartConfig} timeFrame={timeFrame} />);
          case 'km':
            return(<TotalKilometers data={data} chartConfig={chartConfig} timeFrame={timeFrame} />);
          case 'em':
            return(<EmissionsVsBaseline data={data} chartConfig={chartConfig} timeFrame={timeFrame}/>);
          case 'tripsPerMethod':
            return(<TripsPerMethod data={data} chartConfig={chartConfig}/>);
          case 'numberOfTrips':
            return(<TripsByTime data={data} chartConfig={chartConfig} timeFrame={timeFrame} />);
          case 'averageEmissions':
            return(<AverageEmissions data={data} chartConfig={chartConfig} timeFrame={timeFrame} />);
    }
}

function GraphView({choice, timeFrame}){
  let testdata = [
    {vehicle_type: 'car', emissions: 50, date: '2022-11-20', distance: 300},
    {vehicle_type: 'plane', emissions: 120, date: '2022-11-25', distance: 300},
    {vehicle_type: 'car', emissions: 60, date: '2022-12-02', distance: 300},
    {vehicle_type: 'car', emissions: 500, date: '2022-12-20', distance: 300},
    {vehicle_type: 'train', emissions: 50, date: '2022-12-31', distance: 300},
    {vehicle_type: 'escooter', emissions: 50, date: '2023-01-01', distance: 300},
    {vehicle_type: 'moped', emissions: 20, date: '2023-01-01', distance: 100},
    {vehicle_type: 'motorbike', emissions: 10, date: '2023-01-10', distance: 9.8},
    {vehicle_type: 'motorbike', emissions: 70, date: '2023-01-15', distance: 85},
    {vehicle_type: 'plane', emissions: 500, date: '2023-01-15', distance: 65.4},
    {vehicle_type: 'car', emissions: 50, date: '2023-01-16', distance: 2.45},
    {vehicle_type: 'electricbike', emissions: 50, date: '2023-01-16', distance: 4},
    {vehicle_type: 'car', emissions: 50, date: '2023-01-17', distance: 43.5},
    {vehicle_type: 'car', emissions: 35, date: '2023-01-17', distance: 16},
    {vehicle_type: 'train', emissions: 50, date: '2023-01-18', distance: 746},
    {vehicle_type: 'train', emissions: 50, date: '2023-01-18', distance: 4},
    {vehicle_type: 'escooter', emissions: 50, date: '2023-01-20', distance: 8},
    {vehicle_type: 'motorbike', emissions: 50, date: '2023-01-20', distance: 37},
    {vehicle_type: 'bus', emissions: 50, date: '2022-02-21', distance: 60},
    {vehicle_type: 'moped', emissions: 50, date: '2022-03-21', distance: 70},
    {vehicle_type: 'moped', emissions: 50, date: '2022-04-21', distance: 30.8756},
    {vehicle_type: 'train', emissions: 50, date: '2022-05-21', distance: 38},
    {vehicle_type: 'car', emissions: 50, date: '2022-06-21', distance: 3},
    {vehicle_type: 'plane', emissions: 50, date: '2022-07-21', distance: 13},
    {vehicle_type: 'walk', emissions: 50, date: '2022-08-21', distance: 34.1},
    {vehicle_type: 'escooter', emissions: 50, date: '2022-09-21', distance: 36},
    {vehicle_type: 'motorbike', emissions: 50, date: '2022-10-21', distance: 200},
    {vehicle_type: 'train', emissions: 50, date: '2022-11-21', distance: 100},
    {vehicle_type: 'car', emissions: 50, date: '2022-03-21', distance: 330},
    {vehicle_type: 'bike', emissions: 50, date: '2023-01-22', distance: 30}
  ]
    return(
        <View>
            {renderGraph(choice, timeFrame, testdata)}
        </View>
        )
}

export default GraphView;