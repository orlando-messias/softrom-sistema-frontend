// react
import React from 'react';

// redux
import { useSelector } from 'react-redux';

// DASHBOARD COMPONENT
export default function Dashboard() {

  // store
  const user = useSelector(state => state.loginReducer.user);
  
  return (
    <div>
      <h2>Hi, I'm Dashboard</h2>
      {console.log(user)}
    </div>
  );
};
