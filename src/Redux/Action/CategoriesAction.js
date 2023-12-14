import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';

export const CategoriesAction = params => {

    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}Categories/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const res = await response.json();
            console.log('Resssss....', res);

            if (res) {
                dispatch({ type: 'Categories', payload: res });
            } else {
                dispatch({ type: 'Categories', payload: res });
            }
        } catch (error) {
            console.error('Error in Categories:', error);
        }
    };
};
