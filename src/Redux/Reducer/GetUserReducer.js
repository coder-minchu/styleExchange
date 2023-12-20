const initialState = {
    USERDETAILS: '',
    UPDATEUSER: '',
    loading: true
};

const GetUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GetUser':
            return { ...state, USERDETAILS: action.payload, loading: false };
        case 'UpdateUser':
            return { ...state, UPDATEUSER: action.payload, loading: false };
        default:
            return state;
    }
};

export default GetUserReducer;
