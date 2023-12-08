import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppColor } from '../../utils/AppColor';
import { height, responsiveFontSize } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import CustumTabButton from '../../Components/Home/CustumTabButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyTabBar({ state, descriptors, navigation }) {

    return (
        <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 70, borderTopWidth: 0.5, borderColor: AppColor.borderColor }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined && options.title !== ''
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = async () => {
                    console.log('onpress', route.name);
                    const token = await AsyncStorage.getItem('Token');

                    if (route.name === "Sell" && !token) {
                        options.bottomSheetVisible(true)
                        return;
                    } else if (route.name === "Chats" && !token) {
                        options.bottomSheetVisible(true)
                        return;

                    } else if (route.name === "Account" && !token) {
                        options.bottomSheetVisible(true)
                        return;

                    }
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: 'center' }}>
                        {label === 'Sell' ? (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <CustumTabButton isFocused={isFocused} />
                            </View>
                        ) : (
                            <View style={styles.tabContainer}>
                                <LinearGradient
                                    colors={
                                        isFocused
                                            ? AppColor.LinearGradient1
                                            : ['transparent', 'transparent']
                                    }
                                    style={styles.linearGradient}>
                                    <Icon
                                        name={options.iconName}
                                        size={height / 50}
                                        color={isFocused ? 'white' : 'grey'}
                                        style={{ zIndex: 999 }}
                                    />
                                </LinearGradient>
                            </View>
                        )}
                        {label !== 'Sell' &&
                            <Text
                                style={{
                                    color: isFocused ? AppColor.blueViolet : 'grey',
                                    ...styles.iconText,
                                }}>
                                {label}
                            </Text>
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default MyTabBar;

const styles = StyleSheet.create({
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
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
        fontSize: responsiveFontSize(1.4),
        fontFamily: Fonts.lobster.regular,
        // color: 'grey'
    },
});
