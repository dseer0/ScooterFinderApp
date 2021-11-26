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
  useColorScheme,
  View,
  Image,
  ImageBackground,
  Button,
} from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = navigation => {
  const [state, setState] = useState({markers: []});

  const func = () =>
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setState(prevState => ({
          markers: [
            ...prevState.markers,
            {lat: location.latitude, long: location.longitude},
          ],
        }));
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 0.85,
      // ...StyleSheet.absoluteFillObject,
    },

    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 49.78825,
          longitude: 18.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={() => {
          () => func();
        }}>
        {state.markers.map((marker, i) => (
          <MapView.Marker
            key={i}
            coordinate={{latitude: marker.lat, longitude: marker.long}}
          />
        ))}
      </MapView>
      <View style={styles.fixToText}>
        <Button
          title="REPORT SCOOTER"
          onPress={() => {
            func();
          }}
        />
      </View>
    </View>
  );
};
export default MapScreen;
