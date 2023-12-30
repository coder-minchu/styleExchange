const initialState = {
    SELLDATA: '',
};

const SellReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SellData':
            return { ...state, SELLDATA: action.payload, loading: false };
        default:
            return state;
    }
};

export default SellReducer;
