// AWS
import { Auth } from 'aws-amplify';

// CONSTS
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOADING = 'LOADING';
export const GET_LOGIN_DATA = 'GET_MY_DATA';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const IS_FETCHING = 'IS_FETCHING';
export const ERROR_TO_FALSE = 'ERROR_FALSE';
export const LOGOUT = 'LOGOUT';
export const SELECT_COMPANY = 'SELECT_COMPANY';

export const loginSuccess = (username, token) => {
  return {
    type: LOGIN_SUCCESS,
    user: { username, token },
    success: true,
    isFetching: false
  }
};

export const loginError = (message) => {
  return {
    type: LOGIN_ERROR,
    message,
    error: true,
    isFetching: false
  }
};

export const errorToFalse = () => {
  return {
    type: ERROR_TO_FALSE,
    error: false
  }
}

export const isFetching = () => {
  return {
    type: IS_FETCHING,
    isFetching: true
  }
};

export const selectCompany = (empresa) => {
  return {
    type: SELECT_COMPANY,
    empresaSelecionada: empresa
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
            dispatch(loginError(err.message))
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginError(err.message))
      });
  }

};

export const userClear = () => {
  return {
    type: LOGOUT,
    user: {},
    loading: false,
    success: false,
    error: false
  }
}

export const userLogout = () => {
  Auth.signOut()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (dispatch) => {
    dispatch(userClear());
  };
};