// react
import React from 'react';
import ReactDOM from 'react-dom';

// redux store
import { Provider } from 'react-redux';
import store from './store/store';

import { AppContextProvider } from './context/AppContext';


// react-toastify
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
    {/* each popup closes after 3 segundos */}
    <ToastContainer autoClose={3000} />
  </Provider>,
  document.getElementById('root')
);
