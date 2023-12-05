import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Account, Chats, Home, MyAds, ProductDetails, Sell} from '../Screens';
import CustumTabButton from '../Components/Home/CustumTabButton';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
          title: '',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
                paddingBottom: 5,
              }}>
              <Icon name="home" size={25} color={focused ? 'black' : 'grey'} />
              <Text style={{color: focused ? 'black' : 'grey', fontSize: 12}}>
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
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
                paddingBottom: 5,
              }}>
              <Icon
                name="chatbubble-outline"
                size={25}
                color={focused ? 'black' : 'grey'}
              />
              <Text style={{color: focused ? 'black' : 'grey', fontSize: 12}}>
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
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 5,
              }}>
              <CustumTabButton />
              <Text style={{color: focused ? 'black' : 'grey', fontSize: 12}}>
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
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
                paddingBottom: 5,
              }}>
              <Icon
                name="heart-outline"
                size={25}
                color={focused ? 'black' : 'grey'}
              />
              <Text style={{color: focused ? 'black' : 'grey', fontSize: 12}}>
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
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
                paddingBottom: 5,
              }}>
              <IconMaterial
                name="account-outline"
                size={25}
                color={focused ? 'black' : 'grey'}
              />
              <Text style={{color: focused ? 'black' : 'grey', fontSize: 12}}>
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

const styles = StyleSheet.create({});
