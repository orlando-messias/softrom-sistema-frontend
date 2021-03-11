// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

// redux
import { useDispatch } from 'react-redux';
import { userLoginSubmit } from '../store/Login/Login.action';

// aws
import { Auth } from 'aws-amplify';

// material-ui
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

// styles
import styles from './LoginStyles';

// Login component
export default function Login() {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('user')) history.push('/dashboard');
  }, []);

  const classes = styles();

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setUser(prevState => ({
      ...prevState,
      [name]: value
    }))
  };

  const login = () => {
    const { username, password } = user;

    Auth.signIn({
      username,
      password
    })
      .then(() => {
        Auth.currentSession()
          .then(userSession => {
            history.push('/dashboard');
            const user = { username, token: userSession.idToken.jwtToken };
            dispatch(userLoginSubmit(user));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box className={classes.mainContainer}>

      <Paper elevation={2} className={classes.loginContainer}>
        <div className={classes.iconContainer}>
          <LockIcon />
        </div>
        <Typography variant="h6">
          Login
        </Typography>

        <Box className={classes.fieldsBox}>
          <TextField
            name="username"
            label="Usuário"
            autoFocus={true}
            required
            className={classes.inputForm}
            onChange={handleInputChange}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle
            }}
          />
          <TextField
            name="password"
            label="Senha"
            required
            type="password"
            className={classes.inputForm}
            onChange={handleInputChange}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle
            }}
          />
        </Box>

        <Button
          color="primary"
          variant="contained"
          onClick={login}
          disabled={!user.username || !(user.password.length >= 3)}
        >
          ENTRAR
        </Button>
      </Paper>
    </Box>
  );
};