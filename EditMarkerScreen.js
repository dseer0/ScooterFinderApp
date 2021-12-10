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
} from 'react-native';
import MapView from 'react-native-maps';

const EditMarkerScreen = navigation => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    delete: {},
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          borderLeftWidth: 4,
          borderRightWidth: 4,
          height: 70,
        }}>
        <TextInput
          multiline
          caretHidden
          style={{
            height: 70,
            backgroundColor: '#ffffff',
            paddingLeft: 15,
            paddingRight: 15,
          }}
        />
      </View>
      <Button color="#ff5c5c" title="DELETE" onPress={() => {}} />
      <Button title="EDIT" onPress={() => {}} />
    </View>
  );
};

export default EditMarkerScreen;
