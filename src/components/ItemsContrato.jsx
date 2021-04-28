// react
import React, { useRef } from 'react';
// material table
import MaterialTable from 'material-table';


// ITEMSCONTRATO COMPONENT
export default function ItemsContrato({ items, editItem, deleteItem, modo, setModo }) {

  const tableRef = useRef();

  const columns = [
    { title: "Serviço", field: "servico" },
    { title: "Data Inicial", field: "data_inicio", defaultSort: "asc" },
    { title: "Data Final", field: "data_fim" },
    { title: "Quantidade", field: "quantidade" },
    { title: "Valor", field: "valor" }
  ];

  const selectedItem = async (rowData, action) => {
    if (action === 'edit') {
      editItem(rowData);
      setModo('edit');
    }

    if (action === 'delete') {
      deleteItem(rowData);
    }
  };

  return (
    <MaterialTable
      tableRef={tableRef}
      data={items}
      columns={columns}
      title="Listagem de Itens de Contrato"
      options={
        {
          search: false,
          paging: false
        }
      }
      actions={[
        {
          icon: 'edit',
          tooltip: 'Editar',
          onClick: (e, rowData) => selectedItem(rowData, 'edit')
        }
      ]}
      editable={{
        onRowDelete: (rowData) => selectedItem(rowData, 'delete')
      }}
      localization={{
        header: { actions: 'Ações' },
        body: {
          emptyDataSourceMessage: "Nenhum registro para exibir",
          editRow: {
            deleteText: "Deseja apagar este registro?",
          },
        },
      }}

    />

  );
};

