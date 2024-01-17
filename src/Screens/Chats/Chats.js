import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import OlxNavbar from '../../Components/Navbar/OlxNavbar';
import { AppColor } from '../../utils/AppColor';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllComponent from '../../Components/Chats/AllComponent';
import SellingComponent from '../../Components/Chats/SellingComponent';
import BuyingComponent from '../../Components/Chats/BuyingComponent';
import { Fonts } from '../../utils/Fonts';
import { responsiveFontSize } from '../../utils/Dimensions/Dimension';
import socketServcies from '../../utils/socketServcies';
import { useFocusEffect } from '@react-navigation/native';

const Chats = () => {
  const Tab = createMaterialTopTabNavigator();

  useFocusEffect(
    useCallback(() => {
      socketServcies.initializeSocket();
    }, []));

  return (
    <SafeAreaView style={styles.Chats_main_container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.headerText}>Chats</Text>

      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator>
          <Tab.Screen
            name="All"
            component={AllComponent}
            options={{ title: 'ALL' }}
          />
          <Tab.Screen
            name="Buying"
            component={BuyingComponent}
            options={{ title: 'BUYING' }}
          />
          <Tab.Screen
            name="Selling"
            component={SellingComponent}
            options={{ title: 'SELLING' }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Chats_main_container: {
    flex: 1,
    backgroundColor: AppColor.blueViolet,
  },
  headerText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: Fonts.poppins.bold,
    color: AppColor.white,
    padding: 10,
  },
});

export default Chats;
