import { StyleSheet, Text, View, Platform } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Account from './Account';
import StyleExchange from './StyleExchange';
import { Fonts } from '../utils/Fonts';
import { height, responsiveFontSize, width } from '../utils/Dimensions/Dimension';
import { AppColor } from '../utils/AppColor';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const Drawer = createDrawerNavigator();


const CustomHeaderTitle = () => (
    <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitleText}>
            StyleExchange
        </Text>
    </View>
);

const CustomHeaderRight = () => (
    <View style={styles.headerRightContainer}>
        <Icon
            name="heart"
            size={height / 50}
            color={AppColor.black}
            style={styles.heartIcon}
        />
        <LinearGradient
            colors={['#8E2DE2', '#4A00E0']}
            style={styles.coinsContainer}
        >
            <Text style={styles.coinsText}>Coins 100</Text>
        </LinearGradient>
    </View>
);

const DrawerNavigator = ({ navigation }) => {
    return (
        <Drawer.Navigator
            initialRouteName="StyleExchange"
            screenOptions={{
                headerStyle: {
                    ...Platform.select({
                        android: {
                            elevation: 0,
                        },
                        ios: {
                            shadowColor: 'transparent',
                        },
                    }),
                },
                drawerStyle: {
                    // backgroundColor: AppColor.azure,
                    // width: 240,
                },
            }}
        >
            <Drawer.Screen
                name="StyleExchange"
                headerTitleAlign='left'
                component={StyleExchange}
                options={{
                    headerTitle: () => <CustomHeaderTitle />,
                    headerRight: () => <CustomHeaderRight />,
                }}
            />
            <Drawer.Screen name="Account" component={Account} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
    headerTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    headerTitleText: {
        fontFamily: Fonts.lobster.regular,
        fontSize: responsiveFontSize(1.8),
        color: AppColor.black,
    },
    headerRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    heartIcon: {
        marginRight: 20,
    },
    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 6,
        marginRight: 10,
        height: '70%',
        width: height / 12
    },
    coinsText: {
        color: AppColor.white,
        fontFamily: Fonts.poppins.regular,
        fontSize: responsiveFontSize(1.2)
    },
});
