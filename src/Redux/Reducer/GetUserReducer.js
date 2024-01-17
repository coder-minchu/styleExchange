const initialState = {
    USERDETAILS: '',
    UPDATEUSER: '',
    loading: true,
    UPLOADEDPRODUCTS: '',
    EDITEDPRODUCT: '',
};

const GetUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GetUser':
            return { ...state, USERDETAILS: action.payload, loading: false };
        case 'UpdateUser':
            return { ...state, UPDATEUSER: action.payload, loading: false };
        case 'UploadedProducts':
            return { ...state, UPLOADEDPRODUCTS: action.payload, loading: false };
        case 'EditedProduct':
            return { ...state, EDITEDPRODUCT: action.payload, loading: false };
        default:
            return state;
    }
};

export default GetUserReducer;
