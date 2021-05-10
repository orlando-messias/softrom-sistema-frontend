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
import useStyles from './ModalAtividadeStyles';
// services
import api from '../../services/api';
import validations from '../../services/validations';

import { toast } from 'react-toastify';
//validações
import * as yup from 'yup';
//formulário
import { useFormik } from 'formik';


// MODALGRUPO COMPONENT
const ModalAtividade = ({ handleModal, showModal, idAtividade, setIdAtividade, modo }) => {
  const [atividade, setAtividade] = useState({
    descricao: '',
    codigo: ''
  });
  const [modified, setModified] = useState(false);

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);

  const cadastroFormSchema = yup.object().shape({
    descricao: yup.string().required('Descrição obrigatória.').min(3, 'No mínimo 3 caracteres.'),
    codigo: yup.string().required('Código de Atividade obrigatório.'),
  })

  const formik = useFormik({
    initialValues: atividade,
    validationSchema: cadastroFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      formik.setSubmitting(false);
      update(values);
    },
  });

  useEffect(() => {
    if (modo === 'edit') {
      api(user.token).get(`/origem/${origin_id}/atividade/${idAtividade}`)
        .then(response => {
          setAtividade(response.data.result[0])
          formik.setValues(response.data.result[0]);
        })
        .catch(e => console.log(e));
    }
  }, [idAtividade, modo, user.token, origin_id]);

  const update = async (values) => {
    const atividadeData = { ...values, modo };
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/atividade`, atividadeData)
        .then(() => {
          toast.success(`${atividade.descricao} foi adicionada com sucesso`);
          setAtividade({
            id: 0,
            descricao: '',
            codigo: ''
          });
          limpaForm();
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/atividade`, atividadeData)
        .then(() => {
          toast.success(`${atividade.descricao} atualizada com sucesso`);
          setAtividade({
            id: 0,
            descricao: '',
            codigo: ''
          });
        })
        .catch(error => console.log(error));
    }

    handleModal();
  };

  const limpaForm = () => {
    formik.resetForm();

    setAtividade({
      id: 0,
      descricao: '',
      codigo: ''
    });
    setIdAtividade(0);
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
              ? <h2>NOVA ATIVIDADE</h2>
              : <h2>ATUALIZAR ATIVIDADE</h2>
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

              <Grid item sm={4} md={4}>
                <TextField
                  label="Código"
                  name="codigo"
                  fullWidth
                  required
                  onChange={formik.handleChange}
                  value={formik.values.codigo}
                  error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                  helperText={formik.touched.codigo && formik.errors.codigo}
                  InputLabelProps={{
                    className: styles.inputModal,
                  }}
                />
              </Grid>

              <Grid item sm={12}>
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

export default ModalAtividade;