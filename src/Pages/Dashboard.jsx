// react
import React, { useEffect } from 'react';
import { useHistory } from 'react-router'
// redux
import { useSelector } from 'react-redux';
import { isLogin } from '../services/loginServices';
// componentes
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
