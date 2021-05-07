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
import useStyles from './ModalMotivoTerminoContratoStyles';
// services
import api from '../../services/api';
import validations from '../../services/validations';

import { toast } from 'react-toastify';


// MODAL MOTIVO TERMINO CONTRATO COMPONENT
const ModalMotivoTerminoContrato = ({ handleModal, showModal, idMotivoTerminoContrato, setIdMotivoTerminoContrato, modo }) => {
  const [motivoTerminoContrato, SetMotivoTerminoContrato] = useState({
    descricao: '',
  });
  const [modified, setModified] = useState(false);

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);

  useEffect(() => {
    if (modo === 'edit') {
      api(user.token).get(`/origem/${origin_id}/empresa/51/contrato_motivo_termino/${idMotivoTerminoContrato}`)
        .then(response => SetMotivoTerminoContrato(response.data.result[0]))
        .catch(e => console.log(e));
    }
  }, [idMotivoTerminoContrato, modo, user.token, origin_id]);

  const handleBancoDataChange = (e) => {
    let { name, value } = e.target;

    SetMotivoTerminoContrato(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const update = async () => {
    const centroCustoData = { ...motivoTerminoContrato, modo };
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/empresa/51/contrato_motivo_termino`, centroCustoData)
        .then(() => {
          toast.success(`${motivoTerminoContrato.descricao} foi adicionado com sucesso`);
          SetMotivoTerminoContrato({
            id: 0,
            descricao: ''
          });
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/empresa/51/contrato_motivo_termino`, centroCustoData)
        .then(() => {
          toast.success(`${motivoTerminoContrato.descricao} atualizado com sucesso`);
          SetMotivoTerminoContrato({
            id: 0,
            descricao: ''
          });
        })
        .catch(error => console.log(error));
    }

    handleModal();
    setModified(false);
  };

  const handleCancel = () => {
    SetMotivoTerminoContrato({
      id: 0,
      descricao: '',
    });
    setIdMotivoTerminoContrato(0);
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
              ? <h2>CADASTRAR MOTIVO TÉRMINO DE CONTRATO</h2>
              : <h2>ATUALIZAR MOTIVO TÉRMINO DE CONTRATO</h2>
            }
          </div>

          <Grid container spacing={2}>
            <Grid item sm={6} md={8}>
              <TextField
                label="Descrição"
                name="descricao"
                fullWidth
                autoFocus
                required
                onChange={handleBancoDataChange}
                value={motivoTerminoContrato.descricao}
                error={!validations.fieldRequired(motivoTerminoContrato && motivoTerminoContrato.descricao)}
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
                (validations.fieldRequired(motivoTerminoContrato.descricao) &&
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

export default ModalMotivoTerminoContrato;