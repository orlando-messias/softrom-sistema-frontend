// react
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// pages and components
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Empresas from './Pages/Empresas';
import Bancos from './Pages/Bancos';
import SelecaoEmpresa from './Pages/SelecaoEmpresa';

function Routes() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/select-empresa" exact component={SelecaoEmpresa} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/empresas" component={Empresas} />
      <Route path="/bancos" component={Bancos} />
    </Router>
  );
};

export default Routes;