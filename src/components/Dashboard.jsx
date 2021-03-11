// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../store/Login/Login.action';


// Dashboard component
export default function Dashboard() {

  const user = useSelector(state => state.mylog.user)
  const error = useSelector(state => state.mylog.error)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getData());
  }, []);
  
  if (!user.username) return <div>Loading...</div>
  if (error) history.push('/')
  
  return (
    <div>
      <h2>Hi, I'm Dashboard</h2>
      {console.log('OPAS OPAS ', user)}
    </div>
  );
};
