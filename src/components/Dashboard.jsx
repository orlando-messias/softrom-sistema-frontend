// react
import React, { useEffect } from 'react';
import { useHistory } from 'react-router'

// redux
import { useSelector } from 'react-redux';
import isLogin from '../services/isLogin';

// DASHBOARD COMPONENT
export default function Dashboard() {

  const history = useHistory();

  useEffect(() => {
    if (!isLogin()) history.push('/');
  }, []);

  // store
  const user = useSelector(state => state.loginReducer.user);

  return (
    <div>
      <h2>Hi, I'm Dashboard</h2>
      {console.log(user)}
    </div>
  );
};
