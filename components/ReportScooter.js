import React, {Component} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  buttonReport: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7B05B',
    //marginTop: 20,
  },
  buttontxt: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

class ReportScooter extends Component {
  handlePress = () => {
    this.props.onclicked?.(); // Same as this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.buttonReport}
        onPress={() => {
          this.handlePress();
        }}>
        <Text style={styles.buttontxt}>Report Scooter</Text>
      </TouchableOpacity>
    );

    // return <Button title="REPORT SCOOTER" onPress={() => this.handlePress()} />;
  }
}

export default ReportScooter;
