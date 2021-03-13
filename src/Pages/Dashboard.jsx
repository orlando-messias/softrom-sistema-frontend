// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router'
// redux
import { useSelector } from 'react-redux';
import { isLogin } from '../services/isLogin';
// import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';

import TopBar from '../components/TopBar';


// DASHBOARD COMPONENT
export default function Dashboard() {
  
  const history = useHistory();
  
  const user = useSelector(state => state.loginReducer.user);
  
  useEffect(() => {
    if (!isLogin()) history.push('/');
  }, []);
  
  if (!isLogin()) return <div></div>
  
  return (
    <TopBar username={user.username} />
  )
};
