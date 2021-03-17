import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  item: {
    color: '#32386f',
    position: 'relative',
    left: -6
  },
  itemIcon: {
    color: '#32386f',
    marginLeft: 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: -5
    },
  },
  subItem: {
    fontSize: 15,
    color: '#363636',
    position: 'relative',
    top: -4,
    left: -4
  },
  subItemIcon: {
    marginLeft: theme.spacing(2),
    fontSize: 18,
    color: '#363636',
    position: 'relative',
    top: -4
  },
  subItemMenuIcon: {
    position: 'relative',
    left: 10
  },
  subSubItemIcon: {
    marginLeft: theme.spacing(3),
    fontSize: 18,
    color: '#363636',
    position: 'relative',
    top: -4
  }
}));

export default useStyles;