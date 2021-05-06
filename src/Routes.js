// react
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// pages and components
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Empresas from "./Pages/Empresas";
import Participantes from "./Pages/Participantes";
import Bancos from "./Pages/Bancos";
import Filiais from "./Pages/Filiais";
import Grupos from "./Pages/Grupos";
import Servico from "./Pages/Servico";
import SelecaoEmpresa from "./Pages/SelecaoEmpresa";
import Contrato from "./Pages/Contrato";
import CentroCusto from "./Pages/CentroCusto";
import ContaContabil from "./Pages/ContaContabil";
import MotivoTerminoContrato from "./Pages/MotivoTerminoContrato";
import GrupoServico from "./Pages/GrupoServico";
import Atividade from "./Pages/Atividade";

function Routes() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/select-empresa" exact component={SelecaoEmpresa} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/empresas" component={Empresas} />
      <Route path="/participantes" component={Participantes} />
      <Route path="/bancos" component={Bancos} />
      <Route path="/filiais" component={Filiais} />
      <Route path="/grupos" component={Grupos} />
      <Route path="/servico" component={Servico} />
      <Route path="/contrato" component={Contrato} />
      <Route path="/centro-custo" component={CentroCusto} />
      <Route path="/conta-contabil" component={ContaContabil} />
      <Route path="/motivo-termino-contrato" component={MotivoTerminoContrato} />
      <Route path="/grupo-servico" component={GrupoServico} />
      <Route path="/atividade" component={Atividade} />
    </Router>
  );
}

export default Routes;
