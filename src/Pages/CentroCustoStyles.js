import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex'
  },
  content: {
    padding: '90px 30px',
    width: '100%'
  },
  icon: {
    margin: 20,
    backgroundColor: 'blue',
    borderRadius: 50
  }
}));

export default useStyles;