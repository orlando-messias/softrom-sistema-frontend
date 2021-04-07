// react
import React, { useContext, useState } from 'react';
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
import { AppContext } from '../../context/AppContext';

import CloseIcon from '@material-ui/icons/Close';
import validations from '../../services/validations';


// MODAL COMPONENT
const ModalIns = ({ handleModal, showModal, modo }) => {
  const [endereco, setEndereco] = useState([]);
  const [contato, setContato] = useState([]);
  const { editEmpresa, setEditEmpresa } = useContext(AppContext);
  const [modified, setModified] = useState(false);

  const styles = useStyles();

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

    setEditEmpresa(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const update = async () => {
    const company = { empresa: { ...editEmpresa, modo, contato, endereco } };
    const headers = { 'Content-Type': 'application/json' };
    if (modo === 'insert') {
      console.log(company)
      await api.post(`/origem/1/empresa`, company, { headers: headers })
        .then(response => console.log('inserted'))
        .catch(error => console.log(error));

      toast.success(`${editEmpresa.nome} foi adicionada com sucesso`);
    }
    if (modo === 'edit') {
      console.log('EDIT');
      console.log('EDIT');
      await api.put(`/origem/1/empresa`, company, { headers: headers })
        .then(response => console.log('EDIT'))
        .catch(error => console.log(error));

      toast.success(`${editEmpresa.nome} atualizada com sucesso`);
    }

    handleModal();

    setModified(false);

  };

  const handleCancel = () => {
    setEditEmpresa({
      id: 0,
      nome: '',
      tipo_doc: '',
      documento: '',
      gerar_nf: false,
      retem_iss: false,
      obs: '',
      agrupar_fatura_contrato: false
    });
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
            {/* <CloseIcon className={styles.closeButton} onClick={handleCancel} /> */}
          </div>

          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <TextField
                label="Nome"
                name="nome"
                autoFocus={editEmpresa && true}
                fullWidth
                required
                onChange={handleCompanyDataChange}
                value={editEmpresa && editEmpresa.nome}
                error={!validations.fieldRequired(editEmpresa.nome)}
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
                value={editEmpresa && editEmpresa.tipo_doc}
                onChange={handleCompanyDataChange}
                helperText="Jurídica / Física"
                error={!validations.fieldRequired(editEmpresa.tipo_doc)}
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
                value={editEmpresa && editEmpresa.documento}
                error={!validations.cnpj(editEmpresa.documento)}
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
                    checked={editEmpresa && editEmpresa.gerar_nf}
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
                    checked={editEmpresa && editEmpresa.retem_iss}
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
                    checked={editEmpresa && editEmpresa.agrupar_fatura_contrato}
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
                value={editEmpresa && editEmpresa.obs}
                error={!validations.fieldRequired(editEmpresa.obs)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
                className={styles.fullWidthSpace}
              />
            </Grid>

          </Grid>

          <ListaEndereco
          empresaId={editEmpresa && editEmpresa.id}
          handleEndereco={handleEndereco}
          handleModified={handleModified}
          modo={modo}
        />
        <ListaContato
          empresaId={editEmpresa && editEmpresa.id}
          handleContato={handleContato}
          handleModified={handleModified}
          modo={modo}
        />

          <div align="right">
            <Button
              onClick={update}
              className={styles.buttonGravar}
              disabled={!
                (validations.fieldRequired(editEmpresa.nome) &&
                  (validations.fieldRequired(editEmpresa.documento)) &&
                  (validations.fieldRequired(editEmpresa.tipo_doc)) &&
                  (validations.fieldRequired(editEmpresa.obs)) &&
                  (validations.cnpj(editEmpresa.documento)) &&
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