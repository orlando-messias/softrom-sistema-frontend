import { createStore, combineReducers, applyMiddleware } from 'redux';
import loginReducer from './Login/Login.reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  loginReducer: loginReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;