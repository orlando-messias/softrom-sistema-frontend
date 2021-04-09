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
// mask
import { mask } from 'remask';
// styles
import useStyles from './ModalStyles';

import api from '../../services/api';
import { toast } from 'react-toastify';

import ListaEndereco from '../Empresas/ListaEndereco';
import ListaContato from '../Empresas/ListaContato';

import validations from '../../services/validations';


// MODAL COMPONENT
const ModalIns = ({ handleModal, showModal, idEmpresa, setIdEmpresa, modo }) => {
  const [endereco, setEndereco] = useState([]);
  const [contato, setContato] = useState([]);
  const [empr, setEmpr] = useState({
    nome: '',
    tipo_doc: '',
    documento: '',
    gerar_nf: false,
    retem_iss: false,
    obs: '',
    agrupar_fatura_contrato: false
  });
  const [modified, setModified] = useState(false);

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);

  useEffect(() => {
    if (modo === 'edit') {
      // const user = JSON.parse(localStorage.getItem('user'));
      // console.log('id ', idEmpresa);
      api(user.token).get(`/origem/1/empresa/${idEmpresa}`)
        .then(response => setEmpr(response.data.result[0]))
        .catch(e => console.log(e));
    }
  }, [idEmpresa, modo, user.token]);

  const handleCompanyDataChange = (e) => {
    let { name, value, checked } = e.target;
    if (
      name === 'gerar_nf' ||
      name === 'retem_iss' ||
      name === 'agrupar_fatura_contrato') {
      value = checked;
    };

    // implements cnpj mask in Documento
    if (name === 'documento') {
      value = mask(value, ['99.999.999/9999-99']);
    };

    setEmpr(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const update = async () => {
    const company = { empresa: { ...empr, modo, contato, endereco } };
    // const user = JSON.parse(localStorage.getItem('user'));
    if (modo === 'insert') {
      console.log('company ', company);
      await api(user.token).post(`/origem/1/empresa`, company)
        .then(() => {
          toast.success(`${empr.nome} foi adicionada com sucesso`);
          setEmpr({
            id: 0,
            nome: '',
            tipo_doc: '',
            documento: '',
            gerar_nf: false,
            retem_iss: false,
            obs: '',
            agrupar_fatura_contrato: false
          });
          setContato([]);
          setEndereco([]);
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      console.log('company ', company);
      await api(user.token).put(`/origem/1/empresa`, company)
        .then(() => {
          toast.success(`${empr.nome} atualizada com sucesso`);
          setEmpr({
            id: 0,
            nome: '',
            tipo_doc: '',
            documento: '',
            gerar_nf: false,
            retem_iss: false,
            obs: '',
            agrupar_fatura_contrato: false
          });
          setContato([]);
          setEndereco([]);
        })
        .catch(error => console.log(error));
    }

    handleModal();

    setModified(false);

  };

  const handleCancel = () => {
    setEmpr({
      id: 0,
      nome: '',
      tipo_doc: '',
      documento: '',
      gerar_nf: false,
      retem_iss: false,
      obs: '',
      agrupar_fatura_contrato: false
    });
    setIdEmpresa(0);
    handleModal();
    setModified(false);
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
              ? <h2>CADASTRO DE EMPRESA</h2>
              : <h2>ATUALIZAR EMPRESA</h2>
            }
          </div>

          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <TextField
                label="Nome"
                name="nome"
                autoFocus
                fullWidth
                required
                onChange={handleCompanyDataChange}
                value={empr.nome}
                error={!validations.fieldRequired(empr && empr.nome)}
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
                value={empr.tipo_doc}
                onChange={handleCompanyDataChange}
                helperText="Jurídica / Física"
                error={!validations.fieldRequired(empr.tipo_doc)}
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
                onChange={handleCompanyDataChange}
                value={empr.documento}
                error={!validations.cnpj(empr.documento)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>

            <Grid item xs={6} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="gerar_nf"
                    color="primary"
                    onChange={handleCompanyDataChange}
                    checked={empr.gerar_nf}
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
                    onChange={handleCompanyDataChange}
                    checked={empr.retem_iss}
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
                    onChange={handleCompanyDataChange}
                    checked={empr.agrupar_fatura_contrato}
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
                onChange={handleCompanyDataChange}
                value={empr.obs}
                error={!validations.fieldRequired(empr.obs)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
                className={styles.fullWidthSpace}
              />
            </Grid>

          </Grid>

          <ListaEndereco
            empresaId={empr.id}
            handleEndereco={handleEndereco}
            handleModified={handleModified}
            modo={modo}
          />
          <ListaContato
            empresaId={empr.id}
            handleContato={handleContato}
            handleModified={handleModified}
            modo={modo}
          />

          <div align="right">
            <Button
              onClick={update}
              className={styles.buttonGravar}
              disabled={!
                (validations.fieldRequired(empr.nome) &&
                  (validations.fieldRequired(empr.documento)) &&
                  (validations.fieldRequired(empr.tipo_doc)) &&
                  (validations.fieldRequired(empr.obs)) &&
                  (validations.cnpj(empr.documento)) &&
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

export default ModalIns;