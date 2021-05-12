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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateIcon from '@material-ui/icons/Create';
// styles
import useStyles from './ModalContratoItensStyles';
// components
import ItemsContrato from '../ItemsContrato';
// services
import validations from '../../services/validations';
//validações
import * as yup from 'yup';
//formulário
import { useFormik } from 'formik';
// react-date-picker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import ComboServico from '../combos/ComboServico';
import ComboMotivoTerminoContrato from '../combos/ComboMotivoTerminoContrato';
import ComboGrupoServico from '../combos/ComboGrupoServico';
import ComboCentroCusto from '../combos/ComboCentroCusto';
import ComboContaContabil from '../combos/ComboContaContabil';



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
    // servico: { id: '', descricao: '' },
    quantidade: 0,
    valor: 0,
    motivoTerminoContrato: null,
    data_inicio: null,
    data_fim: null,
    // grupoServico: { id: '', descricao: '' },
    // centroCusto: { id: '', descricao: '' },
    // contaContabil: { id: '', descricao: '' },
    // obs: ''
  });

  const [data_inicio, setData_Inicio] = useState(null);
  const [data_fim, setData_Fim] = useState(null);
  const [modified, setModified] = useState(false);

  const cadastroFormSchema = yup.object().shape({
    quantidade: yup.string().required('obrigatório.'),
    valor: yup.string().required('obrigatório.'),
    motivoTerminoContrato: yup.object().nullable().required('Motivo obrigatório.'),
    data_inicio: yup.date().required('obrigatório.'),
    data_fim: yup.date().required('obrigatório.')
  });

  const formik = useFormik({
    initialValues: itensContrato,
    validationSchema: cadastroFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      formik.setSubmitting(false);
      update(values);
    },
  });

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

  const update = async (values) => {
    console.log('UPDATE AQUI');
    const dataInicio = adjustDayAndMonth(data_inicio);
    const dataFim = adjustDayAndMonth(data_fim);
    const contratoData = { ...values, data_inicio: dataInicio, data_fim: dataFim };
    setItensContrato(contratoData);
    console.log('HERE ', contratoData);
    if (modo === 'insert') {
      setItems([...items, contratoData]);
      setItensContrato({
        motivoTerminoContrato: { id: '', descricao: '' },
        grupoServico: { id: '', descricao: '' },
        centroCusto: { id: '', descricao: '' },
        contaContabil: { id: '', descricao: '' },
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
        motivoTerminoContrato: { id: '', descricao: '' },
        grupoServico: { id: '', descricao: '' },
        centroCusto: { id: '', descricao: '' },
        contaContabil: { id: '', descricao: '' },
        quantidade: 0,
        valor: 0,
        obs: ''
      });
      setData_Inicio(null);
      setData_Fim(null);
      setModo('insert');
    }

    handleModalItens();
    // setModified(false);
  };

  const deleteItem = (item) => {
    const newItens = items.filter(i => i.tableData.id !== item.tableData.id);
    setItems(newItens);
  }

  const limpaForm = () => {
    formik.resetForm();

    setModo('insert');
    setItensContrato({
      quantidade: 0,
      valor: 0,
      motivoTerminoContrato: null,
      data_inicio: null,
      data_fim: null,
    });
    setData_Inicio('');
    setData_Fim('');
  };

  const handleCancel = () => {
    limpaForm();
    handleModalItens();
  };

  const setCurrentServico = (servico) => {
    setItensContrato(prevState => ({
      ...prevState,
      servico: servico
    }));
  };

  const setCurrentMotivoTerminoContrato = (motivoTerminoContrato) => {
    setItensContrato(prevState => ({
      ...prevState,
      motivoTerminoContrato: motivoTerminoContrato
    }));
  };

  const setCurrentGrupoServico = (grupoServico) => {
    setItensContrato(prevState => ({
      ...prevState,
      grupoServico: grupoServico
    }));
  };

  const setCurrentCentroCusto = (centroCusto) => {
    setItensContrato(prevState => ({
      ...prevState,
      centroCusto: centroCusto
    }));
  };

  const setCurrentContaContabil = (contaContabil) => {
    setItensContrato(prevState => ({
      ...prevState,
      contaContabil: contaContabil
    }));
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

          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={4} className={styles.gridSpaceBottom}>
              <Grid item sm={6} md={4}>
                {/* <ComboServico
                servico={itensContrato.servico}
                setCurrentServico={setCurrentServico}
              /> */}
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
                <ComboMotivoTerminoContrato
                  onChange={(e, value) => formik.setFieldValue("motivoTerminoCrontrato", value)}
                  value={formik.values.motivoTerminoContrato}
                  error={formik.touched.motivoTerminoContrato && Boolean(formik.errors.motivoTerminoContrato)}
                  helperText={formik.touched.motivoTerminoContrato && formik.errors.motivoTerminoContrato}
                />
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item sm={12} md={4}>
                <ComboGrupoServico
                  grupoServico={itensContrato.grupoServico}
                  setCurrentGrupoServico={setCurrentGrupoServico}
                />
              </Grid>
              <Grid item sm={12} md={4}>
                <ComboCentroCusto
                  centroCusto={itensContrato.centroCusto}
                  setCurrentCentroCusto={setCurrentCentroCusto}
                />
              </Grid>
              <Grid item sm={12} md={4}>
                <ComboContaContabil
                  contaContabil={itensContrato.contaContabil}
                  setCurrentContaContabil={setCurrentContaContabil}
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
                type="submit"
                className={styles.buttonGravarItem}
                disabled={!(formik.dirty) || formik.isSubmitting}
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
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContratoItens;