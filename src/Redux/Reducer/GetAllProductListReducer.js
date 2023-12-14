const initialState = {
    PRODUCTLIST: '',
    loading: true
};

const ProductListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ProductList':
            return { ...state, PRODUCTLIST: action.payload, loading: false };
        default:
            return state;
    }
};

export default ProductListReducer;
