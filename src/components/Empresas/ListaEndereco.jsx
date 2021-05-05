// react
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// components
import MaterialTable from 'material-table';
// services
import api from '../../services/api';
// import { FormControl, MenuItem, Select } from '@material-ui/core';
//material-ui
import { InputMask } from "react-input-mask";

// LISTAENDERECO COMPONENT
export default function ListaEndereco({ empresaId, handleModified, handleEndereco, modo }) {
  const [enderecos, setEnderecos] = useState([]);

  const user = useSelector(state => state.loginReducer.user);

  const columns = [
    { title: "Identificação", field: "identificacao", validate: rowData => !rowData.identificacao ? 'Preenchimento obrigatório' : '' },
    { title: "Cep", field: "cep" },
    { title: "Principal", field: "principal", type: 'boolean', initialEditValue: false }
  ];

  useEffect(() => {
    if (modo === 'edit') {
      api(user.token).get(`/origem/1/empresa/${empresaId}/endereco`)
        .then(response => setEnderecos(response.data.result.data));
    }
  }, [empresaId, modo, user.token]);

  const handleNew = (rowData, oldData, resolve, reject, action) => {
    if (action === 'edit') {
      const dataUpdate = [...enderecos];
      const index = oldData.tableData.id;
      dataUpdate[index] = { ...rowData, modo: action };
      setEnderecos(dataUpdate);
      handleEndereco(dataUpdate);
    }
    else {
      rowData = { ...rowData, modo: action };
      setEnderecos([...enderecos, rowData]);
      handleEndereco([...enderecos, rowData]);
    }

    handleModified();
    resolve();
  };

  const handleDelete = (rowData, resolve, reject, action) => {
    rowData = { ...rowData, modo: action };
    if ((modo === 'edit' && !rowData.id) || modo === "insert") {
      setEnderecos(enderecos.filter(endereco => endereco.cep !== rowData.cep))
    }
    if (modo === 'edit' && rowData.id) {
      setEnderecos(enderecos.filter(endereco => endereco.id !== rowData.id))
    }

    const dataDelete = [...enderecos];
    const index = rowData.tableData.id;
    dataDelete[index] = rowData;

    handleEndereco([...dataDelete]);

    handleModified();
    resolve();
  };

  return (

    <div>
      <MaterialTable
        data={enderecos}
        columns={columns}
        title="Listagem de Endereços"
        editable={{
          onRowAdd: (newData, oldData) =>
            new Promise((resolve, reject) => {
              handleNew(newData, oldData, resolve, reject, 'insert');
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              handleNew(newData, oldData, resolve, reject, 'edit');
            }),
          onRowDelete: (rowData) =>
            new Promise((resolve, reject) => {
              handleDelete(rowData, resolve, reject, 'delete');
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
          header: { actions: 'Ações' },
          body: {
            emptyDataSourceMessage: "Nenhum registro para exibir",
            editRow: {
              deleteText: "Deseja apagar este registro?",
            },
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