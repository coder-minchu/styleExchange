import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import React from 'react';

import { AppColor } from '../../utils/AppColor';
import { Images } from '../../utils/Images';
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize, width } from '../../utils/Dimensions/Dimension';

const HomeNavbar = () => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: AppColor.white,
        width: width,
        alignSelf: 'center'
      }}>
      <Image style={{ width: 60, height: 60 }} source={Images.headerLeftImage} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}>
        <Icon name="location-outline" size={16} />
        <Text style={{ fontSize: responsiveFontSize(1.6) }}>Scheme 54...</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeNavbar;

const styles = StyleSheet.create({});
