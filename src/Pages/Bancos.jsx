// react
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// material-ui
import AddIcon from "@material-ui/icons/Add";
// styles
import useStyles from './BancosStyles';
// components
import Panel from '../components/Panel';
import MaterialTable from 'material-table';
import Modal from '../components/modals/ModalBanco';
// services
import { isLogin } from '../services/loginServices';
import api from '../services/api';
// context
import { AppContext } from '../context/AppContext';

const searchFieldStyle = {
  marginRight: 30
};


// EMPRESAS COMPONENT
export default function Empresas() {
  const { setEditBanco } = useContext(AppContext);
  const [bancos, setBancos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modo, setModo] = useState('');

  const history = useHistory();
  const styles = useStyles();

  const columns = [
    { title: "Id", field: "id" },
    { title: "Descrição", field: "descricao" },
    { title: "Código", field: "codigo" }
  ];

  useEffect(() => {
    if (!isLogin()) history.push('/');
  }, [history]);

  useEffect(() => {
    api.get('/banco')
      .then(response => setBancos(response.data));
  }, [showModal]);

  const handleModal = (action) => {
    if (action === 'insert')
      setEditBanco({
        descricao: '',
        codigo: '',
      });
    setModo(action);
    setShowModal(!showModal);
  };

  const selectedData = async (rowData, action) => {
    if (action === 'delete') {
      await api.delete(`/banco/${rowData.id}`)
        .then(() => setBancos(bancos.filter(banco => banco.id !== rowData.id)))
        .catch((error) => console.log(error));
    }

    if (action === 'edit') {
      setEditBanco(rowData);
      handleModal(action);
    }
  };

  if (!isLogin()) return <div></div>

  return (
    <div className={styles.container}>

      <Panel />

      <div className={styles.content}>
        <MaterialTable
          data={bancos}
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
              onClick: (e, rowData) => selectedData(rowData, 'edit')
            }
          ]}
          editable={{
            onRowDelete: (rowData) => selectedData(rowData, 'delete')
          }}
          options={{
            searchFieldStyle: searchFieldStyle,
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

      <Modal
        showModal={showModal}
        handleModal={handleModal}
        modo={modo}
      />

    </div>
  );
};