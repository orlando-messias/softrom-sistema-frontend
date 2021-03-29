import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    marginTop: 50,
    width: '100%'
  },
  side: {
    width: 160,
    display: 'flex',
    justifyContent: 'center',
    height: '92vh',
    backgroundColor: '#e7e7e7',
    [theme.breakpoints.down('xs')]: {
      width: 100
    },
  },
  img: {
    marginTop: 120,
    [theme.breakpoints.down('xs')]: {
      width: 100,
    },
  },
  content: {
    paddingTop: 10,
    paddingLeft: 50,
    width: '60%',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 10,
    },
  },
  title: {
    marginTop: 30,
    marginBottom: 35,
    fontFamily: "'Teko', sans-serif",
    letterSpacing: 2,
    fontSize: 30
  },
  button: {
    height: 55,
    width: 110,
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 255, 0.1)',
    }
  },

}));

export default useStyles;