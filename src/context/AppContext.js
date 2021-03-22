import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [editEmpresa, setEditEmpresa] = useState({
    id: 0,
    nome: '',
    tipo_doc: '',
    documento: '',
    gerar_nf: false,
    retem_iss: false,
    obs: '',
    agrupar_fatura_contrato: false
  });

  const context = {
    editEmpresa,
    setEditEmpresa,
  };

  return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
};