export const initialState = {
  userDetails: null,
  token: null,
  loading: false,
  errorMessage: null
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...initialState,
        loading: true
      };
    case "DONE_LOADING":
      return {
        ...initialState,
        loading: false
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false
      };
    case "REGISTER_SUCCESS":
      return {
        ...initialState,
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: null,
        token: null
      };
 
    case "AUTH_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };
    case "DONE_ERROR":
      return {
        ...initialState,
        errorMessage: null
      };
 
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};