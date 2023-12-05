const initialState = {
  FETCHPRODUCTS: '',
};

const fetchProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'fetchProduct':
      return {...state, FETCHPRODUCTS: action.payload, loading: false};
    default:
      return state;
  }
};

export default fetchProductReducer;
