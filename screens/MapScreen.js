/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import GetLocation from 'react-native-get-location';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import ReportScooter from '../components/ReportScooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addpin, getPinInfo, getpins} from '../components/Client';
import {useIsFocused} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/core';
const MapScreen = ({route, navigation}) => {
  const [state, setState] = useState({markers: []});
  // const [token, setToken] = useState('');
  const token = route.params.token;

  const loadpins = () => {
    getpins(token).then(json => {
      if (json.status === 200) {
        json.json().then(json => {
          console.log('got json' + json);
          let tempMarkers = [];

          json.forEach(pin => {
            const latitude = parseFloat(pin.coordinates.split(',')[0]);
            const longitude = parseFloat(pin.coordinates.split(',')[1]);
            tempMarkers.push({
              lat: latitude,
              long: longitude,
              description: '',
              id: pin.id,
            });
          });
          console.log('setting pins');
          setState(prevState => ({
            markers: tempMarkers,
          }));
        });
      }
    });
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focus => ' + token);
      loadpins();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  let funce = () =>
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        const cords = location.latitude + ',' + location.longitude;
        addpin(cords, token).then(r => {
          loadpins();
        });
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
        }}>
        {state.markers.map((marker, i) => (
          <MapView.Marker
            key={i}
            coordinate={{latitude: marker.lat, longitude: marker.long}}
            onPress={() => {
              getPinInfo(marker.id, token).then(r => {
                navigation.navigate('EditMarkerScreen', {
                  markerId: marker.id,
                  token: token,
                  description: r.description,
                });
              });
            }}
          />
        ))}
      </MapView>
      <View style={styles.fixToText}>
        <ReportScooter onclicked={funce} />
        {/*<Button*/}
        {/*  title="REPORT SCOOTER"*/}
        {/*  onPress={() => {*/}
        {/*    func();*/}
        {/*  }}*/}
        {/*/>*/}
      </View>
    </View>
  );
};
export default MapScreen;
