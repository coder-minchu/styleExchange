import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import OlxNavbar from '../../Components/Navbar/OlxNavbar';
import {AppColor} from '../../utils/AppColor';
import { Fonts } from '../../utils/Fonts';
import {Images} from '../../utils/Images';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FavouritesComponent from '../../Components/MyAds/FavouritesComponent';
import AdsComponent from '../../Components/MyAds/AdsComponent';

const MyAds = () => {
  const Tab = createMaterialTopTabNavigator();

 

  return (
    <View style={styles.MyAds_main_container}>
      <OlxNavbar />
      <Text style={styles.headerText}>My Ads</Text>
      <View style={{flex: 1}}>
        <Tab.Navigator>
          <Tab.Screen
            name="Ads"
            component={AdsComponent}
            options={{
              title: 'ADS',
            }}
          />
          <Tab.Screen
            name="FAVOURITES"
            component={FavouritesComponent}
            options={{
              title: 'FAVOURITES',
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default MyAds;

const styles = StyleSheet.create({
  MyAds_main_container: {
    backgroundColor: AppColor.white,
    flex: 1,
  },
  headerText: {
    fontSize: 25,
    fontFamily: Fonts.regular,
    color: AppColor.black,
    padding: 10,
  },
});
