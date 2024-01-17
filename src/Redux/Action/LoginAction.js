import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';

export const LoginAction = params => {
  console.log('phoneNumber params', params);

  var raw = JSON.stringify({
    phoneNumber: `+91${params}`
  });
  return async dispatch => {
    try {
      const response = await fetch(`${BASE_URL}user/otplogin`, {
        method: 'POST', // Corrected the method name
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": 'true',
        },
        body: raw,
      });

      const res = await response.json();
      console.log('Resssss....', res);

      if (res) {
        dispatch({ type: 'LoginData', payload: res });
      } else {
        dispatch({ type: 'LoginData', payload: res });
      }
    } catch (error) {
      console.error('Error in LoginData:', error);
    }
  };
};
