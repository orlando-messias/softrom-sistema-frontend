// react
import React, { useEffect, useState } from 'react';
// components
import MaterialTable from 'material-table';
// services
import api from '../../services/api';
import { FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';


// DASHBOARD COMPONENT
export default function ListaContato({ empresaId, handleModified, handleContato, modo }) {
  const [contatos, setContatos] = useState([]);
  const [currentAction, setCurrentAction] = useState('');

  const columns = [
    { title: "Nome", field: "nome" },
    { title: "Telefone", field: "fone" },
    { title: "Email", field: "email" },
  ];

  useEffect(() => {
    api.get(`/empresa/${empresaId}/contato`)
      .then(response => setContatos(response.data));
  }, []);

  const handleNew = (rowData, oldData, resolve, reject, action) => {
    if (action === 'edit') {
      const dataUpdate = [...contatos];
      const index = oldData.tableData.id;
      dataUpdate[index] = { ...rowData, modo: action };
      setCurrentAction(action);
      setContatos([...dataUpdate]);
      handleContato([...dataUpdate]);
    }
    else {
      rowData = { ...rowData, modo: action };
      setContatos([...contatos, rowData]);
      handleContato([...contatos, rowData]);
      console.log(rowData);
    }

    handleModified();
    resolve();
  };

  const handleDelete = (rowData, resolve, reject, action) => {
    rowData = { ...rowData, modo: action };
    (modo === 'edit' && !rowData.id)
      ? setContatos(contatos.filter(contato => contato.fone != rowData.fone))
      : setContatos(contatos.filter(contato => contato.fone !== rowData.fone));
    handleContato(contatos);

    handleModified();
    resolve();
  };

  return (

    <div>
      <MaterialTable
        data={contatos}
        columns={columns}
        title="Listagem de Contatos"
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