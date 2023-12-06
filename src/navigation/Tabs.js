import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Account, Chats, Home, MyAds, Sell } from '../Screens';
import CustumTabButton from '../Components/Home/CustumTabButton';
import { height, responsiveFontSize } from '../utils/Dimensions/Dimension';
import { Fonts } from '../utils/Fonts';
import { AppColor } from '../utils/AppColor';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'ios' ? 10 : 5,
  },
  linearGradient: {
    width: Platform.OS === 'ios' ? 30 : 40,
    height: Platform.OS === 'ios' ? 30 : 40,
    borderRadius: Platform.OS === 'ios' ? 15 : 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    backgroundColor: 'white',
  },
  iconText: {
    fontSize: responsiveFontSize(1.2),
    fontFamily: Fonts.lobster.regular,
    paddingTop: Platform.OS === 'ios' ? 1 : 10,
  },
});

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 80 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <LinearGradient
                colors={focused ? AppColor.LinearGradient1 : ['transparent', 'transparent']}
                style={styles.linearGradient}>
                <Icon
                  name="home"
                  size={height / 50}
                  color={focused ? 'white' : 'grey'}
                  style={{ zIndex: 999 }}
                />
              </LinearGradient>
              <Text style={{ color: focused ? AppColor.blueViolet : 'grey', ...styles.iconText }}>
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          header: () => null,
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <LinearGradient
                colors={focused ? AppColor.LinearGradient1 : ['transparent', 'transparent']}
                style={styles.linearGradient}>
                <Icon
                  name="chatbubble-outline"
                  size={height / 50}
                  color={focused ? 'white' : 'grey'}
                  style={{ zIndex: 999 }}
                />
              </LinearGradient>
              <Text style={{ color: focused ? AppColor.blueViolet : 'grey', ...styles.iconText }}>
                Chats
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Sell"
        component={Sell}
        options={{
          header: () => null,
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 5 }}>
              <CustumTabButton />
              <Text style={{ color: focused ? AppColor.blueViolet : 'grey', ...styles.iconText }}>
                Sell
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="MyAds"
        component={MyAds}
        options={{
          header: () => null,
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <LinearGradient
                colors={focused ? AppColor.LinearGradient1 : ['transparent', 'transparent']}
                style={styles.linearGradient}>
                <Icon
                  name="heart-outline"
                  size={height / 50}
                  color={focused ? 'white' : 'grey'}
                  style={{ zIndex: 999 }}
                />
              </LinearGradient>
              <Text style={{ color: focused ? AppColor.blueViolet : 'grey', ...styles.iconText }}>
                MyAds
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          header: () => null,
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabContainer}>
              <LinearGradient
                colors={focused ? AppColor.LinearGradient1 : ['transparent', 'transparent']}
                style={styles.linearGradient}>
                <IconMaterial
                  name="account-outline"
                  size={height / 50}
                  color={focused ? 'white' : 'grey'}
                  style={{ zIndex: 999 }}
                />
              </LinearGradient>
              <Text style={{ color: focused ? AppColor.blueViolet : 'grey', ...styles.iconText }}>
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
