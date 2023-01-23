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

function renderGraph(choice, timeFrame, data){
    console.log(timeFrameEnum[timeFrame]);

    switch(choice) {
        case 'pie':
          return (<EmissionsPerMethod data={data} chartConfig={chartConfig} />);
        case 'bar':
          return(<EmissionsByTime data={data} chartConfig={chartConfig} timeFrame={timeFrame} />);
          case 'km':
            return(<TotalKilometers data={data} chartConfig={chartConfig} timeFrame={timeFrame} />);
          case 'em':
            return(<EmissionsVsBaseline data={data} chartConfig={chartConfig}/>);
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
    {vehicle_type: 'car', emissions: 50, date: '2022-11-20'},
    {vehicle_type: 'plane', emissions: 120, date: '2022-11-25'},
    {vehicle_type: 'car', emissions: 60, date: '2022-12-02'},
    {vehicle_type: 'car', emissions: 500, date: '2022-12-20'},
    {vehicle_type: 'train', emissions: 50, date: '2022-12-31'},
    {vehicle_type: 'escooter', emissions: 50, date: '2023-01-01'},
    {vehicle_type: 'moped', emissions: 20, date: '2023-01-01'},
    {vehicle_type: 'motorbike', emissions: 10, date: '2023-01-10'},
    {vehicle_type: 'motorbike', emissions: 70, date: '2023-01-15'},
    {vehicle_type: 'plane', emissions: 500, date: '2023-01-15'},
    {vehicle_type: 'car', emissions: 50, date: '2023-01-16'},
    {vehicle_type: 'electricbike', emissions: 50, date: '2023-01-16'},
    {vehicle_type: 'car', emissions: 50, date: '2023-01-17'},
    {vehicle_type: 'car', emissions: 35, date: '2023-01-17'},
    {vehicle_type: 'train', emissions: 50, date: '2023-01-18'},
    {vehicle_type: 'train', emissions: 50, date: '2023-01-18'},
    {vehicle_type: 'escooter', emissions: 50, date: '2023-01-20'},
    {vehicle_type: 'motorbike', emissions: 50, date: '2023-01-20'},
    {vehicle_type: 'walk', emissions: 50, date: '2023-01-21'},
    {vehicle_type: 'bike', emissions: 50, date: '2023-01-22'}
  ]
    return(
        <View>
            {renderGraph(choice, timeFrame, testdata)}
        </View>
        )
}

export default GraphView;