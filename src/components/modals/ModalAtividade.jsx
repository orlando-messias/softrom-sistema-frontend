// react
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// material-ui
import {
  Modal,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
// styles
import useStyles from './ModalAtividadeStyles';
// services
import api from '../../services/api';
import validations from '../../services/validations';

import { toast } from 'react-toastify';


// MODALGRUPO COMPONENT
const ModalAtividade = ({ handleModal, showModal, idAtividade, setIdAtividade, modo }) => {
  const [atividade, setAtividade] = useState({
    descricao: '',
    codigo: ''
  });
  const [modified, setModified] = useState(false);

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);

  useEffect(() => {
    if (modo === 'edit') {
      api(user.token).get(`/origem/${origin_id}/atividade/${idAtividade}`)
        .then(response => setAtividade(response.data.result[0]))
        .catch(e => console.log(e));
    }
  }, [idAtividade, modo, user.token, origin_id]);

  const handleGrupoDataChange = (e) => {
    let { name, value } = e.target;

    setAtividade(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const update = async () => {
    const atividadeData = { ...atividade, modo };
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/atividade`, atividadeData)
        .then(() => {
          toast.success(`${atividade.descricao} foi adicionada com sucesso`);
          setAtividade({
            id: 0,
            descricao: '',
            codigo: ''
          });
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/atividade`, atividadeData)
        .then(() => {
          toast.success(`${atividade.descricao} atualizada com sucesso`);
          setAtividade({
            id: 0,
            descricao: '',
            codigo: ''
          });
        })
        .catch(error => console.log(error));
    }

    handleModal();
    setModified(false);
  };

  const handleCancel = () => {
    setAtividade({
      id: 0,
      descricao: '',
      codigo: ''
    });
    setIdAtividade(0);
    handleModal();
    setModified(false);
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
              ? <h2>NOVA ATIVIDADE</h2>
              : <h2>ATUALIZAR ATIVIDADE</h2>
            }
          </div>

          <Grid container spacing={2}>
            <Grid item sm={12} md={8}>
              <TextField
                label="Descrição"
                name="descricao"
                autoFocus
                fullWidth
                required
                onChange={handleGrupoDataChange}
                value={atividade.descricao}
                error={!validations.fieldRequired(atividade && atividade.descricao)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>

            <Grid item sm={4} md={4}>
              <TextField
                label="Código"
                name="codigo"
                fullWidth
                required
                onChange={handleGrupoDataChange}
                value={atividade.codigo}
                error={!validations.fieldRequired(atividade && atividade.codigo)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>

            <Grid item sm={12}>
              <div align="right">
                <Button
                  onClick={update}
                  className={styles.buttonGravar}
                  disabled={!
                    (validations.fieldRequired(atividade.descricao) &&
                      (validations.fieldRequired(atividade.codigo)) &&
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
            </Grid>
          </Grid>


        </div>
      </div>
    </Modal>
  );
};

export default ModalAtividade;