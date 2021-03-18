// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// material-ui
import AddIcon from "@material-ui/icons/Add";
// styles
import useStyles from './EmpresasStyles';
// components
import Panel from '../components/Panel';
import MaterialTable from 'material-table';
import ModalInsert from '../components/modals/ModalInsert';
// services
import { isLogin } from '../services/loginServices';
import api from '../services/apiLocal';
import ModalEdit from '../components/modals/ModalEdit';

const searchFieldStyle = {
  marginRight: 30
};


// DASHBOARD COMPONENT
export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState({});
  const [showModalInsert, setShowModalInsert] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

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
  }, [showModalInsert]);

  const selectedCompany = async (rowData, action) => {
    if (action === 'delete') {
      await api.delete(`/empresa/${rowData.id}`)
        .then(() => setEmpresas(empresas.filter(empresa => empresa.id !== rowData.id)))
        .catch((error) => console.log(error))
    }

    if(action === 'edit') {
      setEmpresaSelecionada(rowData);
      setShowModalEdit(!showModalEdit);
    }

  };

  const handleModalInsert = () => {
    setShowModalInsert(!showModalInsert);
  }

  const handleModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  }

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
              onClick: () => handleModalInsert()
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
            body: {
              emptyDataSourceMessage: "Nenhum registro para exibir",
              editRow: {
                deleteText: "Deseja apagar o registro?",
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

      <ModalInsert
        showModalInsert={showModalInsert}
        handleModalInsert={handleModalInsert}
      />

      <ModalEdit
        showModalEdit={showModalEdit}
        handleModalEdit={handleModalEdit}
        empresa={empresaSelecionada}
      />
    </div>
  );
};