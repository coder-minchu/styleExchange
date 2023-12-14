const initialState = {
    CATEGORIES: '',
};

const CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Categories':
            return { ...state, CATEGORIES: action.payload, loading: false };
        default:
            return state;
    }
};

export default CategoriesReducer;
