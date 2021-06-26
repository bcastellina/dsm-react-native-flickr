import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {Button as ButtonPaper} from 'react-native-paper';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;


  return (
    <ButtonPaper onPress={onPress} {...buttonStyle}><Text style={textStyle}>{children}</Text></ButtonPaper>
  );
};

const styles = {
  textStyle: {
    color: "white"
  },
  buttonStyle: {
    mode: "contained",
    style: {
      flex: 1,
      alignSelf: 'stretch',
      marginLeft: 5,
      marginRight: 5
    },
    color: "#7C8C03"
  }
};

export default Button;
