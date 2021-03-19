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
export default function ListaEndereco({ empresaId, endereco, handleEndereco }) {
  // const empresaId = 9;
  const [enderecos, setEnderecos] = useState([]);
  // const [empresaId, setEmpresaId] = useState(empresaI);

  // const styles = useStyles();

  const columns = [
    { title: "Identificação", field: "identificacao" },
    { title: "Cep", field: "cep" },
    { title: "Principal", field: "principal" },
    { title: "Modo", field: "modo" },
  ];

  useEffect(() => {
    api.get(`/empresa/${empresaId}/endereco`)
      .then(response => setEnderecos(response.data));
  }, []);

  const handle = (rowData, resolve, reject, action) => {
    setEnderecos([...enderecos, rowData]);
    handleEndereco([...enderecos, rowData]);
    // console.log('ENDERECOS ', enderecos)
    resolve();
  };

  const handleDel = (rowData, resolve, reject, action) => {
    const newEnderecos = enderecos.filter(endereco => endereco.id !== rowData.id);
    console.log(newEnderecos);
    setEnderecos(newEnderecos);
    handleEndereco(newEnderecos);
    resolve();
  }

  return (

    <div>
      <MaterialTable
        data={enderecos}
        columns={columns}
        title="Listagem de Endereços"
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              handle(newData, resolve, reject);
            }),
          onRowUpdate: (rowData) => handle(rowData, 'edit'),
          onRowDelete: (rowData) =>
            new Promise((resolve, reject) => {
              handleDel(rowData, resolve, reject, 'delete');
            }),
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