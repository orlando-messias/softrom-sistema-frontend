// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// material
import { Button, Grid, TextField } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
// redux
import { useDispatch } from 'react-redux';
import { selectCompany, setOrigin, loginSuccess } from '../store/Login/Login.action';
// styles
import useStyles from './SelecaoEmpresaStyles';
// components
import TopBar from '../components/TopBar';
// images
import logo from '../assets/logo-softrom-completa.png';


// SELECAOEMPRESA COMPONENT READY
export default function SelecaoEmpresa() {
  const [empresa, setEmpresa] = useState('');
  const [data, setData] = useState([]);

  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleAcessar = () => {
    const axa = data.find(empr => empr.nome === empresa);
    console.log('achei ', axa);
    dispatch(selectCompany(empresa));
    
    let userData = JSON.parse(localStorage.getItem('user'));
    userData = { ...userData, empresa };
    localStorage.setItem('user', JSON.stringify(userData));
    history.push('/dashboard');
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    //atualizar redux login
    const username = userData.username;
    const userToken = userData.token;
    dispatch(loginSuccess(username, userToken));
    //fim

    const token = JSON.parse(atob(userData.token.split('.')[1]));
    const dados = JSON.parse(token.dados);
    dispatch(setOrigin(dados.origem[0].id));
    console.log(dados.origem[0].id);
    setData(dados.origem[0].empresa);
    console.log('empresa ', dados.origem[0].empresa);
  }, [dispatch]);

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