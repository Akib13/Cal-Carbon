import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

function formatTripsTimePeriodData(data, timeFrame){
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

    for(let i = 0; i < data.length; i++){
      if(dayjs(data[i].date).format('M') === startMonth){
        barData.datasets[0].data[0]++;
      }
      else if(dayjs(data[i].date).format('M') === startDay.add(1, "month").format('M')){
        barData.datasets[0].data[1]++;
      }
      else if(dayjs(data[i].date).format('M') === startDay.add(2, "month").format('M')){
        barData.datasets[0].data[2]++;
      }
      else if(dayjs(data[i].date).format('M') === startDay.add(3, "month").format('M')){
        barData.datasets[0].data[3]++;
      }
      else if(dayjs(data[i].date).format('M') === startDay.add(4, "month").format('M')){
        barData.datasets[0].data[4]++;
      }
      else if(dayjs(data[i].date).format('M') === startDay.add(5, "month").format('M')){
        barData.datasets[0].data[5]++;
      }
      else if(dayjs(data[i].date).format('M') === startDay.add(6, "month").format('M')){
        barData.datasets[0].data[6]++;
      }
      else if(dayjs(data[i].date).format('M') === startDay.add(7, "month").format('M')){
        barData.datasets[0].data[7]++;
      }
      else if(dayjs(data[i].date).format('M') === startDay.add(8, "month").format('M')){
        barData.datasets[0].data[8]++;
      }
      else if(dayjs(data[i].date).format('M') === startDay.add(9, "month").format('M')){
        barData.datasets[0].data[9]++;
      }
      else if(dayjs(data[i].date).format('M') === startDay.add(10, "month").format('M')){
        barData.datasets[0].data[10]++;
      }
      else if(dayjs(data[i].date).format('M') === startDay.add(11, "month").format('M')){
        barData.datasets[0].data[11]++;
      }
      else {
        console.log(`Error: Couldn't fit value to a month: ${typeof(dayjs(data[i].date).format('M'))} ${data[i].date}, ${data[i].emissions}`);
      }
    }

    return(barData);
  }


export default function TripsByTime({data, chartConfig, timeFrame}){
    const finalTripNumberData = formatTripsTimePeriodData(data, timeFrame);
            return(
              <View>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', margin: 10}}>Number of trips taken during the past year</Text>
                <BarChart
                  style={{
                    marginVertical: 50,
                    alignItems: 'center'
                  }}
                  data={finalTripNumberData}
                  width={Dimensions.get("window").width - 20}
                  height={220}
                  yAxisLabel=""
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                  withCustomBarColorFromData={true}
                  fromZero={true}
                  showBarTops={true}
                  showValuesOnTopOfBars={true}
                />
              </View>);
}