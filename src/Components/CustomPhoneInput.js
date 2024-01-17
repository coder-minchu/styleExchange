import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { responsiveFontSize } from '../utils/Dimensions/Dimension';
import { Fonts } from '../utils/Fonts';

const styles = StyleSheet.create({
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
    input: {
        flex: 1,
        height: Platform.OS === 'ios' ? 30 : 40,
        marginLeft: 10,
        color: 'black',
        fontSize: responsiveFontSize(1.2),
        fontFamily: Fonts.poppins.semiBold,
    },
});

const CustomPhoneInput = ({ value, onChangeText }) => (
    <View style={styles.inputContainer}>
        <Text style={{ marginRight: 10, color: 'black', fontSize: responsiveFontSize(1.2), fontFamily: Fonts.poppins.semiBold }}>+91</Text>
        <TextInput
            maxLength={10}
            style={styles.input}
            placeholder="Enter your mobile number"
            keyboardType="numeric"
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);

export default CustomPhoneInput;
