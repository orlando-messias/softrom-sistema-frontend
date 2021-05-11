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
import useStyles from './ModalGrupoStyles';
// services
import api from '../../services/api';

import { toast } from 'react-toastify';
//validações
import * as yup from 'yup';
//formulário
import { useFormik } from 'formik';


// MODALGRUPO COMPONENT
const ModalGrupo = ({ handleModal, showModal, idGrupo, setIdGrupo, modo }) => {
  const [grupo, setGrupo] = useState({
    descricao: ''
  });

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);

  const cadastroFormSchema = yup.object().shape({
    descricao: yup.string().required('Descrição obrigatória.').min(3, 'No mínimo 3 caracteres.'),
  })

  const formik = useFormik({
    initialValues: grupo,
    validationSchema: cadastroFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      formik.setSubmitting(false);
      update(values);
    },
  });

  useEffect(() => {
    if (modo === 'edit') {
      api(user.token).get(`/origem/${origin_id}/grupo/${idGrupo}`)
        .then(response => {
          setGrupo(response.data.result[0]);
          formik.setValues(response.data.result[0]);
        })
        .catch(e => console.log(e));
    }
  }, [idGrupo, modo, user.token, origin_id]);


  const update = async (values) => {
    const grupoData = { ...values, modo };
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/grupo`, grupoData)
        .then(() => {
          toast.success(`${grupo.descricao} foi adicionada com sucesso`);
          setGrupo({
            id: 0,
            descricao: ''
          });
          limpaForm();
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/grupo`, grupoData)
        .then(() => {
          toast.success(`${grupo.descricao} atualizada com sucesso`);
          setGrupo({
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

    setGrupo({
      id: 0,
      descricao: '',
    });
    setIdGrupo(0);
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
              ? <h2>NOVO GRUPO</h2>
              : <h2>ATUALIZAR GRUPO</h2>
            }
          </div>

          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={8}>
                <TextField
                  label="Descrição"
                  name="descricao"
                  autoFocus
                  fullWidth
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

              <Grid item sm={12} md={4}>
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
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalGrupo;