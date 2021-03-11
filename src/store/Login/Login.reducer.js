import { LOGIN_SUBMIT, LOADING } from './Login.action';

const INITIAL_STATE = {
  user: {},
};

const loginReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_SUBMIT:
      return { ...state, user: payload, isFetching }
    default:
      return state
  }
};

export default loginReducer;