// react
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
// material-ui
import AddIcon from "@material-ui/icons/Add";
// styles
import useStyles from './GruposStyles';
// components
import Panel from '../components/Panel';
import MaterialTable from 'material-table';
import ModalGrupo from '../components/modals/ModalGrupo';
// services
import { isLogin } from '../services/loginServices';
import api from '../services/api';


const searchFieldStyle = {
  marginRight: 30
};


// GRUPOS COMPONENT
export default function Grupos() {
  const [idGrupo, setIdGrupo] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modo, setModo] = useState('');

  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);
  const history = useHistory();
  const styles = useStyles();


  const tableRef = useRef();

  const columns = [
    { title: "Id", field: "id" },
    { title: "Descrição", field: "descricao" }
  ];

  // useEffect(() => {
  //   const params = {
  //     limit: 1,
  //     page: 1,
  //     orderBy: '',
  //     search: '',
  //   };
  //   api(user.token).get('/origem/1/grupo', { params })
  //     .then(response => console.log(response.data))
  // }, [])

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



  //   api.get('/origem/1/grupo', {
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

  const selectedCompany = async (rowData, action) => {
    if (action === 'delete') {
      console.log(action);
      await api(user.token).delete(`/origem/${origin_id}/grupos/${rowData.id}`)
        .then(() => console.log('deleted'))
        .catch((error) => console.log(error))
    }

    if (action === 'edit') {
      setIdGrupo(rowData.id);
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
          data={[{id: 1, descricao: 'Descrição do Grupo'}]}
          // data={(query) =>
          //   new Promise((resolve, reject) => {
          //     loadData(resolve, reject, query);
          //   })}
          columns={columns}
          title="Grupo"
          actions={[
            {
              icon: () => <AddIcon />,
              tooltip: 'Incluir Nova',
              isFreeAction: true,
              onClick: () => handleModal('insert')
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
      </div>

      <ModalGrupo
        showModal={showModal}
        handleModal={handleModal}
        idGrupo={idGrupo}
        setIdGrupo={setIdGrupo}
        modo={modo}
      />

    </div>
  );
};