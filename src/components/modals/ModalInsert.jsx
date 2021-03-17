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
import {mask} from 'remask';
// styles
import useStyles from './ModalInsertStyles';


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

  const insert = () => {
    handleModalInsert();
  };

  return (
    <Modal
      open={showModalInsert}
      onClose={handleModalInsert}
    >
      <div className={classes.modal}>
        <h2>Cadastro de Empresa</h2>

        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              label="Nome"
              name="nome"
              autoFocus
              fullWidth
              required
              onChange={handleCompanyDataChange}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Tipo de Pessoa"
              name="tipo_doc"
              select
              required
              onChange={handleCompanyDataChange}
              helperText="Tipo de Documento Jurídica/Física"
            >
              <MenuItem value="Jurídica">Jurídica</MenuItem>
              <MenuItem value="Física">Física</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6} sm={3}>
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

          <TextField
            name="obs"
            required
            label="Obs"
            className={classes.inputModal}
            onChange={handleCompanyDataChange}
          />

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