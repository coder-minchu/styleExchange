import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OlxNavbar from '../../Components/Navbar/OlxNavbar';
import {AppColor} from '../../utils/AppColor';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllComponent from '../../Components/Chats/AllComponent';
import SellingComponent from '../../Components/Chats/SellingComponent';
import BuyingComponent from '../../Components/Chats/BuyingComponent';
import { Fonts } from '../../utils/Fonts';

const Chats = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.Chats_main_container}>
      <OlxNavbar />
      <Text style={styles.headerText}>Chats</Text>
      <View style={{flex: 1}}>
        <Tab.Navigator>
          <Tab.Screen
            name="All"
            component={AllComponent}
            options={{title: 'ALL'}}
          />
          <Tab.Screen
            name="Buying"
            component={BuyingComponent}
            options={{title: 'BUYING'}}
          />
          <Tab.Screen
            name="Selling"
            component={SellingComponent}
            options={{title: 'SELLING'}}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Chats_main_container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  headerText: {
    fontSize: 25,
    fontFamily: Fonts.regular,
    color: AppColor.black,
    padding: 10,
  },
});

export default Chats;
