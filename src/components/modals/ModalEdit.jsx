// react
import React, { useState } from 'react';
// material-ui
import {
  Modal,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Switch,
  Grid,
  MenuItem
} from '@material-ui/core';
// mask
import { mask } from 'remask';
// styles
import useStyles from './ModalEditStyles';

import api from '../../services/apiLocal';
import { toast } from 'react-toastify';

import ListaEndereco from '../Empresas/ListaEndereco';
import ListaContato from '../Empresas/ListaContato';


// MODALEDIT COMPONENT
const ModalEdit = ({ handleModalEdit, showModalEdit, empresa }) => {
  const [companyData, setCompanyData] = useState({
    nome: '',
    tipo_doc: '',
    documento: '',
    gerar_nf: false,
    retem_iss: false,
    obs: '',
    agrupar_fatura_contrato: false
  });
  const [id, setId] = useState(0);

  const classes = useStyles();

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

    setCompanyData(prevState => ({
      ...prevState,
      [name]: value
    }))

  };

  const update = () => {
    handleModalEdit();
    // api.put('/empresa', { empresa: editCompany });

    // setTimeout(() => {
    //   setOnEdit(!onEdit);
    //   toast.success('PLEASE, WAIT! Update in a few seconds');
    //   setModified(false);
    // }, 1000);

  };

  return (
    <Modal
      open={showModalEdit}
      onClose={handleModalEdit}
    >
      <div className={classes.modal}>
        <h2>Cadastro de Empresa</h2>
        {console.log(empresa)}
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <TextField
              label="Nome"
              name="nome"
              autoFocus
              value={empresa.nome}
              fullWidth
              required
              onChange={handleCompanyDataChange}
            />
          </Grid>
          <Grid item sm={6} md={3}>
            <TextField
              label="Tipo de Pessoa"
              name="tipo_doc"
              value={empresa.tipo_doc}
              select
              required
              onChange={handleCompanyDataChange}
              helperText="Tipo de Documento Jurídica/Física"
            >
              <MenuItem value="Jurídica">Jurídica</MenuItem>
              <MenuItem value="Física">Física</MenuItem>
            </TextField>
          </Grid>
          <Grid item sm={6} md={3}>
            <TextField
              label="Documento"
              name="documento"
              value={empresa.documento}
              fullWidth
              required
              onChange={handleCompanyDataChange}
              value={empresa.documento}
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
                  checked={empresa.gerar_nf}
                  onChange={handleCompanyDataChange}
                />
              }
              label="Gerar NF"
              className={classes.controls}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  name="retem_iss"
                  color="primary"
                  checked={empresa.retem_iss}
                  onChange={handleCompanyDataChange}
                />
              }
              label="Retém ISS"
              className={classes.controls}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Switch
                  name="agrupar_fatura_contrato"
                  color="primary"
                  checked={empresa.agrupar_fatura_contrato}
                  onChange={handleCompanyDataChange}
                />
              }
              label="Agrupar Fatura por Contrato"
              className={classes.controls}
            />
          </Grid>
        </Grid>

        <TextField
          name="obs"
          label="Obs"
          value={empresa.obs}
          required
          className={classes.inputModal}
          onChange={handleCompanyDataChange}
        />

        <ListaEndereco empresaId={id} />
        <ListaContato empresaId={id} />

        <div align="right">
          <Button
            color="primary"
            onClick={update}
          >
            Gravar
          </Button>
          <Button onClick={handleModalEdit} color="primary">Cancelar</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEdit;