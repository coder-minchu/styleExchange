import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';

export const GetUserAction = params => {
    return async dispatch => {
        try {
            const response = await axios.get(`${BASE_URL}user`, {
                headers: {
                    Authorization: params,
                    "ngrok-skip-browser-warning": 'true',
                },
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
                    Authorization: token,
                    "ngrok-skip-browser-warning": 'true',
                },
            });
            const res = response.data;
            dispatch({ type: 'UpdateUser', payload: res });
        } catch (error) {
            console.error('Error in UpdateUser:', error);
        }
    };
};

export const GetUploadedProducts = token => {
    return async dispatch => {
        try {
            const response = await axios.get(`${BASE_URL}allProductsData/user/get`, {
                headers: {
                    Authorization: token,
                    "ngrok-skip-browser-warning": 'true',
                },
            });
            const res = response.data;
            console.log(
                '🚀 ~ file: GetUserAction.js:45 ~ GetUploadedProducts ~ res:',
                res,
            );
            dispatch({ type: 'UploadedProducts', payload: res });
        } catch (error) {
            console.error('Error in UploadedProducts:', error);
        }
    };
};

export const UploadedProductAction = (params, token) => {
    // console.log('params', params);
    var formdata = new FormData();
    formdata.append('product_id', params.product_id);
    formdata.append('title', params.title);
    formdata.append('brand', params.brand);
    params.upload.forEach(element => {
        formdata.append('upload', element, element.filename);
        console.log(element)
    });
    // formdata.append('upload', { name: element.filename, uri: element.path, type: element.mime });
    console.log('formdata', formdata);
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}productsData/update/user`, {
                method: 'POST',
                headers: {
                    "Authorization":
                        token,
                        "ngrok-skip-browser-warning": 'true',
                },
                body: formdata,
            });

            const res = await response.json();
            console.log('res....', res);

            if (res) {
                dispatch({ type: 'EditedProduct', payload: res });
            }
        } catch (error) {
            console.error('Error in EditedProduct:', error);
        }
    };
};
