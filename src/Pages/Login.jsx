// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { userLoginSubmit } from '../store/Login/Login.action';

// material-ui
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  LinearProgress
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

// styles
import style from './LoginStyles';

// LOGIN COMPONENT
export default function Login() {
  const [userLogin, setUserLogin] = useState({
    username: '',
    password: ''
  });

  const history = useHistory();
  
  // store
  const user = useSelector(state => state.loginReducer.user);
  const success = useSelector(state => state.loginReducer.success);
  const isFetching = useSelector(state => state.loginReducer.isFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('user')) history.push('/dashboard');
    if (success) {
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/dashboard');
    }
  }, [success, isFetching]);

  const styles = style();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setUserLogin(prevState => ({
      ...prevState,
      [name]: value
    }))
  };

  const login = () => {
    const { username, password } = userLogin;
    dispatch(userLoginSubmit(username, password))
  };

  if(isFetching) return <div className={styles.progress}><LinearProgress wid /></div>

  return (
    <Box className={styles.mainContainer}>

      <Paper elevation={2} className={styles.loginContainer}>
        <div className={styles.iconContainer}>
          <LockIcon />
        </div>
        <Typography variant="h6">
          Login
        </Typography>

        <Box className={styles.fieldsBox}>
          <TextField
            name="username"
            label="Usuário"
            autoFocus={true}
            required
            className={styles.inputForm}
            onChange={handleInputChange}
            InputLabelProps={{
              className: styles.floatingLabelFocusStyle
            }}
          />
          <TextField
            name="password"
            label="Senha"
            required
            type="password"
            className={styles.inputForm}
            onChange={handleInputChange}
            InputLabelProps={{
              className: styles.floatingLabelFocusStyle
            }}
          />
        </Box>

        <Button
          color="primary"
          variant="contained"
          onClick={login}
          disabled={!userLogin.username || !(userLogin.password.length >= 3)}
        >
          ENTRAR
        </Button>
      </Paper>
    </Box>
  );
};