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
import { toast } from 'react-toastify';
//validações
import * as yup from 'yup';

//mask
import InputMask from "react-input-mask";

//formulário
import { useFormik } from 'formik';

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

  const cadastroFormSchema = yup.object().shape({
    nome_fantasia: yup.string().required('Nome obrigatório.').min(3, 'No mínimo 3 caracteres.'),
    tipo_doc: yup.string().required('Tipo de documento obrigatório.'),
    documento: yup.string().required('Documento obrigatório.'),
  })

  const formik = useFormik({
    initialValues: filial,
    validationSchema: cadastroFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
        formik.setSubmitting(false);
        update(values);
    },
  });

  useEffect(() => {
    if (modo === 'edit') {
      api(user.token).get(`/origem/${origin_id}/empresa/51/filial/${idFilial}`)
        .then(response => { setFilial(response.data.result[0]); formik.setValues(response.data.result[0]);})
        .catch(e => console.log(e));
    } else {
      limpaForm();
    }
  }, [idFilial, modo, user.token, empresa_id, origin_id]);

  const update = async (values) => {
    const filialData = { ...values, origem_id: origin_id, empresa_id, modo };
    console.log('filialData ', filialData);
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/empresa/51/filial`, filialData)
        .then(() => {
          toast.success(`${filial.nome_fantasia} foi adicionada com sucesso`);
          
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/empresa/51/filial`, filialData)
        .then(() => {
          toast.success(`${filial.nome_fantasia} atualizada com sucesso`);
          
        })
        .catch(error => console.log(error));
    }

    handleModal();
    setModified(false);
  };

  const limpaForm = () => {
    formik.resetForm();
    setFilial({
      id: 0,
      nome_fantasia: '',
      tipo_doc: '',
      documento: '',
      origem_id: 0,
      empresa_id: 0
    });
    setIdFilial(0);    
  }

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
              ? <h2>CADASTRO DE FILIAL</h2>
              : <h2>ATUALIZAR FILIAL</h2>
            }
          </div>
          <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <TextField
                label="Nome Fantasia"
                name="nome_fantasia"
                autoFocus
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.nome_fantasia}
                error={formik.touched.nome_fantasia && Boolean(formik.errors.nome_fantasia)}
                helperText={formik.touched.nome_fantasia && formik.errors.nome_fantasia}   
              />
            </Grid>
            <Grid item sm={6} md={3}>
              <TextField
                label="Tipo de Pessoa"
                name="tipo_doc"
                select
                onChange={formik.handleChange}
                value={formik.values.tipo_doc}
                error={formik.touched.tipo_doc && Boolean(formik.errors.tipo_doc)}
                helperText={formik.touched.tipo_doc && formik.errors.tipo_doc}      
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
            <InputMask
                    mask={(formik.values.tipo_doc === "Física")? "999.999.999-99" : "99.999.999/9999-99"}
                    maskChar=" "
                    onChange={formik.handleChange}
                    value={formik.values.documento}                    
                >
                {() => <TextField
                    label="Documento"
                    name="documento"
                    fullWidth

                    error={formik.touched.documento && Boolean(formik.errors.documento)}
                    helperText={formik.touched.documento && formik.errors.documento}
                /> }
                </InputMask>   
            </Grid>
          </Grid>

          <div align="right">
            <Button
              type="submit"
              className={styles.buttonGravar}
              disabled={!(formik.dirty) || formik.isSubmitting}
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

export default ModalFilial;