import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import {AppColor} from '../../utils/AppColor';
import { Images } from '../../utils/Images';

const OlxNavbar = () => {
  return (
    <View>
      <Image style={{width: 60, height: 60}} source={Images.headerLeftImage} />
    </View>
  );
};

export default OlxNavbar;

const styles = StyleSheet.create({});
