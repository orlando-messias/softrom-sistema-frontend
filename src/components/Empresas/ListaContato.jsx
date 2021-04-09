// react
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// components
import MaterialTable from 'material-table';
// services
import api from '../../services/api';


// LISTACONTATO COMPONENT
export default function ListaContato({ empresaId, handleModified, handleContato, modo }) {
  const [contatos, setContatos] = useState([]);

  const columns = [
    { title: "Nome", field: "nome" },
    { title: "Telefone", field: "fone" },
    { title: "Email", field: "email" },
  ];

  const user = useSelector(state => state.loginReducer.user);

  useEffect(() => {
    if (modo === 'edit') {
      api(user.token).get(`/origem/1/empresa/${empresaId}/contato`)
        .then(response => setContatos(response.data.result.data));
    }
  }, [empresaId, modo, user.token]);

  const handleNew = (rowData, oldData, resolve, reject, action) => {
    if (action === 'edit') {
      const dataUpdate = [...contatos];
      const index = oldData.tableData.id;
      dataUpdate[index] = { ...rowData, modo: action };
      setContatos(dataUpdate);
      handleContato(dataUpdate);
      console.log('Contatos', contatos)
    }
    else {
      rowData = { ...rowData, modo: action };
      setContatos([...contatos, rowData]);
      handleContato([...contatos, rowData]);
      console.log('Contatos ', contatos);
    }

    handleModified();
    resolve();
  };

  const handleDelete = (rowData, resolve, reject, action) => {
    rowData = { ...rowData, modo: action };
    if ((modo === 'edit' && !rowData.id) || modo === "insert") {
      setContatos(contatos.filter(contato => contato.fone !== rowData.fone))
    }
    if (modo === 'edit' && rowData.id) {
      setContatos(contatos.filter(contato => contato.id !== rowData.id))
    }

    const dataDelete = [...contatos];
    const index = rowData.tableData.id;
    dataDelete[index] = rowData;

    handleContato([...dataDelete]);

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