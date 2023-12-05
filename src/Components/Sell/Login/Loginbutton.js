import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {AppColor} from '../../../utils/AppColor';

const Loginbutton = ({name, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Loginbutton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: AppColor.black,
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 12,
    textAlign: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
