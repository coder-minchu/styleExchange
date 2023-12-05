import {BASE_URL} from '../../utils/BaseUrl';
import axios from 'axios';

export const LoginAction = params => {
  console.log('params', params);
  var formdata = new FormData();
  formdata.append('email', params.email);
  formdata.append('password', params.password);

  return async dispatch => {
    try {
      const response = await fetch(`${BASE_URL}login-post`, {
        method: 'POST', // Corrected the method name

        body: formdata,
      });

      const res = await response.json();
      console.log('Resssss....', res);

      if (res) {
        dispatch({type: 'LoginData', payload: res});
      } else {
        dispatch({type: 'LoginData', payload: res});
      }
    } catch (error) {
      console.error('Error in LoginData:', error);
    }
  };
};
