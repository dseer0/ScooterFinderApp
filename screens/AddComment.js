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
import {addComment, deletepin, editPin} from '../components/Client';

const AddComment = ({route, navigation}) => {
  const id = route.params.markerId;
  const token = route.params.token;

  const [comment, setComment] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.markerForm}>
        <Text style={styles.header}>Add Comment</Text>
        <TextInput
          style={styles.textinput}
          placeholder=""
          underlineColorAndroid={'transparent'}
          onChangeText={t => setComment(t)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addComment(id, comment, token).then(() =>
              navigation.navigate('MapScreen', {token: token}),
            );
          }}>
          <Text style={styles.buttontxt}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('MapScreen', {token: token});
          }}>
          <Text style={styles.buttontxt}>Exit</Text>
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
  },
  buttontxt: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddComment;
