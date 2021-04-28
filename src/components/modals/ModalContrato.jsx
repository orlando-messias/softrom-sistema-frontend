// react
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FindInPageIcon from '@material-ui/icons/FindInPage';
// react-icons
import BackupIcon from '@material-ui/icons/Backup';
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
    filial: '',
    participante: '',
    numero: '',
    dia_vencimento: '',
    pendencia: false,
    anexo: '',
    obs: ''
  });
  const [modified, setModified] = useState(false);
  const [filename, setFilename] = useState('Nenhum arquivo selecionado');
  const [fileTooLarge, setFileTooLarge] = useState(false);

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

  const update = async () => {
    const contratoData = { ...contrato, modo };
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/contrato`, contratoData)
        .then(() => {
          toast.success(`${contrato.numero} foi adicionado com sucesso`);
          setContrato({
            id: 0,
            filial: '',
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

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/contrato`, contratoData)
        .then(() => {
          toast.success(`${contrato.numero} atualizado com sucesso`);
          setContrato({
            id: 0,
            filial: '',
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
    setModified(false);
  };

  const handleCancel = () => {
    setContrato({
      id: 0,
      filial: '',
      participante: '',
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
    handleModal();
    setModified(false);
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


  return (
    <Modal
      open={showModal}
      onClose={handleModal}
    >
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <div className={styles.modalTitle}>
            {modo === 'insert'
              ? <h2>NOVO CONTRATO</h2>
              : <h2>ATUALIZAR CONTRATO</h2>
            }
          </div>

          <Grid container spacing={2}>
            <Grid item sm={6} md={4}>
              <Autocomplete
                options={[]}
                value={null}
                onChange={(event, newValue) => {
                  handleContratoDataChange(newValue);
                }}
                className={styles.controls}
                // getOptionLabel={(option) => '1' + " - " + 'item'}
                renderInput={(params) => (
                  <TextField {...params} label="Filial" variant="outlined" />
                )}
              />
            </Grid>

            <Grid item sm={6} md={4}>
              <Autocomplete
                options={[]}
                value={null}
                onChange={(event, newValue) => {
                  handleContratoDataChange(newValue);
                }}
                className={styles.controls}
                // getOptionLabel={(option) => '1' + " - " + 'item'}
                renderInput={(params) => (
                  <TextField {...params} label="Participante" variant="outlined" />
                )}
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
                onChange={handleContratoDataChange}
                value={contrato.numero}
                error={!validations.fieldRequired(contrato && contrato.numero)}
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
                onChange={handleContratoDataChange}
                value={contrato.dia_vencimento}
                error={!validations.fieldRequired(contrato && contrato.dia_vencimento)}
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
                onChange={handleContratoDataChange}
                value={contrato.obs}
                error={!validations.fieldRequired(contrato && contrato.obs)}
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
              onClick={update}
              className={styles.buttonGravar}
              disabled={!
                (validations.fieldRequired(contrato && contrato.numero) &&
                  (validations.fieldRequired(contrato && contrato.dia_vencimento)) &&
                  (validations.fieldRequired(contrato.obs)) &&
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

export default ModalContrato;