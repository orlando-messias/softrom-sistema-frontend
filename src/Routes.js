// react
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// pages and components
import Login from './Pages/Login';
import Dashboard from './components/Dashboard';

function Routes() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  );
};

export default Routes;