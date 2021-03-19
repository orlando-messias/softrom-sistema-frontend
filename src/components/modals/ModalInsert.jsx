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
import useStyles from './ModalInsertStyles';

import api from '../../services/apiLocal';
import { toast } from 'react-toastify';

import ListaEndereco from '../Empresas/ListaEndereco';
import ListaContato from '../Empresas/ListaContato';


// MODALINSERT COMPONENT
const ModalInsert = ({ handleModalInsert, showModalInsert }) => {
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
  const [endereco, setEndereco] = useState([]);

  const contato = [];
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

  const insert = async () => {
    console.log({ empresa: { ...companyData }, contato, endereco })
    await api.post(`/empresa`, { empresa: { ...companyData }, contato, endereco })
      // expecting a response
      .then(function (response) {
        console.log(response);
        return true;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });

    handleModalInsert();

    toast.success(`${companyData.nome} foi adicionada com sucesso`);
  };

  const handleEndereco = (end) => {
    setEndereco(end)
  }

  return (
    <Modal
      open={showModalInsert}
      onClose={handleModalInsert}
    >
      {/* {console.log('ENDERECO ', endereco[0])} */}
      <div className={classes.modal}>
        <h2>Cadastro de Empresa</h2>

        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <TextField
              label="Nome"
              name="nome"
              autoFocus
              fullWidth
              required
              onChange={handleCompanyDataChange}
            />
          </Grid>
          <Grid item sm={6} md={3}>
            <TextField
              label="Tipo de Pessoa"
              name="tipo_doc"
              select
              required
              value={companyData.tipo_doc}
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
              fullWidth
              required
              onChange={handleCompanyDataChange}
              value={companyData.documento}
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
          required
          label="Obs"
          className={classes.inputModal}
          onChange={handleCompanyDataChange}
        />

        <ListaEndereco empresaId={id} handleEndereco={handleEndereco} />
        <ListaContato empresaId={id} />

        <div align="right">
          <Button
            color="primary"
            onClick={insert}
          >
            Gravar
          </Button>
          <Button onClick={handleModalInsert} color="primary">Cancelar</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalInsert;