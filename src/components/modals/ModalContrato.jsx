// react
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FindInPageIcon from '@material-ui/icons/FindInPage';
// react-icons
import BackupIcon from '@material-ui/icons/Backup';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateIcon from '@material-ui/icons/Create';

// material-ui
import {
  Modal,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
// styles
import useStyles from './ModalContratoStyles';
// services
import api from '../../services/api';
import validations from '../../services/validations';
// toastify
import { toast } from 'react-toastify';

import ComboFilial from "../combos/ComboFilial";
import ComboParticipante from '../combos/ComboParticipante';
//validações
import * as yup from 'yup';
//formulário
import { useFormik } from 'formik';

// MODALCONTRATO COMPONENT
const ModalContrato = ({
  handleModal,
  handleModalItens,
  showModal,
  items,
  setItems,
  idContrato,
  setIdContrato,
  modo
}) => {

  const [contrato, setContrato] = useState({
    filial: { id: '', nome_fantasia: '' },
    participante: { id: '', nome: '' },
    numero: '',
    dia_vencimento: '',
    pendencia: false,
    anexo: '',
    obs: ''
  });
  const [modified, setModified] = useState(false);
  const [filename, setFilename] = useState('Nenhum arquivo selecionado');
  const [fileTooLarge, setFileTooLarge] = useState(false);

  const cadastroFormSchema = yup.object().shape({
    participante: yup.object().required('Obrigatório'),
    numero: yup.string().required('Número obrigatório.'),
    dia_vencimento: yup.string().required('Dia de Vencimento obrigatório.'),
    obs: yup.string().required('Observação obrigatória.'),
  })

  const formik = useFormik({
    initialValues: contrato,
    validationSchema: cadastroFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      formik.setSubmitting(false);
      update(values);
    },
  });

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);

  // useEffect(() => {
  //   if (modo === 'edit') {
  //     api(user.token).get(`/origem/1/empresa/${idContrato}`)
  //       .then(response => setEmpr(response.data.result[0]))
  //       .catch(e => console.log(e));
  //   }
  // }, [idContrato, modo, user.token]);

  const handleContratoDataChange = (e) => {
    let { name, value, checked } = e.target;

    if (name === 'pendencia') value = checked;

    setContrato(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const update = async (values) => {
    const contratoData = { ...values, modo };
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/contrato`, contratoData)
        .then(() => {
          toast.success(`${contrato.numero} foi adicionado com sucesso`);
          setContrato({
            id: 0,
            filial: { id: '', nome_fantasia: '' },
            participante: '',
            numero: '',
            dia_vencimento: '',
            pendencia: false,
            anexo: '',
            obs: ''
          });
          limpaForm();
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/contrato`, contratoData)
        .then(() => {
          toast.success(`${contrato.numero} atualizado com sucesso`);
          setContrato({
            id: 0,
            filial: { id: '', nome_fantasia: '' },
            participante: '',
            numero: '',
            dia_vencimento: '',
            pendencia: false,
            anexo: '',
            obs: ''
          });
        })
        .catch(error => console.log(error));
    }

    handleModal();
    // setModified(false);
  };

  const limpaForm = () => {
    formik.resetForm();

    setContrato({
      id: 0,
      filial: { id: '', nome_fantasia: '' },
      participante: { id: '', nome: '' },
      numero: '',
      dia_vencimento: '',
      pendencia: false,
      anexo: '',
      obs: ''
    });
    setItems([]);
    setIdContrato(0);
    setFilename('Nenhum arquivo selecionado');
    setFileTooLarge(false);
  };

  const handleCancel = () => {
    limpaForm();
    handleModal();
  };

  const handleFile = (e) => {
    setFileTooLarge(false);
    const files = [...e.target.files];

    if (files.length > 0) {
      if (files.length > 1) {
        const total = files.reduce((acc, file) => acc + (file.size / 1000), 0);
        if (total > 2000) {
          setFileTooLarge(true);
          setFilename('Nenhum arquivo selecionado');
        } else {
          setFilename(`${files.length} arquivos - ${total.toFixed(2)}KB`);
        }
      } else {
        const { name: fileName, size } = files[0];
        const fileSize = (size / 1000).toFixed(2);
        if (fileSize > 2000) {
          setFileTooLarge(true);
          setFilename('Nenhum arquivo selecionado');
        } else {
          const fileNameAndSize = `${fileName} - ${fileSize}KB`;
          setFilename(fileNameAndSize);
        }
      }
    }
  };

  const setCurrentFilial = (filial) => {
    setContrato(prevState => ({
      ...prevState,
      filial: filial
    }));
  };

  const setCurrentParticipante = (participante) => {
    setContrato(prevState => ({
      ...prevState,
      participante: participante
    }));
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
              ? <div className={styles.modalTitleDiv}>
                <AddCircleIcon style={{ color: '#1769aa', marginRight: 5 }} />
                <h2> NOVO CONTRATO</h2>
              </div>
              : <div className={styles.modalTitleDiv}>
                <CreateIcon style={{ color: '#1769aa', marginRight: 5 }} />
                <h2> ATUALIZAR CONTRATO</h2>
              </div>
            }
          </div>

          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={6} md={4}>
                <ComboFilial
                  filial={contrato.filial}
                  setCurrentFilial={setCurrentFilial}
                  update={update}
                />
              </Grid>

              <Grid item sm={6} md={4}>
                <ComboParticipante
                  participante={contrato.participante}
                  setCurrentParticipante={setCurrentParticipante}
                  onChange={formik.handleChange}
                  value={formik.values.participante}
                  error={formik.touched.participante && Boolean(formik.errors.participante)}
                  helperText={formik.touched.participante && formik.errors.participante}
                />
              </Grid>

            </Grid>

            <Grid container spacing={2}>
              <Grid item sm={12} md={3}>
                <TextField
                  label="Número"
                  name="numero"
                  fullWidth
                  required
                  onChange={formik.handleChange}
                  value={formik.values.numero}
                  error={formik.touched.numero && Boolean(formik.errors.numero)}
                  helperText={formik.touched.numero && formik.errors.numero}
                  InputLabelProps={{
                    className: styles.inputModal,
                  }}
                />
              </Grid>
              <Grid item sm={12} md={3}>
                <TextField
                  label="Dia Vencimento"
                  name="dia_vencimento"
                  fullWidth
                  required
                  onChange={formik.handleChange}
                  value={formik.values.dia_vencimento}
                  error={formik.touched.dia_vencimento && Boolean(formik.errors.dia_vencimento)}
                  helperText={formik.touched.dia_vencimento && formik.errors.dia_vencimento}
                  InputLabelProps={{
                    className: styles.inputModal,
                  }}
                />
              </Grid>
              <Grid item sm={12} md={2}>
                <FormControlLabel
                  className={styles.check}
                  control={
                    <Checkbox
                      name="pendencia"
                      color="primary"
                      onChange={handleContratoDataChange}
                      checked={contrato.pendencia}
                    />
                  }
                  label="Pendência"
                />
              </Grid>
              <Grid item sm={12} md={4}>
                <div className="file-input">
                  <input
                    type="file"
                    id="file"
                    accept=".doc, .docx, .pdf, .odt"
                    multiple
                    className="file"
                    onChange={handleFile}
                  />
                  <label
                    htmlFor="file"
                    className={`labelFile ${filename !== 'Nenhum arquivo selecionado' ? 'active' : ''}`}
                  >
                    <div className="textButton">
                      <BackupIcon /> <span>Anexo</span>
                    </div>
                  </label>
                  <p className="file-name">{filename}</p>
                  {fileTooLarge && <p className="file-error">Arquivo(s) acima de 2MB</p>}
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  label="Obs"
                  name="obs"
                  fullWidth
                  required
                  onChange={formik.handleChange}
                  value={formik.values.obs}
                  error={formik.touched.obs && Boolean(formik.errors.obs)}
                  helperText={formik.touched.obs && formik.errors.obs}
                  InputLabelProps={{
                    className: styles.inputModal,
                  }}
                />
              </Grid>
            </Grid>

            <div align="right">
              {items.length > 0 && (
                <Button
                  className={styles.buttonItensContrato}
                  color="primary"
                  variant="contained"
                >
                  <FindInPageIcon /> Listar Itens
                </Button>)}
              {console.log(items)}
              <Button
                onClick={() => handleModalItens(modo)}
                className={styles.buttonItensContrato}
                color="primary"
                variant="contained"
              >
                Adicionar Itens
          </Button>
              <Button
                type="submit"
                className={styles.buttonGravar}
                disabled={!formik.dirty || formik.isSubmitting}
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

export default ModalContrato;