import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Images} from '../../utils/Images';
import {width} from '../../utils/Dimensions/Dimension';
import {AppColor} from '../../utils/AppColor';

const CarsComponent = () => {
  return (
    <View>
      <View style={styles.carView}>
        <View style={styles.textView}>
          <Text style={styles.text}>
            What is the location of the car you are selling?
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.buttonView}>
            <Text> Current location:Vijay Nagar, Indore </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.buttonView}>
            <Text>Somewhere else</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarsComponent;

const styles = StyleSheet.create({
  carView: {
    width: width / 1.4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  textView: {
    width: width / 1.5,
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    color: AppColor.black,
    textAlign: 'center',
  },
  buttonView: {
    width: width / 1.5,
    height: 40,
    borderWidth: 1,
    borderColor: AppColor.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
