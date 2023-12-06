import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';
import { AppColor } from '../../utils/AppColor';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const checkIntroSlides = async () => {
            const sliderStorage = await AsyncStorage.getItem('showIntro');
            setTimeout(() => {
                navigation.navigate(sliderStorage ? 'Tabs' : 'AppIntroSliders');
            }, 2000);
        };

        checkIntroSlides();
    }, [navigation]);

    return (
        <LinearGradient
            colors={AppColor.LinearGradient1}
            style={styles.gradientContainer}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../../assets/Images/styleExchange.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.appName}>StyleExchange</Text>
                    {/* <Text style={[styles.appName, { textAlign: 'center', fontSize: responsiveFontSize(2), width: width - 80, fontFamily: Fonts.poppins.semiBoldItalic, color: AppColor.antiqueWhite }]}>Revamp Your Wardrobe, Redefine Your Style: Where Trends and Taste Collide at Style Exchange!</Text> */}
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 0.5,
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: width / 3,
        height: width / 3,
        marginBottom: 16,
        resizeMode: 'contain',
        zIndex: 999
    },
    appName: {
        fontSize: responsiveFontSize(3),
        color: '#fff',
        fontFamily: Fonts.lobster.regular
    },
});

export default SplashScreen;
