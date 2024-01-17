import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomPhoneInput from '../CustomPhoneInput';
import CustomLoginButton from '../CustomLoginButton';
import { customStyles } from '../../utils/Styles';
import { AppColor } from '../../utils/AppColor';
import { responsiveFontSize } from '../../utils/Dimensions/Dimension';
import { Fonts } from '../../utils/Fonts';
import LinearGradient from 'react-native-linear-gradient';

const LoginBottomSheet = ({ phoneNumber, setPhoneNumber, errorText, setErrorText, handleLogin, loading, closeBottomSheet }) => {
    return (
        <LinearGradient colors={AppColor.LinearGradient1} style={styles.container}>
            <TouchableOpacity
                onPress={closeBottomSheet}
                style={{
                    position: 'absolute',
                    top: Platform.OS === 'ios' ? 30 : 20,
                    right: Platform.OS === 'ios' ? 20 : 15,
                }}>
                <Icon
                    name="close-outline"
                    size={30}
                    color="white"
                />
            </TouchableOpacity>
            <Text style={[customStyles.boldText, { color: AppColor.white, fontSize: responsiveFontSize(2.5), padding: 15 }]}>
                India's #1 Online Thrift Store
            </Text>
            <CustomPhoneInput value={phoneNumber} onChangeText={setPhoneNumber} />
            <View style={styles.errorView}>
                {errorText && <Text style={[customStyles.simpleText, { fontSize: responsiveFontSize(1), paddingLeft: 2, color: AppColor.crimson }]}>{errorText}</Text>}
            </View>
            <CustomLoginButton phoneNumber={phoneNumber} onPress={handleLogin} loading={loading} />
        </LinearGradient>
    );
};

export default LoginBottomSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: 'white',
        width: '90%',
        marginTop: '10%',
    },
    inputContainer1: {
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        height: Platform.OS === 'ios' ? 30 : 40,
        marginLeft: 10,
        color: AppColor.black,
        fontSize: responsiveFontSize(1.2),
        fontFamily: Fonts.poppins.semiBold,
    },
    errorView: {
        marginBottom: 20,
        // backgroundColor: 'red',
        width: '90%',
        padding: 1
    },
    loginButton: {
        backgroundColor: AppColor.blueViolet,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '90%',
    },
    loginButtonText: {
        color: 'white',
        fontSize: responsiveFontSize(1.6),
        fontFamily: Fonts.poppins.bold,
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        color: 'white',
    },
    otpinput: {
        width: 50,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        textAlign: 'center',
        backgroundColor: 'white',
    },
    contineuButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 14,
        paddingVertical: 14,
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 10,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});