import { View } from "react-native"
import TextButton from "../Components/TextButton";

export const timeFrameEnum = {
    1: "1 week",
    2: "1 month",
    3: "3 months",
    4: "6 months",
    5: "1 year"
}

export default function TimeFramePicker({choice, chosen}) {

    return(
    <View style={{flexDirection: 'row', textAlign: 'center', paddingTop: 20}}>
        <TextButton text={timeFrameEnum[1]} onClick={(x) => choice(x)} value={1} chosen={chosen === 1}/>
        <TextButton text={timeFrameEnum[2]} onClick={(x) => choice(x)} value={2} chosen={chosen === 2}/>
        <TextButton text={timeFrameEnum[3]} onClick={(x) => choice(x)} value={3} chosen={chosen === 3}/>
        <TextButton text={timeFrameEnum[4]} onClick={(x) => choice(x)} value={4} chosen={chosen === 4}/>
        <TextButton text={timeFrameEnum[5]} onClick={(x) => choice(x)} value={5} chosen={chosen === 5}/>
    </View>
    );
}