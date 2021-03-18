// react
import React, { useEffect, useState } from 'react';
// material-ui
import AddIcon from "@material-ui/icons/Add";
// styles
// import useStyles from './EmpresasStyles';
// components
import MaterialTable from 'material-table';
// services
import api from '../../services/api';

const searchFieldStyle = {
  marginRight: 30
};


// DASHBOARD COMPONENT
export default function ListaEndereco({ empresaId }) {
  // const empresaId = 9;
  const [empresas, setEmpresas] = useState();
  // const [empresaId, setEmpresaId] = useState(empresaI);

  // const styles = useStyles();

  const columns = [
    { title: "Identificação", field: "identificacao" },
    { title: "Cep", field: "cep" },
    { title: "Principal", field: "principal" },
  ];

  useEffect(() => {
    api.get(`/empresa/${empresaId}/endereco`)
      .then(response => setEmpresas(response.data));
  }, []);

  const handle = (rowData, action) => {
    console.log(action);
  };

  return (

    <div>
      {console.log(empresas)}
      <MaterialTable
        data={empresas}
        columns={columns}
        title="Listagem de Endereços"
        editable={{
          onRowAdd: (rowData) => handle(rowData, 'add'),
          onRowUpdate: (rowData) => handle(rowData, 'edit'),
          onRowDelete: (rowData) => handle(rowData, 'delete')
        }}
        options={{
          addRowPosition: "first",
          search: false,
          paging: false,
          toolbar: true,
          showTitle: true,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "Nenhum registro para exibir",
          },
          toolbar: {
            searchTooltip: "Pesquisar",
          },
          pagination: {
            labelRowsSelect: "linhas",
            labelDisplayedRows: "{count} de {from}-{to}",
            firstTooltip: "Primeira página",
            previousTooltip: "Página anterior",
            nextTooltip: "Próxima página",
            lastTooltip: "Última página",
          },
        }}
      />
    </div>

  );
};