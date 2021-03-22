// react
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// material-ui
import AddIcon from "@material-ui/icons/Add";
// styles
import useStyles from './EmpresasStyles';
// components
import Panel from '../components/Panel';
import MaterialTable from 'material-table';
import Modal from '../components/modals/Modal';
// services
import { isLogin } from '../services/loginServices';
import api from '../services/apiLocal';
import { AppContext } from '../context/AppContext';

const searchFieldStyle = {
  marginRight: 30
};


// EMPRESAS COMPONENT
export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const { editEmpresa, setEditEmpresa } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [modo, setModo] = useState('');

  const history = useHistory();
  const styles = useStyles();

  const columns = [
    { title: "Id", field: "id" },
    { title: "Nome", field: "nome" },
    { title: "Documento", field: "documento" }
  ];

  useEffect(() => {
    if (!isLogin()) history.push('/');
  }, [history]);

  useEffect(() => {
    api.get('/empresa')
      .then(response => setEmpresas(response.data));
  }, [showModal]);

  const handleModal = (action) => {
    if (action === 'insert')
      setEditEmpresa({
        nome: '',
        tipo_doc: '',
        documento: '',
        gerar_nf: false,
        retem_iss: false,
        obs: '',
        agrupar_fatura_contrato: false
      });
    setModo(action);
    setShowModal(!showModal);
  };

  const selectedCompany = async (rowData, action) => {
    if (action === 'delete') {
      await api.delete(`/empresa/${rowData.id}`)
        .then(() => setEmpresas(empresas.filter(empresa => empresa.id !== rowData.id)))
        .catch((error) => console.log(error))
    }

    if (action === 'edit') {
      setEditEmpresa(rowData);
      handleModal(action);
    }
  };

  if (!isLogin()) return <div></div>

  return (
    <div className={styles.container}>

      <Panel />

      <div className={styles.content}>
        <MaterialTable
          data={empresas}
          columns={columns}
          title="Empresas"
          actions={[
            {
              icon: () => <AddIcon />,
              tooltip: 'Incluir Novo',
              isFreeAction: true,
              onClick: () => handleModal('insert')
            },
            {
              icon: 'edit',
              tooltip: 'Editar',
              onClick: (e, rowData) => selectedCompany(rowData, 'edit')
            }
          ]}
          editable={{
            onRowDelete: (rowData) => selectedCompany(rowData, 'delete')
          }}
          options={{
            searchFieldStyle: searchFieldStyle,
          }}
          localization={{
            header: { actions: 'Ações' },
            body: {
              emptyDataSourceMessage: "Nenhum registro para exibir",
              editRow: {
                deleteText: "Deseja apagar este registro?",
              },
            },
            pagination: {
              labelRowsSelect: "linhas",
              labelDisplayedRows: "{from}-{to} de {count}",
              firstTooltip: "Primeira página",
              previousTooltip: "Página anterior",
              nextTooltip: "Próxima página",
              lastTooltip: "Última página",
            },
          }}
        />
      </div>

      <Modal
        showModal={showModal}
        handleModal={handleModal}
        modo={modo}
      />

    </div>
  );
};