import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import { customStyles } from '../../utils/Styles';
import { AppColor } from '../../utils/AppColor';
import { responsiveFontSize } from '../../utils/Dimensions/Dimension';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../utils/Fonts';
import { ActivityIndicator } from 'react-native-paper';

const OtpBottomSheet = ({ otp1, otp2, otp3, otp4, setOtp1, setOtp2, setOtp3, setOtp4, handleOtpContinue, loading, closeBottomSheet, errorText }) => {
    const otp1Ref = useRef();
    const otp2Ref = useRef();
    const otp3Ref = useRef();
    const otp4Ref = useRef();

    const handleOtpChange = (text, ref) => {
        if (text !== '' && ref.current) {
            ref.current.focus();
        }
    };

    return (
        <LinearGradient colors={AppColor.LinearGradient1} style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    setErrorText('')
                    closeBottomSheet();
                    setBottomSheetVisible(true);
                    bottomSheetRef.current?.expand();
                }}
                style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                }}
            >
                <Text style={{ color: 'white', fontSize: 16 }}>Back</Text>
            </TouchableOpacity>

            <Text style={[customStyles.boldText, { color: AppColor.white, fontSize: responsiveFontSize(2.5), padding: 20 }]}>Enter OTP</Text>

            <View style={styles.inputContainer1}>
                <TextInput
                    placeholder="_"
                    style={[styles.otpinput, { borderColor: errorText ? 'red' : 'white' }]}
                    maxLength={1}
                    keyboardType="numeric"
                    value={otp1}
                    onChangeText={(text) => {
                        setOtp1(text);
                        handleOtpChange(text, otp2Ref);
                    }}
                    ref={otp1Ref}
                />
                <TextInput
                    placeholder="_"
                    style={[styles.otpinput, { borderColor: errorText ? 'red' : 'white' }]}
                    maxLength={1}
                    keyboardType="numeric"
                    value={otp2}
                    onChangeText={(text) => {
                        setOtp2(text);
                        handleOtpChange(text, otp3Ref);
                    }}
                    ref={otp2Ref}
                />
                <TextInput
                    placeholder="_"
                    style={[styles.otpinput, { borderColor: errorText ? 'red' : 'white' }]}
                    maxLength={1}
                    keyboardType="numeric"
                    value={otp3}
                    onChangeText={(text) => {
                        setOtp3(text);
                        handleOtpChange(text, otp4Ref);
                    }}
                    ref={otp3Ref}
                />
                <TextInput
                    placeholder="_"
                    style={[styles.otpinput, { borderColor: errorText ? 'red' : 'white' }]}
                    maxLength={1}
                    keyboardType="numeric"
                    value={otp4}
                    onChangeText={(text) => setOtp4(text)}
                    ref={otp4Ref}
                />
            </View>

            <TouchableOpacity disabled={otp1 && otp2 && otp3 && otp4 ? false : true} onPress={handleOtpContinue} style={styles.contineuButton} >
                {loading ? <ActivityIndicator size='small' color={AppColor.white} /> :
                    <Text style={[customStyles.boldText, { color: AppColor.white, fontSize: responsiveFontSize(2) }]}>Continue</Text>
                }
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default OtpBottomSheet;

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