import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    padding: '10px 20px 20px 20px',
    position: 'absolute',
    width: '90%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    top:'50%',
    left:'50%',
    overflowY:'scroll',
    height:'90%',
    display:'block',
    transform: 'translate(-50%, -50%)'
  },
  inputModal: {
    width: '100%',
    marginBottom: 18
  },
  controls: {
    marginBottom: 15,
  }
}));

export default useStyles;