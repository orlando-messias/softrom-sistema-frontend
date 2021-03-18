// react
import React, { useEffect, useState } from 'react';
// components
import MaterialTable from 'material-table';
// services
import api from '../../services/api';


// DASHBOARD COMPONENT
export default function ListaContato({ empresaId }) {
  const [empresas, setEmpresas] = useState();

  const columns = [
    { title: "Nome", field: "nome" },
    { title: "Telefone", field: "fone" },
    { title: "Email", field: "email" },
    { title: "Modo", field: "modo" },
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
      {console.log(empresaId)}
      <MaterialTable
        data={empresas}
        columns={columns}
        title="Listagem de Contatos"
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