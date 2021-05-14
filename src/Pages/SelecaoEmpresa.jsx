// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// material
import { Button, Grid, TextField } from '@material-ui/core';

// redux
import { useDispatch } from 'react-redux';
import { selectCompany, setOrigin, loginSuccess } from '../store/Login/Login.action';
// styles
import useStyles from './SelecaoEmpresaStyles';
// components
import TopBar from '../components/TopBar';
// images
import logo from '../assets/logo-softrom-completa.png';

import ComboEmpresa from '../components/combos/ComboEmpresa';

//validações
import * as yup from 'yup';
//formulário
import { useFormik } from 'formik';

// SELECAOEMPRESA COMPONENT READY
export default function SelecaoEmpresa() {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const cadastroFormSchema = yup.object().shape({
    empresa: yup.object().nullable().required('Empresa obrigatória.'),
  })

  const formik = useFormik({
    initialValues: {},
    validationSchema: cadastroFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      formik.setSubmitting(false);
      handleAcessar(values);
    },
  });  

  const handleAcessar = (values) => {    
    const { empresa } = values;
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
        <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} >
            <Grid item xs={12} md={6}>
                <ComboEmpresa
                  onChange={(e, value) => formik.setFieldValue("empresa", value)}
                  error={formik.touched.empresa && Boolean(formik.errors.empresa)}
                  
                  helperText={formik.touched.empresa && formik.errors.empresa}
                />
            </Grid>
            <Grid item xs={12} md={6}>
            <Button
                type="submit"
                className={styles.button}
                disabled={formik.isSubmitting}
              >
                Entrar
              </Button>
            </Grid>
          </Grid>
          </form>
        </div>
      </div>
    </div>
  )
};