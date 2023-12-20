const initialState = {
    ADDWISHLIST: '',
    loading: false,
    WISHLIST: '',
};

const WishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addWishlist':
            return { ...state, ADDWISHLIST: action.payload, loading: false };
        case 'getWishlist':
            return { ...state, WISHLIST: action.payload, loading: false };
        default:
            return state;
    }
};

export default WishlistReducer;
