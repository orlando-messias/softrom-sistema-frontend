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
import useStyles from './ModalCentroCustoStyles';
// services
import api from '../../services/api';
import validations from '../../services/validations';

import { toast } from 'react-toastify';


// MODALBANCO COMPONENT
const ModalCentroCusto = ({ handleModal, showModal, idCentroCusto, setIdCentroCusto, modo }) => {
  const [centroCusto, setCentroCusto] = useState({
    descricao: '',
  });
  const [modified, setModified] = useState(false);

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);

  useEffect(() => {
    if (modo === 'edit') {
      api(user.token).get(`/origem/${origin_id}/empresa/51/centro_custo/${idCentroCusto}`)
        .then(response => setCentroCusto(response.data.result[0]))
        .catch(e => console.log(e));
    }
  }, [idCentroCusto, modo, user.token, origin_id]);

  const handleBancoDataChange = (e) => {
    let { name, value } = e.target;

    setCentroCusto(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const update = async () => {
    const centroCustoData = { ...centroCusto, modo };
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/empresa/51/centro_custo`, centroCustoData)
        .then(() => {
          toast.success(`${centroCusto.descricao} foi adicionado com sucesso`);
          setCentroCusto({
            id: 0,
            descricao: ''
          });
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/empresa/51/centro_custo`, centroCustoData)
        .then(() => {
          toast.success(`${centroCusto.descricao} atualizado com sucesso`);
          setCentroCusto({
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
    setCentroCusto({
      id: 0,
      descricao: '',
    });
    setIdCentroCusto(0);
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
              ? <h2>NOVO CENTRO DE CUSTO</h2>
              : <h2>ATUALIZAR CENTRO DE CUSTO</h2>
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
                value={centroCusto.descricao}
                error={!validations.fieldRequired(centroCusto && centroCusto.descricao)}
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
                (validations.fieldRequired(centroCusto.descricao) &&
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

export default ModalCentroCusto;