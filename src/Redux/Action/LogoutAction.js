import {BASE_URL} from '../../utils/BaseUrl';
import axios from 'axios';

export const LogoutAction = params => {
  // console.log('params', params);
  var formdata = new FormData();
  formdata.append('email', params.email);
  formdata.append('password', params.password);

  return async dispatch => {
    try {
      const response = await fetch(`${BASE_URL}logout`, {
        method: 'POST', // Corrected the method name

        body: formdata,
      });

      const res = await response.json();
      console.log('Logout....', res);

      if (res) {
        dispatch({type: 'LogoutData', payload: res});
      } else {
        dispatch({type: 'LogoutData', payload: res});
      }
    } catch (error) {
      console.error('Error in LoginData:', error);
    }
  };
};
