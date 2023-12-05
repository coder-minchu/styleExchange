import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {AppColor} from '../../utils/AppColor';
import {Fonts} from '../../utils/Fonts';
import {Images} from '../../utils/Images';
import {width} from '../../utils/Dimensions/Dimension';
import BlackButton from '../Button/BlackButton';

const AdsComponent = () => {
  return (
    <View style={{backgroundColor: AppColor.white, height: '100%'}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: AppColor.appBackground,
            margin: 20,
            padding: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View style={styles.imageView}>
              <Image
                style={styles.Image}
                source={require('../../../assets/Images/headerLeft_img.png')}
              />
            </View>
            <View
              style={{
                marginLeft: 10,
                gap: 10,
                paddingLeft: 10,
                width: width / 1.8,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: AppColor.black,
                }}>
                Want to sell more?
              </Text>
              <Text style={{fontSize: 15}}>
                Post more Ads for less. Packages that help you save money.
              </Text>
            </View>
          </View>
          <TouchableOpacity style={{marginTop: 20}}>
            <BlackButton title=" Show me packages" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageBox}>
          <Image
            source={Images.myAdsImage}
            style={{width: width / 3, height: width / 3}}
          />
          <Text style={{fontSize: 20, color: AppColor.black}}>
            You haven't listed anything yet
          </Text>
          <Text>Let go of you don't use anymore</Text>
          <TouchableOpacity>
            <BlackButton title="Post" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdsComponent;

const styles = StyleSheet.create({
  MyAds_main_container: {
    backgroundColor: AppColor.white,
    height: '100%',
  },
  headerText: {
    fontSize: 25,
    fontFamily: Fonts.regular,
    color: AppColor.black,
    padding: 10,
  },
  text: {
    //  width:'100%',
    // alignContent: 'center',
    // justifyContent: 'center',
    fontSize: 18,
    color: AppColor.black,
  },
  imageBox: {
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
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
  imageView: {
    width: width / 5,
    height: width / 5,
    backgroundColor: 'skyblue',
    borderRadius: 50,
  },
  Image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
});
