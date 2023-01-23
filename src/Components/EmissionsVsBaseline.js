import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { TouchableOpacity } from 'react-native-gesture-handler';

const baselineData = [
    {date: "2022-01-09", count: 0, value: -0.5}, 
    {date: "2022-01-10", count: 0, value: 0},
    {date: "2022-01-11", count: 1, value: 1},
    {date: "2022-01-12", count: 0.5, value: 0.5},
    {date: "2022-01-13", count: 1, value: 1},
    {date: "2022-01-14", count: 0, value: null},
    {date: "2022-01-15", count: 0.2, value: 0.2}
];

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

export default function EmissionsVsBaseline({data, chartConfig}){
    const [open, setOpen] = useState(false);
    const [day, setDay] = useState(null);

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