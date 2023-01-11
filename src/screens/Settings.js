import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function Settings() {
  return (
    <View style={styles.body}>
      <View style={styles.page_view}>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.text}>Default Method</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.text}>Baseline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.text}>Manage saved trips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.text}>Modify past trips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={[styles.text, {color: '#f22'}]}>Reset emission data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={[styles.text, {color: '#f22'}]}>Reset all data</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  page_view: {
    margin: '15%',
  },
  button: {
    height: '15%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: '5%'
  },
  text: {
    fontSize: 20,
  },
});
