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
    <Image style={styles.image} source={require('../img/backgroundImage.png')} />
    <View style={styles.fixToText}>
      <Button
        style={styles.login}
        title="LOG IN"
        onPress={() => navigation.navigate('LoginScreen')}
      />
      <Button
        style={styles.register}
        title="REGISTER"
        onPress={() => navigation.navigate('RegisterScreen')}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 0.85,
    justifyContent: 'center',
  },
  login: {},
  register: {},
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default WelcomeScreen;
