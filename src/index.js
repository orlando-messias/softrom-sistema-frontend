// react
import React from "react";
import ReactDOM from "react-dom";

// redux store
import { Provider } from "react-redux";
import store from "./store/store";

import { AppContextProvider } from "./context/AppContext";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1769aa", //azul
    },
    secondary: {
      main: "#b2102f", //vermelho
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <AppContextProvider>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
      ,
    </AppContextProvider>
    {/* each popup closes after 3 segundos */}
    <ToastContainer autoClose={3000} />
  </Provider>,
  document.getElementById("root")
);