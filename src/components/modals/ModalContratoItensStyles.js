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
    display: 'inline-block',
    height:'580px',
    zIndex: 999999,
    overflowY:'scroll'
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
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalTitleDiv: {
    display: 'flex',
    alignItems: 'center'
  },
  inputModal: {
    fontSize: 12,
  },
  autoComplete: {
    marginTop: 10,
  },
  fullWidth: {
    width: '90%',
  },
  fullWidthSpace: {
    width: '100%',
    marginBottom: 20
  },
  gridSpaceBottom: {
    marginBottom: 30
  },
  gridSpaceTop: {
    marginTop: 10
  },
  gridIntSpace: {
    width: 100
  },
  input: {
    height: 50
  },
  buttonItensContrato: {
    marginRight: 30
  },
  buttonGravar: {
    border: '1px solid blue',
    margin: '35px 5px',
    color: 'blue',
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 255, 0.1)'
    },
    "&:disabled": {
      border: '1px solid #d4d4d4'
    }
  },
  buttonGravarItem: {
    border: '1px solid blue',
    margin: '20px 5px 0 0',
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
    margin: '35px 5px',
    color: '#d10d0d',
    "&:hover": {
      backgroundColor: '#fdefef'
    }
  }
}));

export default useStyles;