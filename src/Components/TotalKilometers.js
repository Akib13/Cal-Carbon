import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

export function getWeekKms(days, data){
  let tempData = [0, 0, 0, 0, 0, 0, 0];

  for(let i = 0; i<data.length; i++){
    console.log(data[i].date);
    console.log(days[0]);
    if(data[i].date === days[0].format("YYYY-MM-DD")){
      tempData[0] += data[i].distance;
    }
    else if(data[i].date === days[1].format("YYYY-MM-DD")){
      tempData[1] += data[i].distance;
    }
    else if(data[i].date === days[2].format("YYYY-MM-DD")){
      tempData[2] += data[i].distance;
    }
    else if(data[i].date === days[3].format("YYYY-MM-DD")){
      tempData[3] += data[i].distance;
    }
    else if(data[i].date === days[4].format("YYYY-MM-DD")){
      tempData[4] += data[i].distance;
    }
    else if(data[i].date === days[5].format("YYYY-MM-DD")){
      tempData[5] += data[i].distance;
    }
    else if(data[i].date === days[6].format("YYYY-MM-DD")){
      tempData[6] += data[i].distance;
    }
    else {
      console.log(`Error: Couldn't fit data to any day of the week. Date: ${data[i].date}, method: ${data[i].vehicle_type}, distance: ${data[i].distance}`)
    }
  }
  return(tempData);
}

export function getMonthKms(weeks, data){
  let tempData = [0, 0, 0, 0];

  for(let i = 0; i < data.length; i++){
    let week = dayjs(data[i].date).isoWeek();
    console.log(week);
    console.log(weeks[0]);
    if(week === weeks[0]){
      tempData[0] += data[i].distance;
    }
    else if(week === weeks[1]){
      tempData[1] += data[i].distance;
    }
    else if(week === weeks[2]){
      tempData[2] += data[i].distance;
    }
    else if(week === weeks[3]){
      tempData[3] += data[i].distance;
    }
    else {
      console.log(`Error: Couldn't fit data to any day of the week. Date: ${data[i].date}, method: ${data[i].vehicle_type}, distance: ${data[i].distance}`)
    }
  }
  return(tempData);
}

export function getThreeMonthsKms(months, data){
  let tempData = [0, 0, 0];

  for(let i = 0; i < data.length; i++){
    const month = dayjs(data[i].date).month();

    if(month === months[0]){
      tempData[0] += data[i].distance;
    }
    else if(month === months[1]){
      tempData[1] += data[i].distance;
    }
    else if(month === months[2]){
      tempData[2] += data[i].distance;
    }
    else {
      console.log(`Error: Couldn't fit data to any month. Date: ${data[i].date}, method: ${data[i].vehicle_type}, distance: ${data[i].distance}`)
    }
  }
  return tempData;
}

export function getSixMonthsKms(months, data){
  let tempData = [0, 0, 0, 0, 0, 0];

  for(let i = 0; i < data.length; i++){
    const month = dayjs(data[i].date).month();

    if(month === months[0]){
      tempData[0] += data[i].distance;
    }
    else if(month === months[1]){
      tempData[1] += data[i].distance;
    }
    else if(month === months[2]){
      tempData[2] += data[i].distance;
    }
    else if(month === months[3]){
      tempData[3] += data[i].distance;
    }
    else if(month === months[4]){
      tempData[4] += data[i].distance;
    }
    else if(month === months[5]){
      tempData[5] += data[i].distance;
    }
    else {
      console.log(`Error: Couldn't fit data to any month. Date: ${data[i].date}, method: ${data[i].vehicle_type}, distance: ${data[i].distance}`)
    }
  }
  return tempData;
}

export function getYearKms(months, data){
  let tempData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for(let i = 0; i < data.length; i++){
    const month = dayjs(data[i].date).month();

    if(month === months[0]){
      tempData[0] += data[i].distance;
    }
    else if(month === months[1]){
      tempData[1] += data[i].distance;
    }
    else if(month === months[2]){
      tempData[2] += data[i].distance;
    }
    else if(month === months[3]){
      tempData[3] += data[i].distance;
    }
    else if(month === months[4]){
      tempData[4] += data[i].distance;
    }
    else if(month === months[5]){
      tempData[5] += data[i].distance;
    }
    else if(month === months[6]){
      tempData[6] += data[i].distance;
    }
    else if(month === months[7]){
      tempData[7] += data[i].distance;
    }
    else if(month === months[8]){
      tempData[8] += data[i].distance;
    }
    else if(month === months[9]){
      tempData[9] += data[i].distance;
    }
    else if(month === months[10]){
      tempData[10] += data[i].distance;
    }
    else if(month === months[11]){
      tempData[11] += data[i].distance;
    }
    else {
      console.log(`Error: Couldn't fit data to any month. Date: ${data[i].date}, method: ${data[i].vehicle_type}, distance: ${data[i].distance}`)
    }
  }
  return tempData;
}

function formatEmissionsTimePeriodData(data, timeFrame){
    let barData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"],
      datasets: [
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        ]
        barData.labels = [
          days[0].format('ddd'),
          days[1].format('ddd'),
          days[2].format('ddd'),
          days[3].format('ddd'),
          days[4].format('ddd'),
          days[5].format('ddd'),
          days[6].format('ddd')
        ];
        barData.datasets[0].data = getWeekKms(days, data);
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

        barData.datasets[0].data = getMonthKms(weeks, data);
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
        barData.datasets[0].data = getThreeMonthsKms(threeMonths, data);
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
        barData.datasets[0].data = getSixMonthsKms(sixMonths, data);
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

        barData.datasets[0].data = getYearKms(year, data);
        barData.datasets[0].data.forEach(number => {
          number = number.toFixed(2)
        });
        break;
    }
    return(barData);
  }


export default function TotalKilometers({data, chartConfig, timeFrame}){
    const finalKmData = formatEmissionsTimePeriodData(data, timeFrame);
            return(
              <View>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', marginTop: 10}}>Total kilometers travelled this year</Text>
                <Text style={{textAlign: "left", fontSize: 12, marginLeft: 2, marginBottom: 2, marginTop: 50, color: "black"}}>km</Text>
                <BarChart
                  style={{
                    alignItems: 'flex-start'
                  }}
                  data={finalKmData}
                  width={Dimensions.get("window").width}
                  height={220}
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                  withCustomBarColorFromData={true}
                  fromZero={true}
                  showBarTops={false}
                  showValuesOnTopOfBars={true}
                />
              </View>);
}