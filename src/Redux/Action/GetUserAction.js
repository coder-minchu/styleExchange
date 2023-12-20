import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';

export const GetUserAction = params => {
    return async dispatch => {
        try {
            const response = await axios.get(`${BASE_URL}user`, {
                headers: {
                    'Authorization': params,
                }
            });
            const res = response.data;
            dispatch({ type: 'GetUser', payload: res });
        } catch (error) {
            console.error('Error in GetUser:', error);
        }
    };
};

export const UpdateUserAction = (params, token) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${BASE_URL}user/update`, params, {
                headers: {
                    'Authorization': token,
                }
            });
            const res = response.data;
            dispatch({ type: 'UpdateUser', payload: res });
        } catch (error) {
            console.error('Error in UpdateUser:', error);
        }
    };
};
