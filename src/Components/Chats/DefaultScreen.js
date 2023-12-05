import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Images} from '../../utils/Images';
import {AppColor} from '../../utils/AppColor';
import QuickFIlters from './QuickFIlters';
import {width} from '../../utils/Dimensions/Dimension';
import BlackButton from '../Button/BlackButton';

const DefaultScreen = () => {
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
        <Text>Collect all the things you like in one place</Text>
        <TouchableOpacity>
          {/* <View style={styles.buttonView}>
            <Text
              style={{color: AppColor.white, fontSize: 20, fontWeight: '400'}}>
              Discover
            </Text>
          </View> */}
          <BlackButton title="Discover" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DefaultScreen;

const styles = StyleSheet.create({
  imageBox: {
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
    height: '100%',
  },
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
