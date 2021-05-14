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



// MODAL CONTRATO ITENS COMPONENT
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
    quantidade: '',
    valor: '',
    motivoTerminoContrato: null,
    obs: '',
    grupoServico: null,
    centroCusto: null,
    contaContabil: null,
    obs: ''
  });

  const [data_inicio, setData_Inicio] = useState(null);
  const [data_fim, setData_Fim] = useState(null);
  const [modified, setModified] = useState(false);

  const cadastroFormSchema = yup.object().shape({
    quantidade: yup.string().required('obrigatório.'),
    valor: yup.string().required('obrigatório.'),
    motivoTerminoContrato: yup.object().nullable(),
    grupoServico: yup.object().nullable().required('Grupo Serviço obrigatório.'),
    centroCusto: yup.object().nullable().required('Centro de Custo obrigatório.'),
    contaContabil: yup.object().nullable().required('Conta Contábil obrigatória.'),
    obs: yup.string()
  });

  const formik = useFormik({
    initialValues: itensContrato,
    validationSchema: cadastroFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // console.log(values);
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
    const dataInicio = adjustDayAndMonth(data_inicio);
    const dataFim = adjustDayAndMonth(data_fim);
    const contratoData = { ...values, data_inicio: dataInicio, data_fim: dataFim };
    setItensContrato(contratoData);
    // console.log('HERE ', contratoData);
    if (modo === 'insert') {
      setItems([...items, contratoData]);
      setItensContrato({
        quantidade: '',
        valor: '',
        motivoTerminoContrato: null,
        grupoServico: null,
        centroCusto: null,
        contaContabil: null
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
        quantidade: '',
        valor: '',
        motivoTerminoContrato: null,
        grupoServico: null,
        centroCusto: null,
        contaContabil: null
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

  const limpaForm = () => {
    formik.resetForm();

    setModo('insert');
    setItensContrato({
      quantidade: '',
      valor: '',
      motivoTerminoContrato: null,
      grupoServico: null,
      centroCusto: null,
      contaContabil: null
    });
    setData_Inicio(null);
    setData_Fim(null);
  };

  const handleCancel = () => {
    limpaForm();
    handleModalItens();
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
                    // error={!validations.fieldReq(data_inicio && data_inicio)}
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
                    // error={!validations.fieldReq(data_fim && data_fim)}
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
                  onChange={formik.handleChange}
                  value={formik.values.quantidade}
                  error={formik.touched.quantidade && Boolean(formik.errors.quantidade)}
                  helperText={formik.touched.quantidade && formik.errors.quantidade}
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
                  onChange={formik.handleChange}
                  value={formik.values.valor}
                  error={formik.touched.valor && Boolean(formik.errors.valor)}
                  helperText={formik.touched.valor && formik.errors.valor}
                  InputLabelProps={{
                    className: styles.inputModal,
                  }}
                />
              </Grid>

              <Grid item sm={12} md={4}>
                <ComboMotivoTerminoContrato
                  onChange={(e, value) => formik.setFieldValue("motivoTerminoContrato", value)}
                  value={formik.values.motivoTerminoContrato}
                  error={formik.touched.motivoTerminoContrato && Boolean(formik.errors.motivoTerminoContrato)}
                  helperText={formik.touched.motivoTerminoContrato && formik.errors.motivoTerminoContrato}
                />
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item sm={12} md={4}>
                <ComboGrupoServico
                  onChange={(e, value) => formik.setFieldValue("grupoServico", value)}
                  value={formik.values.grupoServico}
                  error={formik.touched.grupoServico && Boolean(formik.errors.grupoServico)}
                  helperText={formik.touched.grupoServico && formik.errors.grupoServico}
                />
              </Grid>
              <Grid item sm={12} md={4}>
                <ComboCentroCusto
                  onChange={(e, value) => formik.setFieldValue("centroCusto", value)}
                  value={formik.values.centroCusto}
                  error={formik.touched.centroCusto && Boolean(formik.errors.centroCusto)}
                  helperText={formik.touched.centroCusto && formik.errors.centroCusto}
                />
              </Grid>
              <Grid item sm={12} md={4}>
                <ComboContaContabil
                  onChange={(e, value) => formik.setFieldValue("contaContabil", value)}
                  value={formik.values.contaContabil}
                  error={formik.touched.contaContabil && Boolean(formik.errors.contaContabil)}
                  helperText={formik.touched.contaContabil && formik.errors.contaContabil}
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
              <Button
                type="submit"
                className={styles.buttonGravarItem}
                disabled={(!formik.dirty || formik.isSubmitting) && !modified}
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