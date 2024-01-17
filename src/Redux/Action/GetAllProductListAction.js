import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';

export const ProductListAction = params => {
    return async dispatch => {
        try {
            const response = await axios.get(`${BASE_URL}product/user`, {
                params: params,
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": 'true',
                },
            });
            const res = response.data;
            // console.log('Response:', res);
            dispatch({ type: 'ProductList', payload: res });
        } catch (error) {
            console.error('Error in ProductList:', error);
        }
    };
};

export const SingleProductAction = params => {
    return async dispatch => {
        try {
            const response = await axios.post(`${BASE_URL}singleProductsData/get/productId`, params, {
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": 'true',
                }
            });
            const res = response.data;
            // console.log('Response:', res);
            dispatch({ type: 'SingleProduct', payload: res });
        } catch (error) {
            console.error('Error in SingleProduct:', error);
        }
    };
};
