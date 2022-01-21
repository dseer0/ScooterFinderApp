/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
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
import {register} from '../components/Client';
import makeAlert from '../components/Alert';

const RegisterScreen = ({navigation}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [mailInput, setMailInput] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.registerform}>
        <Text style={styles.header}>Register</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Email"
          underlineColorAndroid={'transparent'}
          onChangeText={t => setMailInput(t)}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid={'transparent'}
          onChangeText={t => setPasswordInput(t)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            register(
              mailInput,
              passwordInput,
              () => navigation.navigate('LoginScreen'),
              data => makeAlert('Registration failed', data),
            );
          }}>
          <Text style={styles.buttontxt}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60,
  },
  registerform: {
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
  },
  buttontxt: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
