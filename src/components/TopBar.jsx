// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
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
  useMediaQuery,
  Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
// redux
import { userLogout } from '../store/Login/Login.action';
import { useDispatch, useSelector } from 'react-redux';
// icons
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// styles
import useStyles from './TopBarStyles';
import { withStyles } from '@material-ui/core/styles';
// services
import { isLogin, loggedUser } from '../services/loginServices';
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

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


// TOPBAR COMPONENT
export default function TopBar({ handleDrawerOpen, open }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [empresa, setEmpresa] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const styles = useStyles();

  const username = loggedUser().username.split(' ')[0];
  // uppercase username first letter
  const usernameUppercase = username[0].toUpperCase() + username.slice(1);

  const company = useSelector(state => state.loginReducer.empresaSelecionada);

  useEffect(() => {
    setEmpresa(company);
  }, [history, company])

  const handleUserMenu = (event) => {
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
    <AppBar
      position="fixed"
      className={clsx(styles.appBar, {
        [styles.appBarShift]: open,
      })}
    >

      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(styles.menuButton, {
            [styles.hide]: open,
          })}
        >
          <AppsIcon />
        </IconButton>
        <Box className={styles.title}>
          <img src={logo} alt="SoftRom Logo" title="SoftRom" />
        </Box>

        {isMobile
          ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleUserMenu}
                aria-label="open drawer"
                className={clsx(styles.menuButton, open && styles.hide)}
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
                <Divider />
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
                {empresa &&
                  <span>| &nbsp; {empresa.nome} &nbsp; |</span>
                }
              </Typography>
              <Typography className={styles.welcome}>
                Welcome, <span>{usernameUppercase}</span>
              </Typography>
              <Button

                className={styles.loginLogoutButton}
                onClick={logout}
              >
                {isLogin ? <span>Logout</span> : <span>Login</span>}
              </Button>
            </>
          )}

      </Toolbar>
    </AppBar>

  );
};
