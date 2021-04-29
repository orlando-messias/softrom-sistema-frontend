// react
import React, { useRef, useState } from 'react';
// material table
import MaterialTable from 'material-table';


// ITEMSCONTRATO COMPONENT
export default function ItemsContrato({ items, editItem, deleteItem, modo, setModo }) {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selected, setSelected] = useState(false);

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
          paging: false,
          rowStyle: rowData => ({
            backgroundColor:
              selected &&
              modo === 'edit' &&
              rowData.tableData.id === selectedRowId
                ? "#87CEEB"
                : "#FFF"
          })
        }
      }
      actions={[
        {
          icon: 'edit',
          tooltip: 'Editar',
          onClick: (e, rowData) => {
            selectedItem(rowData, 'edit');
            if (rowData.tableData.id === selectedRowId) {
              setSelected(false);
              setSelectedRowId(null);
            } else {
              setSelected(true);
              setSelectedRowId(rowData.tableData.id);
            }
          }
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

