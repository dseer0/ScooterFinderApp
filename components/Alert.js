import {Alert} from 'react-native';

const makeAlert = (title, msg) =>
  Alert.alert(title, msg, [
    {
      text: 'OK',
      onPress: () => console.log('Cancel Pressed'),
      style: 'ok',
    },
  ]);

export default makeAlert;
