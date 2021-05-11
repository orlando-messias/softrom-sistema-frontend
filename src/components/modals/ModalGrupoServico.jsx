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
import useStyles from './ModalGrupoServicoStyles';
// services
import api from '../../services/api';

import { toast } from 'react-toastify';
//validações
import * as yup from 'yup';
//formulário
import { useFormik } from 'formik';


// MODAL GRUPO SERVICO COMPONENT
const GrupoServico = ({ handleModal, showModal, idGrupoServico, setIdGrupoServico, modo }) => {
  const [grupoServico, setGrupoServico] = useState({
    descricao: '',
  });

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);

  const cadastroFormSchema = yup.object().shape({
    descricao: yup.string().required('Descrição obrigatória.').min(3, 'No mínimo 3 caracteres.'),
  })

  const formik = useFormik({
    initialValues: grupoServico,
    validationSchema: cadastroFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      formik.setSubmitting(false);
      update(values);
    },
  });

  useEffect(() => {
    if (modo === 'edit') {
      api(user.token).get(`/origem/${origin_id}/empresa/51/grupo_servico/${idGrupoServico}`)
        .then(response => {
          setGrupoServico(response.data.result[0]);
          formik.setValues(response.data.result[0]);
        })
        .catch(e => console.log(e));
    }
  }, [idGrupoServico, modo, user.token, origin_id]);


  const update = async (values) => {
    const centroCustoData = { ...values, modo };
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/empresa/51/grupo_servico`, centroCustoData)
        .then(() => {
          toast.success(`${grupoServico.descricao} foi adicionado com sucesso`);
          setGrupoServico({
            id: 0,
            descricao: ''
          });
          limpaForm();
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/empresa/51/grupo_servico`, centroCustoData)
        .then(() => {
          toast.success(`${grupoServico.descricao} atualizado com sucesso`);
          setGrupoServico({
            id: 0,
            descricao: ''
          });
        })
        .catch(error => console.log(error));
    }

    handleModal();
  };

  const limpaForm = () => {
    formik.resetForm();

    setGrupoServico({
      id: 0,
      descricao: '',
    });
    setIdGrupoServico(0);
  };

  const handleCancel = () => {
    limpaForm();
    handleModal();
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
              ? <h2>NOVO GRUPO DE SERVIÇO</h2>
              : <h2>ATUALIZAR GRUPO DE SERVIÇO</h2>
            }
          </div>

          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={6} md={8}>
                <TextField
                  label="Descrição"
                  name="descricao"
                  fullWidth
                  autoFocus
                  required
                  onChange={formik.handleChange}
                  value={formik.values.descricao}
                  error={formik.touched.descricao && Boolean(formik.errors.descricao)}
                  helperText={formik.touched.descricao && formik.errors.descricao}
                  InputLabelProps={{
                    className: styles.inputModal,
                  }}
                />
              </Grid>
            </Grid>

            <div align="right">
              <Button
                type="submit"
                className={styles.buttonGravar}
                disabled={!formik.dirty || formik.isSubmitting}
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
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default GrupoServico;