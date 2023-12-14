const initialState = {
  LOGINDATA: '',
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LoginData':
      return { ...state, LOGINDATA: action.payload, loading: false };
    default:
      return state;
  }
};

export default LoginReducer;
