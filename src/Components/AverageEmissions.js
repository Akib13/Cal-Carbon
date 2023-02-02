import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import dayjs from "dayjs";

function getAverage(total, amount){
  if(amount !== 0){
    return (total / amount / 1000).toFixed(1);
  }
  else {
    return 0;
  }
}

function formatAverageEmissionsTimePeriodData(data){
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
            (opacity = 1) => '#07faa5',
            (opacity = 1) => '#fa9107',
            (opacity = 1) => '#024545',
            (opacity = 1) => '#450222',
            (opacity = 1) => '#b7ff0f',
            (opacity = 1) => '#c22362',
          ]
        }
      ]
    };

    const startDay = dayjs().subtract(11, "month");
    const startMonth = startDay.format('M');
    if( startMonth !== '1'){
      barData.labels = [
        dayjs().subtract(11, "month").format('MMM'),
        dayjs().subtract(10, "month").format('MMM'),
        dayjs().subtract(9, "month").format('MMM'),
        dayjs().subtract(8, "month").format('MMM'),
        dayjs().subtract(7, "month").format('MMM'),
        dayjs().subtract(6, "month").format('MMM'),
        dayjs().subtract(5, "month").format('MMM'),
        dayjs().subtract(4, "month").format('MMM'),
        dayjs().subtract(3, "month").format('MMM'),
        dayjs().subtract(2, "month").format('MMM'),
        dayjs().subtract(1, "month").format('MMM'),
        dayjs().format('MMM')
      ]
    }

      let tempData = [
        {amount: 0, total: 0},
        {amount: 0, total: 0},
        {amount: 0, total: 0},
        {amount: 0, total: 0},
        {amount: 0, total: 0},
        {amount: 0, total: 0},
        {amount: 0, total: 0},
        {amount: 0, total: 0},
        {amount: 0, total: 0},
        {amount: 0, total: 0},
        {amount: 0, total: 0},
        {amount: 0, total: 0}
      ];
      console.log("Temp: " + tempData[0]);
      console.log("Month: " + startMonth);

      for(let i = 0; i < data.length; i++){
        console.log("=== NOW TESTING " + dayjs(data[i].Date).format('M'));
        console.log("Comparing to " + (startDay.add(11, "month")).format('M'));
        if(dayjs(data[i].Date).format('M') === startMonth){
          tempData[0].total += data[i].Emission;
          tempData[0].amount++;
        }
        else if(dayjs(data[i].Date).format('M') === startDay.add(1, "month").format('M')){
          tempData[1].total += data[i].Emission;
          tempData[1].amount++;
        }
        else if(dayjs(data[i].Date).format('M') === startDay.add(2, "month").format('M')){
          tempData[2].total += data[i].Emission;
          tempData[2].amount++;
        }
        else if(dayjs(data[i].Date).format('M') === startDay.add(3, "month").format('M')){
          tempData[3].total += data[i].Emission;
          tempData[3].amount++;
        }
        else if(dayjs(data[i].Date).format('M') === startDay.add(4, "month").format('M')){
          tempData[4].total += data[i].Emission;
          tempData[4].amount++;
        }
        else if(dayjs(data[i].Date).format('M') === startDay.add(5, "month").format('M')){
          tempData[5].total += data[i].Emission;
          tempData[5].amount++;
        }
        else if(dayjs(data[i].Date).format('M') === startDay.add(6, "month").format('M')){
          tempData[6].total += data[i].Emission;
          tempData[6].amount++;
        }
        else if(dayjs(data[i].Date).format('M') === startDay.add(7, "month").format('M')){
          tempData[7].total += data[i].Emission;
          tempData[7].amount++;
        }
        else if(dayjs(data[i].Date).format('M') === startDay.add(8, "month").format('M')){
          tempData[8].total += data[i].Emission;
          tempData[8].amount++;
        }
        else if(dayjs(data[i].Date).format('M') === startDay.add(9, "month").format('M')){
          tempData[9].total += data[i].Emission;
          tempData[9].amount++;
        }
        else if(dayjs(data[i].Date).format('M') === startDay.add(10, "month").format('M')){
          tempData[10].total += data[i].Emission;
          tempData[10].amount++;
        }
        else if(dayjs(data[i].Date).format('M') === startDay.add(11, "month").format('M')){
          tempData[11].total += data[i].Emission;
          tempData[11].amount++;
        }
        else {
          console.log(`Error: Couldn't fit value to a month: ${typeof(dayjs(data[i].Date).format('M'))} ${data[i].Date}, ${data[i].Emission}`);
        }
      }

    barData.datasets[0].data = [
      getAverage(tempData[0].total, tempData[0].amount),
      getAverage(tempData[1].total, tempData[1].amount),
      getAverage(tempData[2].total, tempData[2].amount),
      getAverage(tempData[3].total, tempData[3].amount),
      getAverage(tempData[4].total, tempData[4].amount),
      getAverage(tempData[5].total, tempData[5].amount),
      getAverage(tempData[6].total, tempData[6].amount),
      getAverage(tempData[7].total, tempData[7].amount),
      getAverage(tempData[8].total, tempData[8].amount),
      getAverage(tempData[9].total, tempData[9].amount),
      getAverage(tempData[10].total, tempData[10].amount),
      getAverage(tempData[11].total, tempData[11].amount),
    ]
    
    return(barData);
  }


export default function AverageEmissions({data, chartConfig, loading}){
    const finalAverageData = formatAverageEmissionsTimePeriodData(data);
    return(
    <View>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', margin: 10}}>Average emissions per trip during the past year</Text>
        <Text style={{textAlign: "left", fontSize: 12, marginLeft: 2, marginBottom: 2, marginTop: 50, color: "black"}}>kg CO2e/km</Text>
        {loading === true ? <View height={220}></View> : <BarChart
          style={{
            marginBottom: 50,
            marginLeft: -10
          }}
          data={finalAverageData}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          withCustomBarColorFromData={true}
          fromZero={true}
          showBarTops={true}
          showValuesOnTopOfBars={true}
          flatColor={true}
        />}
      </View>);
}