// react
import React, { useState } from 'react';
// material-ui
import {
  AppBar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
// redux
import { userLogout } from '../store/Login/Login.action';
import { useDispatch } from 'react-redux';
// icons
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
// styles
import style from './TopBarStyles';
import { withStyles } from '@material-ui/core/styles';
// services
import { isLogin, loggedUser } from '../services/isLogin';
// image
import logo from '../assets/logo-softrom.png';

const StyledMenu = withStyles({
  paper: {
    boxShadow: '1px 1px 6px gray',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(() => ({
  root: {
    // width: 150
  },
}))(MenuItem);


// TOPBAR COMPONENT
export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();
  const styles = style();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();

  const username = loggedUser().username.split(' ')[0];
  // uppercase username first letter
  const usernameUppercase = username[0].toUpperCase() + username.slice(1);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(userLogout());
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <div className={styles.root}>

      <AppBar position="static">

        <Toolbar>

          <Box className={styles.title}>
            <img src={logo} alt="SoftRom Logo" title="SoftRom" />
          </Box>

          {isMobile
            ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleClick}
                >
                  <MenuIcon />
                </IconButton>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem>
                    <ListItemIcon >
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={usernameUppercase} onClick={handleClose} />
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={isLogin ? <span>Logout</span> : <span>Login</span>}
                      onClick={logout}
                    />
                  </StyledMenuItem>

                </StyledMenu>
              </>
            )
            : (
              <>
                <Typography className={styles.welcome}>
                  Welcome, <span>{usernameUppercase}</span>
                </Typography>
                <Button
                  color="inherit"
                  className={styles.loginLogoutButton}
                  onClick={logout}
                >
                  {isLogin ? <span>Logout</span> : <span>Login</span>}
                </Button>
              </>
            )}

        </Toolbar>
      </AppBar>
    </div >
  );
};
