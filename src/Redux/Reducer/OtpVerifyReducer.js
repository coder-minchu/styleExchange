const initialState = {
    OTPVERIFY: '',
};

const OtpVerifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OtpVerify':
            return { ...state, OTPVERIFY: action.payload, loading: false };
        default:
            return state;
    }
};

export default OtpVerifyReducer;
