/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {Button, Text, TouchableOpacity} from 'react-native';
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
      //console.log('focus => ' + token);
      //setPreventFromGoingBack(true);

      loadpins();
    });
    const un2 = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe();
      un2();
    };
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
    buttonLogout: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#1b4798',
      marginTop: 10,
    },
    buttontxt: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
    map: {
      flex: 0.75,
      // ...StyleSheet.absoluteFillObject,
    },

    fixToText: {
      flex: 0.25,
      justifyContent: 'center',
      paddingLeft: 5,
      paddingRight: 5,
      alignSelf: 'stretch',
    },
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.2598,
          longitude: 18.6545,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {state.markers.map((marker, i) => (
          <MapView.Marker
            key={i}
            coordinate={{latitude: marker.lat, longitude: marker.long}}
            onPress={() => {
              getPinInfo(marker.id, token).then(r => {
                navigation.navigate('MarkerScreen', {
                  markerId: marker.id,
                  token: token,
                  description: r.description,
                  comments: r.comments,
                });
              });
              // navigation.navigate('MarkerScreen');
              // });
            }}
          />
        ))}
      </MapView>
      <View style={styles.fixToText}>
        <ReportScooter onclicked={funce} />
        <TouchableOpacity
          style={styles.buttonLogout}
          onPress={() => {
            navigation.removeListener('beforeRemove');
            navigation.reset({
              index: 0,
              routes: [{name: 'WelcomeScreen'}],
            });
          }}>
          <Text style={styles.buttontxt}>Logout</Text>
        </TouchableOpacity>
        {/*<Button*/}
        {/*  title="logout"*/}
        {/*  onPress={() => {*/}
        {/*    navigation.removeListener('beforeRemove');*/}
        {/*    navigation.reset({*/}
        {/*      index: 0,*/}
        {/*      routes: [{name: 'WelcomeScreen'}],*/}
        {/*    });*/}
        {/*  }}*/}
      </View>
    </View>
  );
};
export default MapScreen;
