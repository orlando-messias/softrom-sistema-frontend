import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  welcome: {
    marginRight: 30,
    fontSize: 14
  },
  loginLogoutButton: {
    height: 30,
    fontSize: 12
  }
}));

export default styles;