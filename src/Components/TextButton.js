import { TouchableOpacity, Text } from "react-native";

export default function TextButton({text, onClick, value, chosen}){

    return(
        <TouchableOpacity onPress={() => onClick(value)} style={{paddingHorizontal: 5}}>
            <Text style={chosen ? {color: 'blue', fontWeight: 'bold'} : {color: '#696969'}}>{text}</Text>
        </TouchableOpacity>
    )

}