import React, {Component} from 'react';
import {Button} from 'react-native';

class ReportScooter extends Component {
  handlePress = () => {
    this.props.onclicked?.(); // Same as this.props.onPress && this.props.onPress();
  };

  render() {
    return <Button title="REPORT SCOOTER" onPress={() => this.handlePress()} />;
  }
}

export default ReportScooter;
