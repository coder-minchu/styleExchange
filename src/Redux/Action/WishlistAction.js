import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';

export const AddWishlistAction = (params, token) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${BASE_URL}wishlist/add`, params, {
                headers: {
                    'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6OTE5NjkxNTExNDk3LCJpYXQiOjE3MDMwNTUwOTIsImV4cCI6MTcwMzA3MzA5Mn0.uSI-xeWpFEkxjxZNRTYDFwfdqIIfTqNdZHpi_ADwnHQ",
                    'Content-Type': 'application/json',
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
                    'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6OTE5NjkxNTExNDk3LCJpYXQiOjE3MDMwNTUwOTIsImV4cCI6MTcwMzA3MzA5Mn0.uSI-xeWpFEkxjxZNRTYDFwfdqIIfTqNdZHpi_ADwnHQ",
                    'Content-Type': 'application/json',
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
