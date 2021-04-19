import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    padding: '10px 30px 10px 30px',
    position: 'absolute',
    width: 1100,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    verticalAlign: 'middle',
    animation: `$myEffect 600ms ${theme.transitions.easing.easeInOut}`,
    left: '50%',
    marginLeft: -550,
    overflowY:'scroll',
    display: 'inline-block',
    height:'90%',
  },
  "@keyframes myEffect": {
    '0%':{
      transform:'scaleY(.005) scaleX(0)',
    },
    '50%': {
      transform:'scaleY(.005) scaleX(1)',
    },
    '100%': {
      transform:'scaleY(1) scaleX(1)',
    }
  },
  modalTitle: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  closeButton: {
    margin: 5,
    fontSize: 40,
    padding: 5,
    cursor: 'pointer',
    color: 'white',
    backgroundColor: '#d4d4d4',
    borderRadius: 5,
    transition: '0.3s',
    "&:hover": {
      backgroundColor: '#f0f0f0',
      color: 'gray',
    },
  },
  inputModal: {
      fontSize: 12
  },
  fullWidth: {
    width: '90%',
  },
  fullWidthSpace: {
    width: '100%',
    marginBottom: 20
  },
  controls: {
    marginBottom: 15,
  },
  buttonGravar: {
    border: '1px solid blue',
    margin: '25px 5px',
    color: 'blue',
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 255, 0.1)'
    },
    "&:disabled": {
      border: '1px solid #d4d4d4'
    }
  },
  buttonCancelar: {
    border: '1px solid rgb(161, 7, 7)',
    margin: '25px 5px',
    color: '#d10d0d',
    "&:hover": {
      backgroundColor: '#fdefef'
    }
  }
}));

export default useStyles;