// react
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// material-ui
import {
  Modal,
  TextField,
  Button,
  Grid,
  MenuItem,
} from '@material-ui/core';
// styles
import useStyles from './ModalFilialStyles';
// mask
import { mask } from 'remask';
// services
import api from '../../services/api';
import validations from '../../services/validations';

import { toast } from 'react-toastify';


// MODALFILIAL COMPONENT
const ModalFilial = ({ handleModal, showModal, idFilial, setIdFilial, modo }) => {
  const [filial, setFilial] = useState({
    nome_fantasia: '',
    tipo_doc: '',
    documento: '',
    origem_id: 0,
    empresa_id: 0
  });
  const [modified, setModified] = useState(false);

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);
  const empresa_id = Number(useSelector(state => state.loginReducer.empresaSelecionada.id));

  useEffect(() => {
    if (modo === 'edit') {
      api(user.token).get(`/origem/${origin_id}/empresa/${empresa_id}/filial/${idFilial}`)
        .then(response => setFilial(response.data.result[0]))
        .catch(e => console.log(e));
    }
  }, [idFilial, modo, user.token, empresa_id, origin_id]);

  useEffect(() => {
    console.log('filial ', origin_id);
  }, [origin_id]);

  const handleFilialDataChange = (e) => {
    let { name, value } = e.target;

    // implements cnpj mask in Documento
    if (name === 'documento') {
      value = mask(value, ['99.999.999/9999-99']);
    };

    setFilial(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const update = async () => {
    const filialData = { ...filial, origem_id: origin_id, empresa_id, modo };
    console.log('filialData ', filialData);
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/empresa/${empresa_id}/filial`, filialData)
        .then(() => {
          toast.success(`${filial.nome_fantasia} foi adicionada com sucesso`);
          setFilial({
            id: 0,
            nome_fantasia: '',
            tipo_doc: '',
            documento: '',
            origem_id: 0,
            empresa_id: 0
          });
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/empresa/${empresa_id}/filial`, filialData)
        .then(() => {
          toast.success(`${filial.nome_fantasia} atualizada com sucesso`);
          setFilial({
            id: 0,
            nome_fantasia: '',
            tipo_doc: '',
            documento: '',
            origem_id: 0,
            empresa_id: 0
          });
        })
        .catch(error => console.log(error));
    }

    handleModal();
    setModified(false);
  };

  const handleCancel = () => {
    setFilial({
      id: 0,
      nome_fantasia: '',
      tipo_doc: '',
      documento: '',
      origem_id: 0,
      empresa_id: 0
    });
    setIdFilial(0);  // CHECKS
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
              ? <h2>CADASTRO DE FILIAL</h2>
              : <h2>ATUALIZAR FILIAL</h2>
            }
          </div>

          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <TextField
                label="Nome Fantasia"
                name="nome_fantasia"
                autoFocus
                fullWidth
                required
                onChange={handleFilialDataChange}
                value={filial && filial.nome_fantasia}
                error={!validations.fieldRequired(filial && filial.nome_fantasia)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>
            <Grid item sm={6} md={3}>
              <TextField
                label="Tipo de Pessoa"
                name="tipo_doc"
                select
                required
                value={filial && filial.tipo_doc}
                onChange={handleFilialDataChange}
                helperText="Jurídica / Física"
                error={!validations.fieldRequired(filial && filial.tipo_doc)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
                className={styles.fullWidth}
              >
                <MenuItem value="Jurídica">Jurídica</MenuItem>
                <MenuItem value="Física">Física</MenuItem>
              </TextField>
            </Grid>
            <Grid item sm={6} md={3}>
              <TextField
                label="Documento"
                name="documento"
                fullWidth
                required
                onChange={handleFilialDataChange}
                value={filial && filial.documento}
                error={!validations.cnpj(filial && filial.documento)}
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
                (validations.fieldRequired(filial && filial.nome_fantasia) &&
                  (validations.fieldRequired(filial && filial.documento)) &&
                  (validations.fieldRequired(filial && filial.tipo_doc)) &&
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

export default ModalFilial;