import { useEffect, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { getWeekEmissions, getMonthEmissions, getThreeMonthsEmissions, getSixMonthsEmissions, getYearEmissions } from './EmissionsByTime';
import isoWeek from "dayjs/plugin/isoWeek";
import dayjs from 'dayjs';
import { CalculateTripEmissions } from '../utils/CalculateTripEmissions';
import {  getEmission, getElectricity, getFuels, setBasePassengers } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { methods } from '../utils/Enums';


function getWeekBLEmissions(days, data, baselineMethod){
  let tempData = [0, 0, 0, 0, 0, 0, 0];
  console.log("Calculating weekly data", data.length, baselineMethod);

  for(let i = 0; i<data.length; i++){
    console.log("data i",data[i].Distance)
    if(data[i].Date === days[0].format("YYYY-MM-DD")){
      tempData[0] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(data[i].Date === days[1].format("YYYY-MM-DD")){
      tempData[1] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(data[i].Date === days[2].format("YYYY-MM-DD")){
      tempData[2] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(data[i].Date === days[3].format("YYYY-MM-DD")){
      tempData[3] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(data[i].Date === days[4].format("YYYY-MM-DD")){
      tempData[4] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(data[i].Date === days[5].format("YYYY-MM-DD")){
      tempData[5] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(data[i].Date === days[6].format("YYYY-MM-DD")){
      tempData[6] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
      
    }
    else {
      console.log(`Error: Couldn't fit data to any day of the week. Date: ${data[i].Date}, method: ${data[i].vehicle_type}, emissions: ${data[i].emissions}`)
    }
  }
  return(tempData);
}

function getMonthBLEmissions(weeks, data, baselineMethod){
  let tempData = [0, 0, 0, 0];

  for(let i = 0; i < data.length; i++){
    let week = dayjs(data[i].Date).isoWeek();

    if(week === weeks[0]){
      tempData[0] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(week === weeks[1]){
      tempData[1] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(week === weeks[2]){
      tempData[2] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(week === weeks[3]){
      tempData[3] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else {
      //console.log(`Error: Couldn't fit data to any day of the week. Date: ${data[i].Date}, method: ${data[i].vehicle_type}, emissions: ${data[i].emissions}`)
    }
  }
  return(tempData);
}

function getThreeMonthsBLEmissions(months, data, baselineMethod){
  let tempData = [0, 0, 0];

  for(let i = 0; i < data.length; i++){
    const month = dayjs(data[i].Date).month();

    if(month === months[0]){
      tempData[0] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[1]){
      tempData[1] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[2]){
      tempData[2] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else {
      console.log(`Error: Couldn't fit data to any month. Date: ${data[i].Date}, method: ${data[i].vehicle_type}, emissions: ${data[i].emissions}`)
    }
  }
  return tempData;
}

function getSixMonthsBLEmissions(months, data, baselineMethod){
  let tempData = [0, 0, 0, 0, 0, 0];

  for(let i = 0; i < data.length; i++){
    const month = dayjs(data[i].Date).month();

    if(month === months[0]){
      tempData[0] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[1]){
      tempData[1] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[2]){
      tempData[2] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[3]){
      tempData[3] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[4]){
      tempData[4] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[5]){
      tempData[5] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else {
      console.log(`Error: Couldn't fit data to any month. Date: ${data[i].Date}, method: ${data[i].vehicle_type}, emissions: ${data[i].emissions}`)
    }
  }
  return tempData;
}

function getYearBLEmissions(months, data, baselineMethod){
  let tempData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for(let i = 0; i < data.length; i++){
    const month = dayjs(data[i].Date).month();

    if(month === months[0]){
      tempData[0] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[1]){
      tempData[1] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[2]){
      tempData[2] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[3]){
      tempData[3] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[4]){
      tempData[4] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[5]){
      tempData[5] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[6]){
      tempData[6] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[7]){
      tempData[7] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[8]){
      tempData[8] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[9]){
      tempData[9] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[10]){
      tempData[10] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else if(month === months[11]){
      tempData[11] += parseFloat(CalculateTripEmissions(baselineMethod.vehicle, baselineMethod.emissions, data[i].Distance, baselineMethod.passengers, baselineMethod.consumption, baselineMethod.fuelEmissions)) / 1000;
    }
    else {
      console.log(`Error: Couldn't fit data to any month. Date: ${data[i].Date}, method: ${data[i].vehicle_type}, emissions: ${data[i].emissions}`)
    }
  }
  return tempData;
}

function getEmissionComparison(emissions, baselineEmissions){
  let result = [];
  for (let i = 0; i < emissions.length; i++){
    console.log(emissions[i], baselineEmissions[i]);
    result.push(emissions[i] /1000 - baselineEmissions[i]);
  }
  console.log(result)
  return result;
}

function getBaselineComparisonData(data, timeFrame, baselineMethod, barData){
  let emissions = [];
  let baselineEmissions = [];
    
    switch(timeFrame){
      case 1:
        let days = [
          dayjs().subtract(6, 'days'),
          dayjs().subtract(5, 'days'),
          dayjs().subtract(4, 'days'),
          dayjs().subtract(3, 'days'),
          dayjs().subtract(2, 'days'),
          dayjs().subtract(1, 'days'),
          dayjs()
        ];
        barData.labels = [
          days[0].format('ddd'),
          days[1].format('ddd'),
          days[2].format('ddd'),
          days[3].format('ddd'),
          days[4].format('ddd'),
          days[5].format('ddd'),
          days[6].format('ddd')
        ];
        emissions = getWeekEmissions(days, data);
        console.log("Week emissions", emissions);
        baselineEmissions = getWeekBLEmissions(days, data, baselineMethod);
        console.log(baselineEmissions);
        break;
      case 2:
        dayjs.extend(isoWeek);
        const weeks = [
          dayjs().subtract(3, 'weeks').isoWeek(),
          dayjs().subtract(2, 'weeks').isoWeek(),
          dayjs().subtract(1, 'weeks').isoWeek(),
          dayjs().isoWeek()
        ]
        barData.labels = [
          "Week " + weeks[0],
          "Week " + weeks[1],
          "Week " + weeks[2],
          "Week " + weeks[3]
        ];

        emissions = getMonthEmissions(weeks, data);
        baselineEmissions = getMonthBLEmissions(weeks, data, baselineMethod);
        break;
      case 3:
        let threeMonths = [
          dayjs().subtract(2, 'month').month(),
          dayjs().subtract(1, 'month').month(),
          dayjs().month(),
        ]
        barData.labels = [
          dayjs().subtract(2, 'month').format('MMMM'),
          dayjs().subtract(1, 'month').format('MMMM'),
          dayjs().format('MMMM'),
        ];
        emissions = getThreeMonthsEmissions(threeMonths, data);
        baselineEmissions = getThreeMonthsBLEmissions(threeMonths, data, baselineMethod);
        break;
      case 4:
        let sixMonths = [
          dayjs().subtract(5, 'month').month(),
          dayjs().subtract(4, 'month').month(),
          dayjs().subtract(3, 'month').month(),
          dayjs().subtract(2, 'month').month(),
          dayjs().subtract(1, 'month').month(),
          dayjs().month(),
        ]
        barData.labels = [
          dayjs().subtract(5, 'month').format('MMM'),
          dayjs().subtract(4, 'month').format('MMM'),
          dayjs().subtract(3, 'month').format('MMM'),
          dayjs().subtract(2, 'month').format('MMM'),
          dayjs().subtract(1, 'month').format('MMM'),
          dayjs().format('MMM'),
        ];
        emissions = getSixMonthsEmissions(sixMonths, data);
        baselineEmissions = getSixMonthsBLEmissions(sixMonths, data, baselineMethod);
        break;
      case 5:
        let year = [
          dayjs().subtract(11, 'month').month(),
          dayjs().subtract(10, 'month').month(),
          dayjs().subtract(9, 'month').month(),
          dayjs().subtract(8, 'month').month(),
          dayjs().subtract(7, 'month').month(),
          dayjs().subtract(6, 'month').month(),
          dayjs().subtract(5, 'month').month(),
          dayjs().subtract(4, 'month').month(),
          dayjs().subtract(3, 'month').month(),
          dayjs().subtract(2, 'month').month(),
          dayjs().subtract(1, 'month').month(),
          dayjs().month(),
        ];

        barData.labels = [
          dayjs().subtract(11, 'month').format('MMM'),
          dayjs().subtract(10, 'month').format('MMM'),
          dayjs().subtract(9, 'month').format('MMM'),
          dayjs().subtract(8, 'month').format('MMM'),
          dayjs().subtract(7, 'month').format('MMM'),
          dayjs().subtract(6, 'month').format('MMM'),
          dayjs().subtract(5, 'month').format('MMM'),
          dayjs().subtract(4, 'month').format('MMM'),
          dayjs().subtract(3, 'month').format('MMM'),
          dayjs().subtract(2, 'month').format('MMM'),
          dayjs().subtract(1, 'month').format('MMM'),
          dayjs().format('MMM'),
        ];

        emissions = getYearEmissions(year, data);
        baselineEmissions = getYearBLEmissions(year, data, baselineMethod);
        break;
    }

    barData.datasets[0].data = getEmissionComparison(emissions, baselineEmissions);
    barData.datasets[0].data.forEach(number => {
      number.toFixed(2)
    });
    console.log(barData)
    return(barData);

}

const chartConfig={
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2,
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


export default function EmissionsVsBaseline({data, timeFrame, loading}){
  let finalData = {
    labels: [],
    datasets: [
      {
        data: [],
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
    const { base_vehicle, base_consumption, base_passengers, base_emission, base_fuel_emission } = useSelector(state => state.tripReducer);
    const [baselineMethod, setBaselineMethod] = useState({vehicle: base_vehicle, emissions: base_emission, consumption: base_consumption, fuelEmissions: base_fuel_emission, passengers: base_passengers});
    
    
    if(loading === false){
      finalData = getBaselineComparisonData(data, timeFrame, baselineMethod, finalData);
    }

    return(
      <View>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', marginTop: 10}}>Total emissions this year</Text>
        <Text style={{textAlign: "left", fontSize: 12, marginLeft: 2, marginBottom: 2, marginTop: 50, color: "black"}}>g CO2e</Text>
        {loading !== true ? <BarChart
          style={{
            alignItems: 'center'
          }}
          data={finalData}
          width={Dimensions.get("window").width -20}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          withCustomBarColorFromData={true}
          flatColor={true}
        /> : null}
      </View>);
}