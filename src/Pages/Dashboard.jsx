// react
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
// material-ui
import { makeStyles, Typography } from '@material-ui/core';
// services
import { isLogin } from '../services/loginServices';
// components
import Panel from '../components/Panel';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex'
  },
  content: {
    padding: '90px 30px'
  },
}));


// DASHBOARD COMPONENT
export default function Dashboard() {

  const history = useHistory();
  const styles = useStyles();
  const empr = useSelector(state => state.loginReducer.empresaSelecionada);

  useEffect(() => {
    if (!isLogin()) history.push('/');
  }, [history]);

  if (!isLogin()) return <div></div>

  return (
    <div className={styles.container}>
      {console.log('selecionada ', empr.id)}
      <Panel />

      <div className={styles.content}>
        <Typography paragraph>
          Hi, I'm Dashboard
        </Typography>
      </div>

    </div>
  );
};
