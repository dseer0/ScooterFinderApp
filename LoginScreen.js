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

const LoginScreen = ({navigation}) => (
  <View style={styles.container}>
    <Image style={styles.image} source={require('./img/backgroundImage.png')} />
    <Text style={styles.header}>scooter finder</Text>
    <View style={styles.fixToText}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginFormScreen')}>
        <Text style={styles.buttontxt}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.buttontxt}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 0.85,
    width: '100%',
  },
  header: {
    position: 'absolute',
    fontSize: 70,
    color: '#fff',
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 15,
    width: '40%',
    backgroundColor: '#1b4798',
    marginTop: 30,
    borderRadius: 10,
  },
  buttontxt: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default LoginScreen;
