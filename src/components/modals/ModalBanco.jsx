// react
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// material-ui
import {
  Modal,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
// styles
import useStyles from './ModalBancoStyles';
// services
import api from '../../services/api';
import validations from '../../services/validations';

import { toast } from 'react-toastify';


// MODALBANCO COMPONENT
const ModalBanco = ({ handleModal, showModal, idBanco, setidBanco, modo }) => {
  const [banco, setBanco] = useState({
    descricao: '',
    codigo: '',
  });
  const [modified, setModified] = useState(false);

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);

  // useEffect(() => {
  //   if (modo === 'edit') {
  //     api(user.token).get(`/origem/${origin_id}/banco/${idBanco}`)
  //       .then(response => setEmpr(response.data.result[0]))
  //       .catch(e => console.log(e));
  //   }
  // }, [idBanco, modo, user.token]);

  const handleBancoDataChange = (e) => {
    let { name, value } = e.target;

    setBanco(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const update = async () => {
    const bancoData = { ...banco, modo };
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/banco`, bancoData)
        .then(() => {
          toast.success(`${banco.descricao} foi adicionado com sucesso`);
          setBanco({
            id: 0,
            descricao: '',
            codigo: '',
          });
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/banco`, bancoData)
        .then(() => {
          toast.success(`${banco.descricao} atualizado com sucesso`);
          setBanco({
            id: 0,
            descricao: '',
            codigo: '',
          });
        })
        .catch(error => console.log(error));
    }

    handleModal();
    setModified(false);
  };

  const handleCancel = () => {
    setBanco({
      id: 0,
      conta_contabil: '',
      descricao: '',
      valor: '',
      motivo_ticket: '',
      motivo_ticket_financeiro: ''
    });
    setidBanco(0);
    handleModal();
    setModified(false);
  };


  return (
    <Modal
      open={showModal}
      onClose={handleModal}
    >
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <div className={styles.modalTitle}>
            {modo === 'insert'
              ? <h2>NOVO BANCO</h2>
              : <h2>ATUALIZAR BANCO</h2>
            }
          </div>

          <Grid container spacing={2}>
            <Grid item sm={6} md={8}>
              <TextField
                label="Descrição"
                name="descricao"
                fullWidth
                required
                onChange={handleBancoDataChange}
                value={banco.descricao}
                error={!validations.fieldRequired(banco && banco.descricao)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>
            <Grid item sm={12} md={4}>
              <TextField
                label="Código"
                name="codigo"
                fullWidth
                required
                onChange={handleBancoDataChange}
                value={banco.codigo}
                error={!validations.fieldRequired(banco && banco.valor)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>
          </Grid>

          <div align="right">
            <Button
              onClick={update}
              className={styles.buttonGravar}
              disabled={!
                (validations.fieldRequired(banco.descricao) &&
                  (validations.fieldRequired(banco.codigo)) &&
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
      </div>
    </Modal>
  );
};

export default ModalBanco;