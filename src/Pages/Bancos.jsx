// react
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
// material-ui
import AddIcon from "@material-ui/icons/Add";
// styles
import useStyles from './ServicoStyles';
// components
import Panel from '../components/Panel';
import MaterialTable from 'material-table';
import ModalBanco from '../components/modals/ModalBanco';
// services
import { isLogin } from '../services/loginServices';
import api from '../services/api';


const searchFieldStyle = {
  marginRight: 30
};


// BANCOS COMPONENT
export default function Bancos() {
  const [idBanco, setidBanco] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modo, setModo] = useState('');

  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);
  const history = useHistory();
  const styles = useStyles();

  const tableRef = useRef();

  const columns = [
    { title: "Id", field: "id" },
    { title: "Descrição", field: "descricao" },
    { title: "Código", field: "codigo" },
  ];

  // const loadData = (resolve, reject, query) => {
  //   const search = query.search;
  //   let orderBy = "";
  //   let direction = "";

  //   if (query.orderDirection === "desc") {
  //     direction = "-";
  //   }
  //   if (query.orderBy) {
  //     orderBy = direction + query.orderBy.field;
  //   }

  //   const params = {
  //     limit: query.pageSize,
  //     page: query.page + 1,
  //     search,
  //     orderBy,
  //   };


  //   api.get('/origem/1/servico', {
  //     params
  //   })
  //     .then((response) => {
  //       resolve({
  //         data: response.data.result.data,
  //         page: response.data.result.page - 1,
  //         totalCount: response.data.result.totalCount
  //       });
  //     });
  // };
  useEffect(() => {
    if (!isLogin()) history.push('/');
  }, [history]);

  const refreshTable = async () => {
    tableRef.current.onQueryChange();
  }

  useEffect(() => {
    // refreshTable();
  }, [showModal]);


  const handleModal = (action) => {
    setModo(action);
    setShowModal(!showModal);
  };

  const selectedService = async (rowData, action) => {
    if (action === 'delete') {
      await api(user.token).delete(`/origem/${origin_id}/banco/${rowData.id}`)
        .then(() => console.log('deleted'))
        .catch((error) => console.log(error))
    }

    if (action === 'edit') {
      setidBanco(rowData.id);
      handleModal(action);
    }
  };

  if (!isLogin()) return <div></div>

  return (
    <div className={styles.container}>

      <Panel />

      <div className={styles.content}>
        <MaterialTable
          tableRef={tableRef}
          data={[{ id: 1, descricao: 'Santander', codigo: 128 }, { id: 2, descricao: 'Itaú', codigo: 320 }]}
          columns={columns}
          title="Bancos"
          actions={[
            {
              icon: () => <AddIcon />,
              tooltip: 'Incluir Novo',
              isFreeAction: true,
              onClick: () => handleModal('insert')
            },
            {
              icon: 'edit',
              tooltip: 'Editar',
              onClick: (e, rowData) => selectedService(rowData, 'edit')
            }
          ]}
          editable={{
            onRowDelete: (rowData) => selectedService(rowData, 'delete')
          }}
          options={{
            searchFieldStyle: searchFieldStyle,
            debounceInterval: 600
          }}
          localization={{
            header: { actions: 'Ações' },
            body: {
              emptyDataSourceMessage: "Nenhum registro para exibir",
              editRow: {
                deleteText: "Deseja apagar este registro?",
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
        <button
          onClick={() => tableRef.current.onQueryChange()}
        >
          refresh material-tablez
          </button>
      </div>

      <ModalBanco
        showModal={showModal}
        handleModal={handleModal}
        idBanco={idBanco}
        setidBanco={setidBanco}
        modo={modo}
      />

    </div>
  );
};