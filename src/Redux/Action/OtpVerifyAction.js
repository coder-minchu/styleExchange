import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';
import socketServcies from '../../utils/socketServcies';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OtpVerifyAction = params => {
    console.log('OTP params', params);

    var raw = JSON.stringify({
        OTP: params
    });
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}user/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": 'true',
                },
                body: raw,
            });

            const res = await response.json();
            console.log('Resssss....', res);

            if (res) {
                dispatch({ type: 'OtpVerify', payload: res });
                if (res.message === "login successfully") {
                    await AsyncStorage.setItem('Token', JSON.stringify(res.token));
                    await AsyncStorage.setItem('UserDetails', JSON.stringify(res.user));
                    socketServcies.initializeSocket();
                }
            } else {
                dispatch({ type: 'OtpVerify', payload: res });
            }
        } catch (error) {
            console.error('Error in OtpVerify:', error);
        }
    };
};
