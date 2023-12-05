import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../../utils/Images';
import {AppColor} from '../../utils/AppColor';
import QuickFIlters from './QuickFIlters';
import {width} from '../../utils/Dimensions/Dimension';

const AllDefaultScreen = () => {
  return (
    <View style={{backgroundColor: AppColor.white}}>
      <QuickFIlters />
      <View style={styles.imageBox}>
        <Image
          source={Images.myAdsImage}
          style={{width: width / 2, height: width / 2}}
        />
        <Text style={{fontSize: 20, color: AppColor.black}}>
          You've got no chat history so far.
        </Text>
      </View>
    </View>
  );
};

export default AllDefaultScreen;

const styles = StyleSheet.create({
  imageBox: {
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
    height: '100%',
  },
});
