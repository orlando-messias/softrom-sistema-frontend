import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 213;

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  welcome: {
    marginRight: 30,
    fontSize: 14
  },
  loginLogoutButton: {
    height: 30,
    fontSize: 12,
    color: 'white',
    // border: '1px solid white',
    "&:hover": {
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
  }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0
    },
  },
}));

export default useStyles;