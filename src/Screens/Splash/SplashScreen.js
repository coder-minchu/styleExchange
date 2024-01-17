import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize, width } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';
import { AppColor } from '../../utils/AppColor';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const SplashScreen = ({ navigation }) => {


    const handleDynamicLink = link => {
        console.log("🚀 ~ handleDynamicLink ~ link:", link)
        let productId = link.url.split('=').pop()
        // Handle dynamic link inside your own application
        if (link.url === `https://styleexchange.page.link/ProductDetails?productId=${productId}`) {
            navigation.navigate('ProductDetails', { product_id: productId })
            // Alert.alert('Product Details')
        }
    };

    useEffect(() => {
        console.log("🚀 ~ handleDynamicLink ~ link:")
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        // When the component is unmounted, remove the listener
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        dynamicLinks()
            .getInitialLink()
            .then(link => {
                let productId = link?.url?.split('=')?.pop()
                if (link?.url === `https://styleexchange.page.link/ProductDetails?productId=${productId}`) {
                    setTimeout(() => {
                        navigation.navigate('ProductDetails', { product_id: productId })
                    }, 1200)
                }
            });
    }, []);

    useEffect(() => {
        const checkIntroSlides = async () => {
            const sliderStorage = await AsyncStorage.getItem('showIntro');
            setTimeout(() => {
                navigation.navigate(sliderStorage ? 'Tabs' : 'AppIntroSliders');
            }, 1000);
        };

        checkIntroSlides();
    }, []);

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
