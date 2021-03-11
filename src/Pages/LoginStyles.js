import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
  mainContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginContainer: {
    width: 340,
    height: 380,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30
  },
  iconContainer: {
    color: 'white',
    padding: '7px 10px',
    borderRadius: 50,
    backgroundColor: '#c20026',
    marginBottom: 5
  },
  fieldsBox: {
    margin: '40px 0 60px 0'
  },
  inputForm: {
    width: '80%',
    marginBottom: 18
  },
  floatingLabelFocusStyle: {
    fontSize: 14,
    color: '#c0c0c0'
  }
}));

export default styles;