import { Auth } from 'aws-amplify';

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const LOADING = 'LOADING';
export const GET_MY_DATA = 'GET_MY_DATA';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const userLogin = (username, token) => {
  return {
    type: LOGIN_SUBMIT,
    user: { username, token }
  }
}

export const loginError = () => {
  return {
    type: LOGIN_ERROR,
    error: true
  }
}

export const userLoginSubmit = (username, password) => {
  return (dispatch) => {
    Auth.signIn({
      username,
      password
    })
      .then(() => {
        Auth.currentSession()
          .then(userSession => {
            // history.push('/dashboard');
            const token = userSession.idToken.jwtToken;
            dispatch(userLogin(username, token));
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

export const myData = () => {
  return {
    type: GET_MY_DATA
  }
}

export const getData = () => {
  return (dispatch) => {
    return dispatch(myData())
  }
}