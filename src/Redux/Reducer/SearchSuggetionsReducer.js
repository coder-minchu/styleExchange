const initialState = {
    SEARCHSUGGETIONS: [],
    loading: true
};

const SearchSuggetionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SearchSuggetions':
            return { ...state, SEARCHSUGGETIONS: action.payload, loading: false };
        default:
            return state;
    }
};

export default SearchSuggetionsReducer;
