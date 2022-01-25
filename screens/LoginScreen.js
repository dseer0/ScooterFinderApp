/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import makeAlert from '../components/Alert';
import React, {useState} from 'react';
import type {Node} from 'react';
import {Alert} from 'react-native';
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

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [mailInput, setMailInput] = useState('');
  const [token, setToken] = useState('');

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@token', token);
      console.log('Data successfully saved');
    } catch (e) {
      console.log('Failed to save the data to the storage');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.registerform}>
        <Text style={styles.header}>Login</Text>
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
            fetch('https://serverimage-itxfgp626q-lz.a.run.app/login', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: mailInput,
                password: passwordInput,
              }),
            })
              .then(r =>
                r.json().then(data => ({status: r.status, body: data})),
              )
              .then(obj => {
                if (obj.status !== 200) {
                  makeAlert('Could not login', obj.body.errors[0]);
                } else {
                  //AsyncStorage.setItem('token', obj.body);
                  setToken(obj.body);
                  saveData().then(r => {
                    navigation.navigate('MapScreen', {token: obj.body});
                  });
                }
                //console.log(obj.body);
              })
              .catch(e => {
                makeAlert(
                  'Error',
                  'Something went wrong, please check internet connection!',
                );
              });
          }}>
          <Text style={styles.buttontxt}>Login</Text>
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

export default LoginScreen;
