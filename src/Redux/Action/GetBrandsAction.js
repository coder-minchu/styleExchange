import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';

export const BrandsAction = params => {
    return async dispatch => {
        try {
            const response = await axios.post(`${BASE_URL}brand`, params, {
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": 'true',
                }
            });

            const res = response.data;
            // console.log('Response:', res);

            dispatch({ type: 'BrandList', payload: res });
        } catch (error) {
            console.error('Error in BrandList:', error);
        }
    };
};
