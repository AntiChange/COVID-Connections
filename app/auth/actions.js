import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const ROOT_URL = 'https://htn-21.herokuapp.com';
const storageKey = "authToken";
 
export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginPayload)
  };
 
  try {
    dispatch({ type: 'SET_LOADING' });
    let response = await fetch(`${ROOT_URL}/api/users/login`, requestOptions);
    let data = await response.json();
 
    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      AsyncStorage.setItem(storageKey, data.token);
      return data
    }
 
    dispatch({ type: 'AUTH_ERROR', error: data.error[0] });
    return;
  } catch (error) {
    dispatch({ type: 'AUTH_ERROR', error: error });
  }
}

export async function register(dispatch, payload) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  };
 
  try {
    dispatch({ type: 'SET_LOADING' });
    let response = await fetch(`${ROOT_URL}/api/users/register`, requestOptions);
    let status = await response.json();
 
    if (status.success) {
      dispatch({ type: 'REGISTER_SUCCESS' });
      return true;
    }
 
    dispatch({ type: 'AUTH_ERROR', error: data.error[0] });
    return false;
  } catch (error) {
    dispatch({ type: 'AUTH_ERROR', error: error });
    return false;
  }
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  await AsyncStorage.removeItem(storageKey);
}

export async function restoreToken(dispatch) {
  let userToken;

  try {
    userToken = await AsyncStorage.getItem(storageKey);
  } catch (e) {
    userToken = null;
  }
  if (userToken == null) {
    dispatch({ type: 'LOGOUT' });
  }
  else {
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);

    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      dispatch({ type: 'LOGOUT' });
    }
    else {
      const data = {user: decoded, token: token};
      dispatch({ type: 'LOGIN_SUCCESS', payload: data});
    }
  }
}