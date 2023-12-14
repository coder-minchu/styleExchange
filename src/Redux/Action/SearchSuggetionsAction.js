import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';

export const SearchSuggetionsAction = params => {
    return async dispatch => {
        try {
            const response = await axios.post(`${BASE_URL}products/suggation`, params, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const res = response.data;
            // console.log('Response:', res);

            dispatch({ type: 'SearchSuggetions', payload: res });
        } catch (error) {
            console.error('Error in SearchSuggetions:', error);
        }
    };
};
