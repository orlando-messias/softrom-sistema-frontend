// react
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// material-ui
import {
  Modal,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Switch,
  Grid,
  MenuItem,
} from '@material-ui/core';
// styles
import useStyles from './ModalParticipantesStyles';

import api from '../../services/api';
import { toast } from 'react-toastify';

import ListaEndereco from '../Participantes/ListaEndereco';
import ListaContato from '../Participantes/ListaContato';

//validações
import * as yup from 'yup';

//mask
import InputMask from "react-input-mask";

//formulário
import { useFormik } from 'formik';

// MODALPARTICIPANTES COMPONENT
const ModalParticipantes = ({ handleModal, showModal, idParticipante, setIdParticipante, modo }) => {
  const [endereco, setEndereco] = useState([]);
  const [contato, setContato] = useState([]);
  const [modified, setModified] = useState(false);
  const [particip, setParticip] = useState({
    empresa_id: 51,
    nome: '',
    tipo_doc: '',
    documento: '',
    gerar_nf: false,
    retem_iss: false,
    obs: '',
    agrupar_fatura_contrato: false
  });
  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);

  const cadastroFormSchema = yup.object().shape({
    nome: yup.string().required('Nome obrigatório.').min(3, 'No mínimo 3 caracteres.'),
    tipo_doc: yup.string().required('Tipo de documento obrigatório.'),
    documento: yup.string().required('Documento obrigatório.'),
    gerar_nf: yup.boolean(),
    retem_iss: yup.boolean(),
    obs: yup.string(),
    agrupar_fatura_contrato: yup.boolean(),
  })
  
  const formik = useFormik({
    initialValues: particip,
    validationSchema: cadastroFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
        console.log(JSON.stringify(values, null, 2));
        formik.setSubmitting(false);
        update(values);
    },
  });

  useEffect(() => {
    if (modo === 'edit') {
      
      api(user.token).get(`/origem/${origin_id}/empresa/51/participante/${idParticipante}`)
        .then(response => { setParticip(response.data.result[0]); formik.setValues(response.data.result[0]);})
        .catch(e => console.log(e));
    } else {
      limpaForm();
    }
  }, [idParticipante, modo, user.token, origin_id]);

  const update = async (values) => {
    const part = { participante: { ...values, modo, contato, endereco } };

    if (modo === 'insert') {
      console.log('part ', part);
      await api(user.token).post(`/origem/${origin_id}/empresa/51/participante`, part)
        .then(() => {
          toast.success(`${particip.nome} foi adicionada com sucesso`);
          
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      console.log('part ', part);
      await api(user.token).put(`/origem/${origin_id}/empresa/51/participante`, part)
        .then(() => {
          toast.success(`${particip.nome} atualizada com sucesso`);
          
        })
        .catch(error => console.log(error));
    }

    handleModal();
  };

  const limpaForm = () => {
    formik.resetForm();

    setParticip({
      id: 0,
      empresa_id: 51,
      nome: '',
      tipo_doc: '',
      documento: '',
      gerar_nf: false,
      retem_iss: false,
      obs: '',
      agrupar_fatura_contrato: false
    });
    setIdParticipante(0);
    setContato([]);
    setEndereco([]);  
    setModified(false);
  }

  const handleCancel = () => {
    limpaForm();
    handleModal();
  };

  const handleEndereco = (endereco) => {
    setEndereco(endereco);
  }

  const handleContato = (contato) => {
    setContato(contato);
  }

  const handleModified = () => {
    setModified(true);
  }  

  return (
    <Modal
      open={showModal}
      onClose={handleModal}
    >
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <div className={styles.modalTitle}>
            {modo === 'insert'
              ? <h2>CADASTRO DE PARTICIPANTES</h2>
              : <h2>ATUALIZAR PARTICIPANTES</h2>
            }
          </div>
          <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <TextField
                label="Nome"
                name="nome"
                autoFocus
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.nome}
                error={formik.touched.nome && Boolean(formik.errors.nome)}
                helperText={formik.touched.nome && formik.errors.nome}                
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
          <Grid container spacing={2}>

            <Grid item xs={6} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="gerar_nf"
                    color="primary"
                    onChange={formik.handleChange}
                    checked={formik.values.gerar_nf}
                  />
                }
                label="Gerar NF"
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="retem_iss"
                    color="primary"
                    onChange={formik.handleChange}
                    checked={formik.values.retem_iss}
                  />
                }
                label="Retém ISS"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Switch
                    name="agrupar_fatura_contrato"
                    color="primary"
                    onChange={formik.handleChange}
                    checked={formik.values.agrupar_fatura_contrato}
                  />
                }
                label="Agrupar Fatura por Contrato"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item lg={12}>
              <TextField
                name="obs"
                required
                label="Obs"
                onChange={formik.handleChange}
                value={formik.values.obs}
                error={formik.touched.obs && Boolean(formik.errors.obs)}
                helperText={formik.touched.obs && formik.errors.obs}   
              />
            </Grid>

          </Grid>

          <ListaEndereco
            empresaId={particip.empresa_id}
            participanteId={particip.id}
            handleEndereco={handleEndereco}
            handleModified={handleModified}
            modo={modo}
          />
          <ListaContato
            empresaId={particip.empresa_id}
            participanteId={particip.id}
            handleContato={handleContato}
            handleModified={handleModified}
            modo={modo}
          />

          <div align="right">
            <Button
              type="submit"
              className={styles.buttonGravar}
              disabled={(!(formik.dirty || modified) || formik.isSubmitting)}
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

export default ModalParticipantes;