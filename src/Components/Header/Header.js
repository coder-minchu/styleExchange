import React from 'react';
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { AppColor } from '../../utils/AppColor';
import { Fonts } from '../../utils/Fonts';
import Svg, { Polygon } from 'react-native-svg';

const Header = ({ title }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={AppColor.blueViolet}
                barStyle="light-content"
            />
            {/* <Svg height="100%" width={width} style={styles.triangleContainer}>
                <Polygon points="0,0 0,50 25,25" fill="#C4E1FF" />
                <Polygon points="25,25 0,50 50,50" fill="#A3CCFF" />
                <Polygon points="25,25 50,50 75,25" fill="#82B8FF" />
                <Polygon points="75,25 50,50 100,50" fill="#61A4FF" />
                <Polygon points="75,25 100,50 100,0" fill="#408FFF" />
            </Svg> */}
            <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitleText}>
                    {title ? title : 'StyleExchange'}
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '5%',
        width: '100%',
        backgroundColor: 'transparent',
    },
    triangleContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
    },
    headerTitleContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: AppColor.borderColor,
    },
    headerTitleText: {
        fontFamily: Fonts.lobster.regular,
        fontSize: responsiveFontSize(1.8),
        color: AppColor.white,
    },
});
