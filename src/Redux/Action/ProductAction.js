import { BASE_URL } from '../../utils/BaseUrl';

export const fetchProductAction = () => {
  return async dispatch => {
    fetch(`${BASE_URL}get/allProductsData`, {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": 'true',
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log('asfdsafas....', res);
        if (res) {
          dispatch({ type: 'fetchProduct', payload: res });
        } else {
          dispatch({ type: 'fetchProduct', payload: res });
        }
      })
      .catch(error => {
        console.log(' error..fetchProduct..', error);
      });
  };
};
