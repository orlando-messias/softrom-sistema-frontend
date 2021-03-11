// AWS
import { Auth } from 'aws-amplify';

// CONSTS
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOADING = 'LOADING';
export const GET_LOGIN_DATA = 'GET_MY_DATA';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const IS_FETCHING = 'IS_FETCHING';

export const loginSuccess = (username, token) => {
  return {
    type: LOGIN_SUCCESS,
    user: { username, token },
    success: true,
    isFetching: false
  }
};

export const loginError = () => {
  return {
    type: LOGIN_ERROR,
    error: true,
    isFetching: false
  }
};

export const isFetching = () => {
  return {
    type: IS_FETCHING,
    isFetching: true
  }
};

export const userLoginSubmit = (username, password) => {
  return (dispatch) => {
    dispatch(isFetching());

    Auth.signIn({
      username,
      password
    })
      .then(() => {
        Auth.currentSession()
          .then(userSession => {
            const token = userSession.idToken.jwtToken;
            dispatch(loginSuccess(username, token));
          })
          .catch((err) => {
            console.log(err);
            dispatch(loginError())
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginError())
      });
  }

};

export const loginData = () => {
  return {
    type: GET_LOGIN_DATA
  }
};

export const getLoginData = () => {
  return (dispatch) => {
    return dispatch(loginData())
  }
};