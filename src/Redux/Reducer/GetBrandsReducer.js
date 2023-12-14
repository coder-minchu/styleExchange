const initialState = {
    BRANDSGET: '',
    loading: true
};

const BrandsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BrandList':
            return { ...state, BRANDSGET: action.payload, loading: false };
        default:
            return state;
    }
};

export default BrandsReducer;
