// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// material
import { Button, Grid, TextField } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
// redux
import { useDispatch } from 'react-redux';
import { selectCompany } from '../store/Login/Login.action';
// styles
import useStyles from './SelecaoEmpresaStyles';
// components
import TopBar from '../components/TopBar';
// images
import logo from '../assets/logo-softrom-completa.png';


// SELECAOEMPRESA COMPONENT
export default function SelecaoEmpresa() {
  const [empresa, setEmpresa] = useState('');
  const [data, setData] = useState([]);

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleAcessar = () => {
    dispatch(selectCompany(empresa));
    let userData = JSON.parse(localStorage.getItem('user'));
    userData = { ...userData, empresa };
    localStorage.setItem('user', JSON.stringify(userData));
    history.push('/dashboard');
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(atob(userData.token.split('.')[1]));
    const dados = JSON.parse(token.dados);
    console.log(dados.origem[0].empresa);
    setData(dados.origem[0].empresa);
  }, []);

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.side}>
        <div>
          <img src={logo} className={styles.img} alt="Logo" />
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>Selecionar Empresa</h2>
        <div>
          <Grid container spacing={2} >
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={data}
                value={empresa || null}
                onChange={(event, newValue) => {
                  setEmpresa(newValue);
                }}
                getOptionLabel={(option) => option.id + " - " + option.nome}
                renderInput={(params) => (
                  <TextField {...params} label="Empresa" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                className={styles.button}
                variant="outlined"
                color="primary"
                onClick={handleAcessar}
                disabled={!empresa}
              >
                Acessar
              </Button>
            </Grid>
          </Grid>
        </div>

      </div>
    </div>
  )
};