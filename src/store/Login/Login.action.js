export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const LOADING = 'LOADING';

export const userLoginSubmit = (user) => {
  localStorage.setItem('user', JSON.stringify(user));

  return {
    type: LOGIN_SUBMIT,
    payload: user,
    isFetching: false
  }
};