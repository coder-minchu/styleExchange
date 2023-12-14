import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';

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
                },
                body: raw,
            });

            const res = await response.json();
            console.log('Resssss....', res);

            if (res) {
                dispatch({ type: 'OtpVerify', payload: res });
            } else {
                dispatch({ type: 'OtpVerify', payload: res });
            }
        } catch (error) {
            console.error('Error in OtpVerify:', error);
        }
    };
};
