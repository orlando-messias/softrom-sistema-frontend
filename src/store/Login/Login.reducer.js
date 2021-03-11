import { LOGIN_SUBMIT, GET_MY_DATA, LOGIN_ERROR } from './Login.action';

const INITIAL_STATE = {
  user: {},
  error: false
};

const loginReducer = (state = INITIAL_STATE, action) => {
  // console.log('HERE IT IS ', action.username);
  switch (action.type) {
    case LOGIN_SUBMIT:
      return { ...state, user: action.user }
    case GET_MY_DATA:
      return state
    case LOGIN_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
};

export default loginReducer;