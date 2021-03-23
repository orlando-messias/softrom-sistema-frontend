// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { userLoginSubmit, errorToFalse } from '../store/Login/Login.action';
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
// services
import { isLogin, loginValidation } from '../services/loginServices';


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
  const error = useSelector(state => state.loginReducer.error);
  const errorMessage = useSelector(state => state.loginReducer.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin()) history.push('/dashboard');
  }, [history]);

  useEffect(() => {
    if (success && !isLogin()) {
      toast.success('Login Efetuado com Sucesso!');
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/dashboard');
    }
    if (error) {
      toast.error(errorMessage);
      setUserLogin({ username: '', password: '' });
      dispatch(errorToFalse());
    }
  }, [success, error, dispatch, errorMessage, history, user]);

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

  const handleEnter = (e) => {
    if (
      loginValidation(userLogin.username) &&
      loginValidation(userLogin.password) &&
      e.key === 'Enter'
    )
      login();
  };


  if (isFetching) return (
    <div className={styles.progress}>
      <LinearProgress />
    </div>
  );

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
            error={!loginValidation(userLogin.username)}
          />
          <TextField
            name="password"
            label="Senha"
            required
            type="password"
            className={styles.inputForm}
            onChange={handleInputChange}
            onKeyDown={handleEnter}
            InputLabelProps={{
              className: styles.floatingLabelFocusStyle
            }}
            error={!loginValidation(userLogin.password)}
          />
        </Box>

        <Button
          color="primary"
          variant="contained"
          onClick={login}
          disabled={!(loginValidation(userLogin.username) && loginValidation(userLogin.password))}
        >
          ENTRAR
        </Button>
      </Paper>
    </Box>
  );
};