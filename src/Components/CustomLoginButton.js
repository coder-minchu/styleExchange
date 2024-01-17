import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Fonts } from '../utils/Fonts';
import { responsiveFontSize } from '../utils/Dimensions/Dimension';

const CustomLoginButton = ({ phoneNumber, onPress, loading }) => (
    <TouchableOpacity disabled={!phoneNumber} style={styles.loginButton} onPress={onPress}>
        {loading ? <ActivityIndicator size='small' color='white' /> : <Text style={styles.loginButtonText}>Login</Text>}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '90%',
    },
    loginButtonText: {
        color: 'white',
        fontSize: responsiveFontSize(1.2),
        fontFamily: Fonts.poppins.semiBold,
    },
});

export default CustomLoginButton;
