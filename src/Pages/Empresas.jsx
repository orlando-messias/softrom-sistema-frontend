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
import api from '../services/api';

const searchFieldStyle = {
  marginRight: 30
};


// DASHBOARD COMPONENT
export default function Empresas() {
  const [companies, setCompanies] = useState([]);
  const [showModalInsert, setShowModalInsert] = useState(false);

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
      .then(response => setCompanies(response.data));
  }, []);

  const selectedCompany = async (rowData, action) => {
    if (action === 'delete')
      await api.delete(`/empresa/${rowData.id}`)
        .then(() => setCompanies(companies.filter(company => company.id !== rowData.id)))
        .catch((error) => console.log(error))
  };

  const handleModalInsert = () => {
    setShowModalInsert(!showModalInsert);
  }

  if (!isLogin()) return <div></div>

  return (
    <div className={styles.container}>

      <Panel />

      <div className={styles.content}>
        <MaterialTable
          data={companies}
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
    </div>
  );
};