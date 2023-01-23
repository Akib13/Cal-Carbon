import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

function formatAverageEmissionsTimePeriodData(data, timeFrame){
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
        barData.labels = [
          dayjs().subtract(6, 'days').format('dddd').slice(0,3),
          dayjs().subtract(5, 'days').format('dddd').slice(0,3),
          dayjs().subtract(4, 'days').format('dddd').slice(0,3),
          dayjs().subtract(3, 'days').format('dddd').slice(0,3),
          dayjs().subtract(2, 'days').format('dddd').slice(0,3),
          dayjs().subtract(1, 'days').format('dddd').slice(0,3),
          dayjs().format('dddd')];
        barData.datasets[0].data = [10, 20, 30, 15, 5, 50, 42];
        break;
      case 2:
        dayjs.extend(isoWeek);
        barData.labels = [
          "Week " + dayjs().subtract(3, 'weeks').isoWeek(),
          "Week " + dayjs().subtract(2, 'weeks').isoWeek(),
          "Week " + dayjs().subtract(1, 'weeks').isoWeek(),
          "Week " + dayjs().isoWeek(),
        ];
        barData.datasets[0].data = [4, 6, 8, 9];
        break;
      case 3:
        barData.labels = [
          dayjs().subtract(2, 'month').format('MMMM'),
          dayjs().subtract(1, 'month').format('MMMM'),
          dayjs().format('MMMM'),
        ];
        barData.datasets[0].data = [150, 50, 320];
        break;
      case 4:
        barData.labels = [
          dayjs().subtract(5, 'month').format('MMMM').slice(0,3),
          dayjs().subtract(4, 'month').format('MMMM').slice(0,3),
          dayjs().subtract(3, 'month').format('MMMM').slice(0,3),
          dayjs().subtract(2, 'month').format('MMMM').slice(0,3),
          dayjs().subtract(1, 'month').format('MMMM').slice(0,3),
          dayjs().format('MMMM').slice(0,3),
        ];
        barData.datasets[0].data = [150, 50, 320, 250, 180, 10];
        break;
      case 5:
        break;
    }
    return(barData);
  }


export default function AverageEmissions({data, chartConfig, timeFrame}){
    const finalAverageData = formatAverageEmissionsTimePeriodData(data, timeFrame);
            return(
            <View>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000000', textAlign: 'center', marginTop: 10}}>Average emissions per trip</Text>
                <BarChart
                  style={{
                    marginVertical: 50,
                    alignItems: 'center'
                  }}
                  data={finalAverageData}
                  width={Dimensions.get("window").width - 20}
                  height={220}
                  yAxisLabel=""
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                  withCustomBarColorFromData={true}
                  fromZero={true}
                  showBarTops={false}
                />
              </View>);
}