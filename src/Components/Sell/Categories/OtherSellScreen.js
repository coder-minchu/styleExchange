import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColor} from '../../../utils/AppColor';
import {width} from '../../../utils/Dimensions/Dimension';

const OtherSellScreen = ({title}) => {
  return (
    <View style={{width: width / 1}}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default OtherSellScreen;

const styles = StyleSheet.create({
  titleView: {
    padding: 10,
    borderBottomWidth: 1,
    margin: 10,
    borderColor: AppColor.borderColor,
  },
  title: {
    fontSize: 15,
    color: AppColor.grey,
  },
});
