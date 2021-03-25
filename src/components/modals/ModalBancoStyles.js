import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    padding: '10px 30px 10px 30px',
    position: 'absolute',
    width: 900,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    animation: `$myEffect 600ms ${theme.transitions.easing.easeInOut}`,
    left: '50%',
    marginLeft: -450,
    height: 300,
  },
  "@keyframes myEffect": {
    '0%': {
      transform: 'scaleY(.005) scaleX(0)',
    },
    '50%': {
      transform: 'scaleY(.005) scaleX(1)',
    },
    '100%': {
      transform: 'scaleY(1) scaleX(1)',
    }
  },
  modalTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20
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
  buttonGravar: {
    border: '1px solid blue',
    marginTop: 90,
    marginRight: 10,
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
    marginTop: 90,
    color: '#d10d0d',
    "&:hover": {
      backgroundColor: '#fdefef'
    }
  }
}));

export default useStyles;