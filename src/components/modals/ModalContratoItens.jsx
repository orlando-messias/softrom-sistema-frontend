// react
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// material-ui
import {
  Modal,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateIcon from '@material-ui/icons/Create';
// styles
import useStyles from './ModalContratoItensStyles';
// components
import ItemsContrato from '../ItemsContrato';
// services
import validations from '../../services/validations';
// react-date-picker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";



// MODALCONTRATOITENS COMPONENT
const ModalContratoItens = ({
  handleModalItens,
  showModalItens,
  items,
  setItems,
  modo,
  setModo
}) => {

  const [itensContrato, setItensContrato] = useState({
    servico: '',
    quantidade: 0,
    valor: 0,
    obs: ''
  });

  const [data_inicio, setData_Inicio] = useState(null);
  const [data_fim, setData_Fim] = useState(null);
  const [modified, setModified] = useState(false);

  const styles = useStyles();
  // const user = useSelector(state => state.loginReducer.user);
  // const origin_id = useSelector(state => state.loginReducer.origin);

  // useEffect(() => {
  //   if (modo === 'edit') {
  //     api(user.token).get(`/origem/1/empresa/${idContrato}`)
  //       .then(response => setEmpr(response.data.result[0]))
  //       .catch(e => console.log(e));
  //   }
  // }, [idContrato, modo, user.token]);

  const handleContratoItensDataChange = (e) => {
    let { name, value } = e.target;

    setItensContrato(prevState => ({
      ...prevState,
      [name]: value
    }));

    setModified(true);
  };

  const handleDataInicio = (date) => {
    setData_Inicio(date);
    setModified(true);
  };

  const handleDataFim = (date) => {
    setData_Fim(date);
    setModified(true);
  };

  const adjustDayAndMonth = (date) => {
    const newDate = new Date(date);
    const dia = ("0" + (newDate.getDate())).slice(-2);
    const mes = ("0" + (newDate.getMonth() + 1)).slice(-2);
    return `${dia}-${mes}-${newDate.getFullYear()}`.toString();
  }

  const handleDateFormat = (date) => {
    const splittedDate = date.split('-');
    const formatDate = splittedDate[2] + '-' + splittedDate[1] + '-' + splittedDate[0];
    const finalDate = new Date(formatDate);
    return finalDate.setDate(finalDate.getDate() + 1);
  }

  const editItem = (item) => {
    const dataInicio = handleDateFormat(item.data_inicio);
    const dataFim = handleDateFormat(item.data_fim);
    setData_Inicio(dataInicio);
    setData_Fim(dataFim);
    setItensContrato(item);
  }

  const update = () => {
    const dataInicio = adjustDayAndMonth(data_inicio);
    const dataFim = adjustDayAndMonth(data_fim);
    const contratoData = { ...itensContrato, data_inicio: dataInicio, data_fim: dataFim };
    if (modo === 'insert') {
      setItems([...items, contratoData]);
      setItensContrato({
        servico: '',
        quantidade: 0,
        valor: 0,
        obs: ''
      });
      setData_Inicio(null);
      setData_Fim(null);
    }

    if (modo === 'edit') {
      const foundItem = items.find(item => item.tableData.id === contratoData.tableData.id);
      const updatedFoundItem = { ...foundItem, ...contratoData };
      const otherItems = items.filter(item => item.tableData.id !== contratoData.tableData.id);
      setItems([...otherItems, updatedFoundItem]);
      setItensContrato({
        servico: '',
        quantidade: 0,
        valor: 0,
        obs: ''
      });
      setData_Inicio(null);
      setData_Fim(null);
      setModo('insert');
    }

    setModified(false);
  };

  const deleteItem = (item) => {
    const newItens = items.filter(i => i.tableData.id !== item.tableData.id);
    setItems(newItens);
  }

  const handleCancel = () => {
    setModo('insert');
    setItensContrato({
      servico: '',
      quantidade: 0,
      valor: 0,
      obs: ''
    });
    setData_Inicio('');
    setData_Fim('');
    handleModalItens();
    setModified(false);
  };


  return (
    <Modal
      open={showModalItens}
      onClose={handleModalItens}
    >
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <div className={styles.modalTitle}>
            {modo === 'insert'
              ? <div className={styles.modalTitleDiv}>
                <AddCircleIcon style={{ color: '#1769aa', marginRight: 5 }} />
                <h3> NOVO ITEM</h3>
              </div>
              : <div className={styles.modalTitleDiv}>
                <CreateIcon style={{ color: '#1769aa', marginRight: 5 }} />
                <h3> ATUALIZAR ITEM</h3>
              </div>
            }
          </div>

          <Grid container spacing={4} className={styles.gridSpaceBottom}>
            <Grid item sm={6} md={4}>
              <Autocomplete
                options={[]}
                value={null}
                onChange={(event, newValue) => {
                  handleContratoItensDataChange(newValue);
                }}
                className={styles.controls}
                // getOptionLabel={(option) => '1' + " - " + 'item'}
                renderInput={(params) => (
                  <TextField {...params} label="Serviço" variant="outlined" size="small" className={styles.autoComplete} />
                )}
              />
            </Grid>

            <Grid item sm={6} md={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  fullWidth
                  label="Data Início*"
                  placeholder="dd/mm/aaaa"
                  error={!validations.fieldReq(data_inicio && data_inicio)}
                  value={data_inicio && data_inicio}
                  minDate={new Date()}
                  onChange={handleDataInicio}
                  autoOk={true}
                  InputLabelProps={{
                    className: styles.inputModal,
                    shrink: true,
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item sm={6} md={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  fullWidth
                  label="Data Fim*"
                  placeholder="dd/mm/aaaa"
                  error={!validations.fieldReq(data_fim && data_fim)}
                  value={data_fim && data_fim}
                  minDate={data_inicio}
                  onChange={handleDataFim}
                  autoOk={true}
                  InputLabelProps={{
                    className: styles.inputModal,
                    shrink: true,
                  }}
                />
              </MuiPickersUtilsProvider>

            </Grid>

          </Grid>

          <Grid container spacing={4} className={styles.gridSpaceBottom}>
            <Grid item sm={12} md={4} className={styles.gridIntSpace}>
              <TextField
                label="Quantidade"
                name="quantidade"
                fullWidth
                required
                onChange={handleContratoItensDataChange}
                value={itensContrato && itensContrato.quantidade}
                error={!validations.fieldRequired(itensContrato && itensContrato.quantidade)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>
            <Grid item sm={12} md={4}>
              <TextField
                label="Valor"
                name="valor"
                fullWidth
                required
                onChange={handleContratoItensDataChange}
                value={itensContrato && itensContrato.valor}
                error={!validations.fieldRequired(itensContrato && itensContrato.valor)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>

            <Grid item sm={12} md={4}>
              <Autocomplete
                options={[]}
                value={null}
                onChange={(event, newValue) => {
                  handleContratoItensDataChange(newValue);
                }}
                className={styles.controls}
                // getOptionLabel={(option) => '1' + " - " + 'item'}
                renderInput={(params) => (
                  <TextField {...params} label="Motivo Término Contrato" variant="outlined" size="small" className={styles.autoComplete} />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item sm={12} md={4}>
              <Autocomplete
                options={[]}
                value={null}
                onChange={(event, newValue) => {
                  handleContratoItensDataChange(newValue);
                }}
                className={styles.controls}
                // getOptionLabel={(option) => '1' + " - " + 'item'}
                renderInput={(params) => (
                  <TextField {...params} label="Grupo de Serviço" variant="outlined" size="small" className={styles.autoComplete} />
                )}
              />
            </Grid>
            <Grid item sm={12} md={4}>
              <Autocomplete
                options={[]}
                value={null}
                onChange={(event, newValue) => {
                  handleContratoItensDataChange(newValue);
                }}
                className={styles.controls}
                // getOptionLabel={(option) => '1' + " - " + 'item'}
                renderInput={(params) => (
                  <TextField {...params} label="Centro de Custo" variant="outlined" size="small" className={styles.autoComplete} />
                )}
              />
            </Grid>
            <Grid item sm={12} md={4}>
              <Autocomplete
                options={[]}
                value={null}
                onChange={(event, newValue) => {
                  handleContratoItensDataChange(newValue);
                }}
                className={styles.controls}
                // getOptionLabel={(option) => '1' + " - " + 'item'}
                renderInput={(params) => (
                  <TextField {...params} label="Conta Contábil" variant="outlined" size="small" className={styles.autoComplete} />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4} className={styles.gridSpaceTop}>
            <Grid item sm={12}>
              <TextField
                label="Obs"
                name="obs"
                fullWidth
                required
                onChange={handleContratoItensDataChange}
                value={itensContrato && itensContrato.obs}
                // error={!validations.fieldRequired(itensContrato && itensContrato.obs)}
                InputLabelProps={{
                  className: styles.inputModal,
                }}
              />
            </Grid>
          </Grid>

          <div align="right">
            <Button
              onClick={update}
              className={styles.buttonGravarItem}
              disabled={!
                (validations.fieldRequired(itensContrato && itensContrato.quantidade) &&
                  (validations.fieldRequired(itensContrato && itensContrato.valor)) &&
                  (validations.fieldReq(data_inicio && data_inicio)) &&
                  (validations.fieldReq(data_fim && data_fim)) &&
                  modified)
              }
            >
              Gravar Item
          </Button>
          </div>

          <ItemsContrato items={items} editItem={editItem} deleteItem={deleteItem} modo={modo} setModo={setModo} />

          <div align="right">
            <Button
              onClick={handleCancel}
              className={styles.buttonCancelar}
            >
              Fechar
          </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContratoItens;