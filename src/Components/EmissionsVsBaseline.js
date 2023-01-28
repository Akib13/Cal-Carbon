import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useEffect, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getWeekEmissions, getMonthEmissions, getThreeMonthsEmissions, getSixMonthsEmissions, getYearEmissions } from './EmissionsByTime';
import { getWeekKms } from './TotalKilometers';
import SQLite from 'react-native-sqlite-storage';
import dayjs from 'dayjs';

const db = SQLite.openDatabase(
  {
      name: 'MainDB',
      location: 'default',
  },
  () => {},
  error => {console.log(error)},
);

const baselineData = [
    {date: "2022-01-09", count: 0, value: -0.5}, 
    {date: "2022-01-10", count: 0, value: 0},
    {date: "2022-01-11", count: 1, value: 1},
    {date: "2022-01-12", count: 0.5, value: 0.5},
    {date: "2022-01-13", count: 1, value: 1},
    {date: "2022-01-14", count: 0, value: null},
    {date: "2022-01-15", count: 0.2, value: 0.2}
];

function getFuelData(fuel){
  fetch("http://localhost:3000/api/fuel", {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  }).then((response) => {
    console.log(response);})
}

function getBaselineEmissionForTrip(distance, method){
  console.log("==== BASELINE EMISSIONS ====");
  let emissions = 0;
  switch(method){
    case 'bus':
    case 'train':
    case 'plane':
      emissions = distance * method.emissions;
      break;
    case 'walk':
    case 'bike':
      break;
    default:
      let fuel = getFuelData(method.fuel);
      let methodEmissions = getMethodEmissionsData(method.fuel);
      emissions = distance * methodEmissions.emissions / method.passengers + distance * method.consumption * fuel.emissions;
      break;

  }
}

function getWeekBLEmissions(days, distances, baselineMethod){
  let tempData = [0, 0, 0, 0, 0, 0, 0];

  for(let i = 0; i<distances.length; i++){
    console.log(distances[i].date);
    console.log(days[0]);
    if(distances[i].date === days[0].format("YYYY-MM-DD")){
      tempData[0] += getBaselineEmissionForTrip(distances[0], baselineMethod);
    }
    else if(distances[i].date === days[1].format("YYYY-MM-DD")){
      tempData[1] += getBaselineEmissionForTrip(distances[1], baselineMethod);
    }
    else if(distances[i].date === days[2].format("YYYY-MM-DD")){
      tempData[2] += getBaselineEmissionForTrip(distances[2], baselineMethod);
    }
    else if(distances[i].date === days[3].format("YYYY-MM-DD")){
      tempData[3] += getBaselineEmissionForTrip(distances[3], baselineMethod);
    }
    else if(distances[i].date === days[4].format("YYYY-MM-DD")){
      tempData[4] += getBaselineEmissionForTrip(distances[4], baselineMethod);
    }
    else if(distances[i].date === days[5].format("YYYY-MM-DD")){
      tempData[5] += getBaselineEmissionForTrip(distances[5], baselineMethod);
    }
    else if(distances[i].date === days[6].format("YYYY-MM-DD")){
      tempData[6] += getBaselineEmissionForTrip(distances[6], baselineMethod);
      
    }
    else {
      console.log(`Error: Couldn't fit data to any day of the week. Date: ${distances[i].date}, method: ${distances[i].vehicle_type}, emissions: ${distances[i].emissions}`)
    }
  }
  return(tempData);
}

function totalEmissions(data){
  let total = 0;
  for(let i=0; i<data.length; i++){
    total += data[i].emissions;
  }
  return total;
}

function totalDistance(data){
  let total = 0;
  for(let i=0; i<data.length; i++){
    total += data[i].distance;
  }
  return total;
}

function getBaselineComparisonData(data, timeFrame, baselineMethod){
  let emissions = [];
  let distances = [];
  let baselineEmissions = [];
  let barData = {
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
        console.log("here we go");
        emissions = getWeekEmissions(days, data);
        distances = getWeekKms(days, data);
        baselineEmissions = getWeekBLEmissions(days, distances, baselineMethod);

        barData.datasets[0].data = getEmissionComparison(emissions, baselineEmissions);
        barData.datasets[0].data.forEach(number => {
          number.toFixed(2)
        });
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

        barData.datasets[0].data = getMonthEmissions(weeks, data);
        barData.datasets[0].data.forEach(number => {
          number.toFixed(2)
        });
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
        barData.datasets[0].data = getThreeMonthsEmissions(threeMonths, data);
        barData.datasets[0].data.forEach(number => {
          number.toFixed(2)
        });
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
        barData.datasets[0].data = getSixMonthsEmissions(sixMonths, data);
        barData.datasets[0].data.forEach(number => {
          number.toFixed(2)
        });
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

        barData.datasets[0].data = getYearEmissions(year, data);
        barData.datasets[0].data.forEach(number => {
          number = number.toFixed(2)
        });
        break;
    }
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

function InfoBlock(day) {
    console.log(day.value);
    const teksti = day.value === undefined ? null : day.value >= 0 ? `${day.date}: Emissions were ${day.value}% more than baseline.` : `${day.date}: Emissions were ${day.value}% less than baseline.`;
    return(
    <View>
        {day.value !== null ? <Text>{teksti}</Text> : null}
        {(day.value !== null && day.value !== undefined && day.value <= 0) ? <Text>Good job!</Text> : null}
        {(day.value !== null && day.value !== undefined && day.value > 0) ? <Text>Try to stick to your baseline method more often.</Text> : null}
        {(day.value !== null && day.value !== undefined) ? null : <Text>No data available.</Text>}
    </View>
    );
}

export default function EmissionsVsBaseline({data, timeFrame}){
    const [open, setOpen] = useState(false);
    const [day, setDay] = useState(null);
    const [baselineMethod, setBaselineMethod] = useState({});

    useEffect(() => {
      try {
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM Baseline where Status = 1`,
            [],
            (tx, results) => {
              setBaselineMethod(results);
              console.log("REsults: " + JSON.stringify(results));
            }
          );
        });
      } catch (error) {
          console.log(error);
      }
    })

    const finalData = getBaselineComparisonData(data, timeFrame, baselineMethod);

            return(
              <View>
                <View style={{flexDirection: 'row'}}>
                {open && <View style={{backgroundColor: '#8a8a8a', padding: 5, borderRadius: 5, marginTop: 35, marginHorizontal: 10, position: 'absolute', zIndex: 1, width: Dimensions.get("window").width - 20}}>
                    <Text style={{color: '#ffffff'}}>This graph shows your emissions compared to the baseline you have chosen.{'\n'}The darker the red color, the more your emissions are higher than if you had used your baseline method for all travels.{'\n'}Clicking the squares shows more information!</Text>
                  </View>}
                  <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', marginTop: 10, marginLeft: 20, alignItems: 'baseline'}}>Emissions compared to baseline</Text>
                  <TouchableOpacity onPress={() => setOpen(!open)} >
                    <FontAwesome5 name='exclamation-circle' size={20} style={{margin: 10, color: 'black'}} />
                  </TouchableOpacity>
                </View>
                <ContributionGraph
                style={{
                  marginTop: 80
                }}
                values={baselineData}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={chartConfig}
                endDate={"2022-01-27"}
                numDays={30}
                onDayPress={(day) => setDay(day)}
              />
              {day && InfoBlock(day)}
            </View>);
}