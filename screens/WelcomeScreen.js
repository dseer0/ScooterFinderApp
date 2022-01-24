/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
  TouchableOpacity,
} from 'react-native';

const WelcomeScreen = ({navigation}) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={require('../img/backgroundImage.png')}
    />
    <View style={styles.fixToText}>
      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}>
        <Text style={styles.buttontxt}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={() => {
          navigation.navigate('RegisterScreen');
        }}>
        <Text style={styles.buttontxt}>Register</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 0.8,
    justifyContent: 'center',
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
  buttonLogin: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1b4798',
    marginTop: 0,
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

export default WelcomeScreen;
