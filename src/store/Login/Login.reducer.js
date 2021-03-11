import { LOGIN_SUCCESS, GET_LOGIN_DATA, LOGIN_ERROR, IS_FETCHING } from './Login.action';

const INITIAL_STATE = {
  user: {},
  success: false,
  isFetching: false,
  error: false
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        success: action.success,
        isFetching: action.isFetching
      }
    case IS_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        isFetching: action.isFetching
      }
    case GET_LOGIN_DATA:
      return state
    default:
      return state
  }
};

export default loginReducer;