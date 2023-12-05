const initialState = {
  LOGOUTDATA: '',
};

const LogoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LogoutData':
      return {...state, LOGOUTDATA: action.payload, loading: false};
    default:
      return state;
  }
};

export default LogoutReducer;
