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
import useStyles from './ModalServicoStyles';
// services
import api from '../../services/api';
import validations from '../../services/validations';
// toastify
import { toast } from 'react-toastify';
import ComboContaContabil from '../combos/ComboContaContabil';


// MODALSERVICO COMPONENT
const ModalServico = ({ handleModal, showModal, idServico, setIdServico, modo }) => {
  const [servico, setServico] = useState({
    contaContabil: { id: '', descricao: '' },
    origem_id: 1,
    empresa_id: 51,
    conta_contabil_id: 0,
    motivo_ticket_id: null,
    motivo_ticket_financeiro_id: null,
    descricao: '',
    valor: '',
    documento: ''
  });
  const [contaContabil, setContaContabil] = useState([]);
  const [contaContabilId, setContaContabilId] = useState('');
  const [modified, setModified] = useState(false);

  const styles = useStyles();
  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);
  const empresa_id = Number(useSelector(state => state.loginReducer.empresaSelecionada.id));

  useEffect(() => {
    if (modo === 'edit') {
      api(user.token).get(`/origem/${origin_id}/empresa/${empresa_id}/servico/${idServico}`)
        .then(response => setServico(response.data.result[0]))
        .catch(e => console.log(e));
    }
  }, [idServico, modo, user.token, empresa_id, origin_id]);

  useEffect(() => {
    if (modo === 'insert') {
      api(user.token).get(`/origem/${origin_id}/empresa/${empresa_id}/conta_contabil`)
        .then(response => setContaContabil(response.data.result.data))
        .catch(e => console.log(e));
    }
  }, [origin_id, empresa_id, modo, user.token]);

  const handleServicoDataChange = (e) => {
    let { name, value } = e.target;

    setServico(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const update = async () => {
    setServico({ ...servico, conta_contabil_id: contaContabilId.id });
    const servicoData = { ...servico, conta_contabil_id: contaContabilId.id, modo };
    if (modo === 'insert') {
      console.log(servicoData);
    }

    if (modo === 'edit') {
      await api(user.token).put(`/origem/${origin_id}/empresa/${empresa_id}/servico`, servicoData)
        .then(() => {
          toast.success(`${servico.nome_fantasia} atualizado com sucesso`);
          setServico({
            id: 0,
            origem_id: 0,
            empresa_id: 0,
            conta_contabil_id: 0,
            motivo_ticket_id: 0,
            motivo_ticket_financeiro_id: 0,
            descricao: '',
            valor: 0,
            documento: ''
          });
        })
        .catch(error => console.log(error));
    }

    handleModal();

    setModified(false);
  };

  const handleCancel = () => {
    setServico({
      id: 0,
      origem_id: 0,
      empresa_id: 0,
      conta_contabil_id: 0,
      motivo_ticket_id: 0,
      motivo_ticket_financeiro_id: 0,
      descricao: '',
      valor: 0,
      documento: ''
    });
    setIdServico(0);
    handleModal();
    setModified(false);
  };

  const setCurrentContaContabil = (contaContabil) => {
    setServico(prevState => ({
      ...prevState,
      contaContabil: contaContabil
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
              ? <h2>CADASTRO DE SERVIÇO</h2>
              : <h2>ATUALIZAR SERVIÇO</h2>
            }
          </div>

          <Grid container spacing={2}>
            <Grid item sm={6} md={4}>
              <ComboContaContabil 
                contaContabil={servico.contaContabil}
                setCurrentContaContabil={setCurrentContaContabil}
              />
            </Grid>

            <Grid item sm={6} md={5}>
              <TextField
                label="Descrição"
                name="descricao"
                fullWidth
                required
                onChange={handleServicoDataChange}
                value={servico && servico.descricao}
                error={!validations.fieldRequired(servico && servico.descricao)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                label="Valor"
                name="valor"
                fullWidth
                required
                onChange={handleServicoDataChange}
                value={servico && servico.valor}
                error={!validations.fieldRequired(servico && servico.valor)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>

          </Grid>

          <Grid container spacing={2}>
            <Grid item sm={12} md={3}>
              <TextField
                label="Motivo Ticket"
                name="motivo_ticket"
                fullWidth
                required
                onChange={handleServicoDataChange}
                value={servico && servico.motivo_ticket}
                error={!validations.fieldRequired(servico && servico.motivo_ticket)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                label="Motivo Ticket Financeiro"
                name="motivo_ticket_financeiro"
                fullWidth
                required
                onChange={handleServicoDataChange}
                value={servico && servico.motivo_ticket_financeiro}
                error={!validations.fieldRequired(servico && servico.motivo_ticket_financeiro)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>
          </Grid>

          <div align="right">
            <Button
              onClick={update}
              className={styles.buttonGravar}
              disabled={!
                  (validations.fieldRequired(servico && servico.descricao) &&
                  (validations.fieldRequired(servico && servico.valor)) &&
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

export default ModalServico;