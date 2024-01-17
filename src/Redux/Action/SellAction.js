import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils/BaseUrl';
import axios from 'axios';

export const SellAction = (params, token) => {
    // console.log('params', params);
    var formdata = new FormData();
    formdata.append('parentCategories_Id', params.parentCategories_Id);
    formdata.append('subCategories_Id', params.subCategories_Id);
    formdata.append('sub_subCategories_Id', params.sub_subCategories_Id);
    formdata.append('user_Id', params.user_Id);
    formdata.append('title', params.title);
    formdata.append('description', params.description);
    formdata.append('price', params.price);
    formdata.append('depositAmount', params.depositAmount);
    formdata.append('details', params.details);
    formdata.append('condition', params.condition);
    formdata.append('brand', params.brand);
    formdata.append('size', params.size);
    formdata.append('purchasePrice', params.purchasePrice);
    formdata.append('status', params.status);
    formdata.append('longitude', params.longitude);
    formdata.append('latitude', params.latitude);
    formdata.append('address', params.address);
    formdata.append('city', params.city);
    formdata.append('state', params.state);
    params.upload.forEach(element => {
        formdata.append('upload', element, element.filename);
    });
    console.log('formdata', formdata);

    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}products/add`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    "ngrok-skip-browser-warning": 'true',
                },
                body: formdata,
            });

            const res = await response.json();
            console.log('res....', res);

            if (res) {
                dispatch({ type: 'SellData', payload: res });
            } else {
                dispatch({ type: 'SellData', payload: res });
            }
        } catch (error) {
            console.error('Error in SellData:', error);
        }
    };
};
