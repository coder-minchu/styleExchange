import { StyleSheet, Text, View } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { AppColor } from '../../utils/AppColor';
import { height, responsiveFontSize } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';

const CustumTabButton = ({ isFocused }) => {
  return (
    <View style={{
      justifyContent: 'center', alignItems: 'center',
      position: 'relative',
      zIndex: 999,
      top: -25,
      // backgroundColor:'red'
    }}>
      <LinearGradient
        colors={AppColor.LinearGradient1}
        style={{
          width: 60,
          height: 60,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 4,

        }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
            backgroundColor: 'white',
            position: 'absolute',
            zIndex: 999,
          }}>
          <IconEntypo name="plus" size={height / 50}
            color="black" />

        </View>
      </LinearGradient>
      <Text
        style={{
          color: isFocused ? AppColor.blueViolet : 'grey',
          fontSize: responsiveFontSize(1.8),
          fontFamily: Fonts.lobster.regular,
          paddingTop: 5
        }}>
        Sell
      </Text>
    </View>
  );
};

export default CustumTabButton;

const styles = StyleSheet.create({});
