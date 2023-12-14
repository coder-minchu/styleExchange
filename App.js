import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Account, Chats, Home, MyAds, ProductDetails, Sell } from './src/Screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import { Provider } from 'react-redux';
import store from './src/Redux/Store/Store';

import Tabs from './src/navigation/Tabs';
import Categories from './src/Screens/Categories/Categories';
import SearchScreen from './src/Screens/Search/SearchScreen';
import SplashScreen from './src/Screens/Splash/SplashScreen';
import AppIntroSliders from './src/AppIntroSlider/AppIntroSlider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProductListing from './src/Screens/ProductListing';

const App = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      StatusBar.setBackgroundColor('white', true);
    }

    StatusBar.setBarStyle('dark-content');

    return () => {

    }
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShadowVisible: true,
            }}>
            <Stack.Screen
              name="SplashScreen"
              options={{
                header: () => null,
              }}
              component={SplashScreen}
            />
            <Stack.Screen
              name="AppIntroSliders"
              options={{
                header: () => null,
              }}
              component={AppIntroSliders}
            />
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{
                header: () => null,
                title: '',
              }}
            />
            <Stack.Screen
              name="ProductListing"
              component={ProductListing}
              options={{
                header: () => null,
                // title: '',
                // headerRight: () => <Icon name="share-social-outline" size={25} />,
              }}
            />

            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{
                // header:()=>null,
                title: '',
                headerRight: () => <Icon name="share-social-outline" size={25} />,
              }}
            />

            <Stack.Screen
              name="Sell"
              component={Sell}
              options={{
                title: '',
              }} />

            <Stack.Screen
              name="Categories"
              component={Categories}
              options={{
                title: 'Categories',
              }} />
            <Stack.Screen
              name="SearchScreen"
              component={SearchScreen}
              options={{
                header: () => null,
              }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
