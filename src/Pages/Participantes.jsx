// react
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
// material-ui
import AddIcon from "@material-ui/icons/Add";
// styles
import useStyles from './ParticipantesStyles';
// components
import Panel from '../components/Panel';
import MaterialTable from 'material-table';
import ModalParticipantes from '../components/modals/ModalParticipantes';
// services
import { isLogin } from '../services/loginServices';
import api from '../services/api';


const searchFieldStyle = {
  marginRight: 30
};


// PARTICIPANTE COMPONENT
export default function Participantes() {
  const [idParticipante, setIdParticipante] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modo, setModo] = useState('');

  const user = useSelector(state => state.loginReducer.user);
  const origin_id = useSelector(state => state.loginReducer.origin);
  const history = useHistory();
  const styles = useStyles();

  const tableRef = useRef();

  const columns = [
    { title: "Id", field: "id" },
    { title: "Nome", field: "nome", defaultSort: "asc" },
    { title: "Documento", field: "documento" }
  ];

  const loadData = (resolve, reject, query) => {
    const search = query.search;
    let orderBy = "";
    let direction = "";

    if (query.orderDirection === "desc") {
      direction = "-";
    }
    if (query.orderBy) {
      orderBy = direction + query.orderBy.field;
    }

    const params = {
      limit: query.pageSize,
      page: query.page + 1,
      search,
      orderBy,
    };

    api(user.token).get(`/origem/${origin_id}/empresa/51/participante`, {
      params
    })
      .then((response) => {
        resolve({
          data: response.data.result.data,
          page: response.data.result.page - 1,
          totalCount: response.data.result.totalCount
        });
      });
  };

  useEffect(() => {
    if (!isLogin()) history.push('/');
  }, [history]);

  const refreshTable = async () => {
    tableRef.current.onQueryChange();
  }

  useEffect(() => {
    refreshTable();
  }, [showModal]);


  const handleModal = (action) => {
    setModo(action);
    setShowModal(!showModal);
  };

  const selectedParticip = async (rowData, action) => {
    if (action === 'delete') {
      const headers = { 'Content-Type': 'application/json' };
      console.log('deleting');
      await api(user.token).delete(`/origem/${origin_id}/empresa/51/participante/${rowData.id}`, { headers: headers })
        .then(() => console.log('deleted'))
        .catch((error) => console.log(error))
    }

    if (action === 'edit') {
      setIdParticipante(rowData.id);
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
          data={(query) =>
            new Promise((resolve, reject) => {
              loadData(resolve, reject, query);
            })}
          columns={columns}
          title="Participantes"
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
              onClick: (e, rowData) => selectedParticip(rowData, 'edit')
            }
          ]}
          editable={{
            onRowDelete: (rowData) => selectedParticip(rowData, 'delete')
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

      <ModalParticipantes
        showModal={showModal}
        handleModal={handleModal}
        idParticipante={idParticipante}
        setIdParticipante={setIdParticipante}
        modo={modo}
      />

    </div>
  );
};