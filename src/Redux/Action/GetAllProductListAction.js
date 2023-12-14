import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';

export const ProductListAction = params => {
    return async dispatch => {
        try {
            const response = await axios.get(`${BASE_URL}product`, {
                params: params,
                headers: {
                    'Content-Type': 'application/json',
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
