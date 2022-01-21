/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import GetLocation from 'react-native-get-location';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  Button,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';

const EditMarkerScreen = ({navigation}) => (
  <View style={styles.container}>
    <View style={styles.markerForm}>
      <Text style={styles.header}>Edit Marker</Text>
      <TextInput
        style={styles.textinput}
        placeholder="description"
        underlineColorAndroid={'transparent'}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MapScreen')}>
        <Text style={styles.buttontxt}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MapScreen')}>
        <Text style={styles.buttontxt}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60,
  },
  markerForm: {
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    color: '#000',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#000',
    borderBottomColor: '#1b4798',
    borderBottomWidth: 2,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1b4798',
    marginTop: 30,
    borderRadius: 10,
  },
  buttontxt: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditMarkerScreen;
