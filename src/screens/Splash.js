import { Image, StyleSheet, Text, View } from 'react-native';
import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import GlobalStyle from '../utils/GlobalStyle';

export default function Splash({ navigation }) {

    useEffect(() => {
        createChannels();
        setTimeout(() => {
            navigation.replace('My Trips');
        }, 2000);
    }, []);

    const createChannels = () => {
        PushNotification.createChannel(
            {
                channelId: "task-channel",
                channelName: "Task Channel"
            }
        )
    };

    return (
        <View style={styles.body}>
            <Image
                style={styles.logo} 
                source={require('../../assets/logo.jpg')} 
            />
            <Text style={[GlobalStyle.CustomFontBig ,styles.text]}>
                CalCarbon
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#228B22',
    },
    logo: {
        width: 150,
        height: 150,
        margin: 20,
    },
    text: {
        fontSize: 40,
        color: '#fff',
    },
});