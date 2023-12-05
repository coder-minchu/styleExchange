import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {width} from '../../utils/Dimensions/Dimension';
import {AppColor} from '../../utils/AppColor';

const BlackButton = ({title}) => {
  return (
    <View style={styles.buttonView}>
      <Text style={{color: AppColor.white, fontSize: 20, fontWeight: '400'}}>
        {title}
      </Text>
    </View>
  );
};

export default BlackButton;

const styles = StyleSheet.create({
  buttonView: {
    width: width / 1.5,
    backgroundColor: AppColor.black,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
});
