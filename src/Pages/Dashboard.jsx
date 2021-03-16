// react
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
// material-ui
import { makeStyles, Typography } from '@material-ui/core';
// services
import { isLogin } from '../services/loginServices';
// components
import Panel from '../components/Panel';

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

  useEffect(() => {
    if (!isLogin()) history.push('/');
  }, []);

  if (!isLogin()) return <div></div>

  return (
    <div className={styles.container}>

      <Panel />

      <div className={styles.content}>
        <Typography paragraph>
          Hi, I'm Dashboard
        </Typography>
      </div>

    </div>
  );
};
