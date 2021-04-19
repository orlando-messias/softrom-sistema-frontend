import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  IS_FETCHING,
  ERROR_TO_FALSE,
  LOGOUT,
  SELECT_COMPANY,
  SET_ORIGIN
} from './Login.action';

const INITIAL_STATE = {
  user: {},
  success: false,
  isFetching: false,
  message: '',
  error: false,
  empresaSelecionada: '',
  origin: 0
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
        isFetching: action.isFetching,
        message: action.message
      }
    case ERROR_TO_FALSE:
      return {
        ...state,
        error: action.error,
      }
    case LOGOUT:
      return {
        ...state,
        user: action.user,
        loading: action.loading,
        success: action.success,
        error: action.error
      }
    case SELECT_COMPANY:
      return {
        ...state,
        empresaSelecionada: action.empresaSelecionada
      }
    case SET_ORIGIN:
      return {
        ...state,
        origin: action.origin
      }
    default:
      return state
  }
};

export default loginReducer;