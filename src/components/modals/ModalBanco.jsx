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

import { toast } from 'react-toastify';

//validações
import * as yup from 'yup';

//formulário
import { useFormik } from 'formik';

// MODALBANCO COMPONENT
const ModalBanco = ({ handleModal, showModal, idBanco, setidBanco, modo }) => {
  const [banco, setBanco] = useState({
    id: 0,
    descricao: '',
    codigo: '',
  });
  const [modified, setModified] = useState(false);

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);

  const cadastroFormSchema = yup.object().shape({
    descricao: yup.string().required('Descrição obrigatória.'),
    codigo: yup.string().required('Código do banco obrigatório.').min(3, 'No mínimo 3 caracteres.'),
  })  

  const formik = useFormik({
    initialValues: banco,
    validationSchema: cadastroFormSchema,
    onSubmit: (values) => {
        formik.setSubmitting(false);
        update(values);
    },
  });    

  useEffect(() => {
    
    if (modo === 'edit') {
      api(user.token).get(`/origem/${origin_id}/banco/${idBanco}`)
        .then(response => { setBanco(response.data.result[0]); formik.setValues(response.data.result[0]);})
        .catch(e => console.log(e));
    } else {
      limpaForm();
    }
  }, [idBanco, modo, user.token, origin_id]);

  const limpaForm = () => {
    formik.resetForm();

    setBanco({
      id: 0,
      descricao: '',
      codigo: '',
    });
    setidBanco(0);

  }  
  const update = async (values) => {
    console.log(values);
    const bancoData = { ...values, modo };
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/banco`, bancoData)
        .then(() => {
          toast.success(`${banco.descricao} foi adicionado com sucesso`);

        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/banco`, bancoData)
        .then(() => {
          toast.success(`${banco.descricao} atualizado com sucesso`);
        })
        .catch(error => console.log(error));
    }

    handleModal();
    setModified(false);
  };

  const handleCancel = () => {
    limpaForm();
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
          <form noValidate onSubmit={formik.handleSubmit}>

          <Grid container spacing={2}>
            <Grid item sm={6} md={8}>
              <TextField
                label="Descrição"
                name="descricao"
                autoFocus
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.descricao}
                error={formik.touched.descricao && Boolean(formik.errors.descricao)}
                helperText={formik.touched.descricao && formik.errors.descricao}  
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item sm={6} md={8}>
              <TextField
                label="Código"
                name="codigo"
                onChange={formik.handleChange}
                value={formik.values.codigo}
                error={formik.touched.codigo && Boolean(formik.errors.codigo)}
                helperText={formik.touched.codigo && formik.errors.codigo}   
              />
            </Grid>
          </Grid>          

          <div align="right">
            <Button
              type="submit"
              className={styles.buttonGravar}
              disabled={formik.isSubmitting}
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

export default ModalBanco;