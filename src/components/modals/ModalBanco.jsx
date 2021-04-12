// react
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
// material-ui
import {
  Modal,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// styles
import useStyles from './ModalBancoStyles';
// services
import api from '../../services/api';
import validations from '../../services/validations';
// context
import { AppContext } from '../../context/AppContext';


// MODAL COMPONENT
const ModalBanco = ({ handleModal, showModal, modo }) => {
  const { editBanco, setEditBanco } = useContext(AppContext);
  const [modified, setModified] = useState(false);

  const styles = useStyles();

  const handleDataChange = (e, field) => {
    let { name, value } = e.target;

    setEditBanco(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const update = async () => {
    const bank = { banco: { ...editBanco, modo } };
    if (modo === 'insert') {
      await api.post(`/banco`, bank)
        .then(response => console.log(response))
        .catch(error => console.log(error));

      toast.success(`${editBanco.descricao} foi adicionado com sucesso`);
    }
    if (modo === 'edit') {
      await api.put('/banco', bank)
        .then(response => console.log(response))
        .catch(error => console.log(error));

      toast.success(`${editBanco.descricao} atualizado com sucesso`);
    }

    handleModal();

    setModified(false);
  };

  const handleCancel = () => {
    setEditBanco({
      descricao: '',
      codigo: ''
    });
    handleModal();
    setModified(false);
  };

  return (
    <Modal
      open={showModal}
      onClose={handleModal}
    >
      <div className={styles.modal}>
        <div className={styles.modalTitle}>
          {modo === 'insert'
            ? <h2>CADASTRO DE BANCO</h2>
            : <h2>ATUALIZAR BANCO</h2>
          }
          <CloseIcon className={styles.closeButton} onClick={handleCancel} />
        </div>

        <Grid container spacing={2}>
          <Grid item sm={12} md={8}>
            <TextField
              label="Descrição"
              name="descricao"
              autoFocus={editBanco && true}
              fullWidth
              required
              onChange={handleDataChange}
              value={editBanco && editBanco.descricao}
              error={!validations.fieldRequired(editBanco.descricao)}
              InputLabelProps={{
                className: styles.inputModal,
              }}
            />
          </Grid>
          <Grid item sm={4} md={4}>
            <TextField
              label="Código"
              name="codigo"
              fullWidth
              required
              value={editBanco && editBanco.codigo}
              onChange={(e) => handleDataChange(e, 'codigo')}
              error={!validations.fieldRequired(editBanco.codigo)}
              InputLabelProps={{
                className: styles.inputModal,
              }}
              inputProps={{ maxLength: 5 }}
            />
          </Grid>
        </Grid>

        <div align="right">
          <Button
            onClick={update}
            className={styles.buttonGravar}
            disabled={!
              (validations.fieldRequired(editBanco.descricao) &&
                (validations.fieldRequired(editBanco.codigo)) &&
                modified)
            }
          >
            Gravar
          </Button>
          <Button
            onClick={handleCancel}
            className={styles.buttonCancelar}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBanco;