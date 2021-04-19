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
import useStyles from './ModalGrupoStyles';
// services
import api from '../../services/api';
import validations from '../../services/validations';

import { toast } from 'react-toastify';


// MODALGRUPO COMPONENT
const ModalGrupo = ({ handleModal, showModal, idGrupo, setIdGrupo, modo }) => {
  const [grupo, setGrupo] = useState({
    descricao: ''
  });
  const [modified, setModified] = useState(false);

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);

  // useEffect(() => {
  //   if (modo === 'edit') {
  //     api(user.token).get(`/origem/1/grupo/${idGrupo}`)
  //       .then(response => setEmpr(response.data.result[0]))
  //       .catch(e => console.log(e));
  //   }
  // }, [idGrupo, modo, user.token]);

  const handleGrupoDataChange = (e) => {
    let { name, value } = e.target;

    setGrupo(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const update = async () => {
    const grupoData = { ...grupo, modo };
    if (modo === 'insert') {
      await api(user.token).post(`/origem/${origin_id}/grupo`, grupoData)
        .then(() => {
          toast.success(`${grupo.descricao} foi adicionada com sucesso`);
          setGrupo({
            id: 0,
            descricao: ''
          });
        })
        .catch(error => console.log(error));
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/grupo`, grupoData)
        .then(() => {
          toast.success(`${grupo.descricao} atualizada com sucesso`);
          setGrupo({
            id: 0,
            descricao: ''
          });
        })
        .catch(error => console.log(error));
    }

    handleModal();
    setModified(false);
  };

  const handleCancel = () => {
    setGrupo({
      id: 0,
      descricao: ''
    });
    setIdGrupo(0);
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
              ? <h2>NOVO GRUPO</h2>
              : <h2>ATUALIZAR GRUPO</h2>
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
                value={grupo.descricao}
                error={!validations.fieldRequired(grupo && grupo.descricao)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>

            <Grid item sm={12} md={4}>
              <div align="right">
                <Button
                  onClick={update}
                  className={styles.buttonGravar}
                  disabled={!
                    (validations.fieldRequired(grupo.descricao) &&
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

export default ModalGrupo;