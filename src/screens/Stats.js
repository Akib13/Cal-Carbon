import { StyleSheet, View } from 'react-native'
import React from 'react'
import DropdownMenu from '../Components/DropDownMenu';
import { useState } from 'react';
import GraphView from '../Components/GraphView';

export default function Stats() {
    const [choice, setChoice] = useState('pie');

    return (
      <View style={{backgroundColor: '#ffffff', height: '100%'}}>
        <View style={{marginTop: 20, alignContent: 'flex-start'}}>
            <View style={{zIndex: 1}}>
                <DropdownMenu choice={setChoice}/>
            </View>
            <GraphView choice={choice} />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({})