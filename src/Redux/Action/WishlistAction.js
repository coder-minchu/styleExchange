import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';

export const AddWishlistAction = (params, token) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${BASE_URL}wishlist/add`, params, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": 'true',
                }
            });

            const res = response.data;
            // console.log('Response:', res);

            dispatch({ type: 'addWishlist', payload: res });
        } catch (error) {
            console.error('Error in addWishlist:', error);
        }
    };
};

export const GetWishlistAction = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get(`${BASE_URL}wishlist`, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": 'true',
                },
            });

            const res = response.data;
            // console.log('Response:', res);

            dispatch({ type: 'getWishlist', payload: res });
        } catch (error) {
            console.error('Error in getWishlist:', error);
        }
    };
};
