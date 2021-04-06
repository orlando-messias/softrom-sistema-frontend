// react
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// material-ui
import AddIcon from "@material-ui/icons/Add";
// styles
import useStyles from './EmpresasStyles';
// components
import Panel from '../components/Panel';
import MaterialTable from 'material-table';
import Modal from '../components/modals/Modal';
// services
import { isLogin } from '../services/loginServices';
import api from '../services/api';
import { AppContext } from '../context/AppContext';

const searchFieldStyle = {
  marginRight: 30
};


// EMPRESAS COMPONENT
export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const { setEditEmpresa } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [modo, setModo] = useState('');
  const [page, setPage] = useState(0);

  const history = useHistory();
  const styles = useStyles();

  const columns = [
    { title: "Id", field: "id" },
    { title: "Nome", field: "nome", defaultSort: "asc" },
    { title: "Documento", field: "documento" }
  ];

  const loadData = (resolve, reject, query) => {
    console.log(query);
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

    // console.log(params);
    setPage(params.page);

    api.get('/origem/1/empresa', {
      params
    })
      .then((response) => {
        // setEmpresas(response.data.result.data)
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

  // useEffect(() => {
  //   const params = {
  //     limit: 10,
  //     page: 14
  //   };
  //   console.log('useEffect here')
  //   api.get('/origem/1/empresa', { params })
  //     .then(response => ({
  //       data: response.data.result.data,
  //       page: response.data.result.page - 1,
  //       totalCount: response.data.result.totalCount
  //     }));
  //   new Promise((resolve, reject) => {
  //     loadData(resolve, reject, {
  //       error: false,
  //       filters: [],
  //       page: 3,
  //       pageSize: 5,
  //       totalCount: 17,
  //       orderDirection: "asc",
  //       search: "", 
  //       orderBy: {
  //         defaultSort: "asc",
  //         field: "nome",
  //         title: "Nome",
  //         tableData: {
  //           additionalWidth: 0,
  //           columnOrder: 1,
  //           filterValue: undefined,
  //           groupOrder: undefined,
  //           groupSort: "asc",
  //           id: 1,
  //           initialWidth: "calc((100% - (0px)) / 3)",
  //           width: "calc((100% - (0px)) / 3)",
  //         }
  //       }
  //     })
  //   })
  // }, [showModal]);

  const handleModal = (action) => {
    if (action === 'insert')
      setEditEmpresa({
        nome: '',
        tipo_doc: '',
        documento: '',
        gerar_nf: false,
        retem_iss: false,
        obs: '',
        agrupar_fatura_contrato: false
      });
    setModo(action);
    setShowModal(!showModal);
  };

  const selectedCompany = async (rowData, action) => {
    if (action === 'delete') {
      const headers = { 'Content-Type': 'application/json' };
      await api.delete(`/origem/1/empresa/${rowData.id}`, { headers: headers })
        .then(() => console.log('deleted'))
        .catch((error) => console.log(error))
    }

    if (action === 'edit') {
      setEditEmpresa(rowData);
      handleModal(action);
    }
  };

  if (!isLogin()) return <div></div>

  return (
    <div className={styles.container}>
      {console.log(page)}

      <Panel />

      <div className={styles.content}>
        <MaterialTable
          data={(query) =>
            new Promise((resolve, reject) => {
              loadData(resolve, reject, query);
            })}
          columns={columns}
          title="Empresas"
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
              onClick: (e, rowData) => selectedCompany(rowData, 'edit')
            }
          ]}
          editable={{
            onRowDelete: (rowData) => selectedCompany(rowData, 'delete')
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