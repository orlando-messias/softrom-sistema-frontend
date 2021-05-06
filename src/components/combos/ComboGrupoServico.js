// react
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// material-ui
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// services
import api from "../../services/api";


// COMBO GRUPO DE SERVICO COMPONENT
const ComboGrupoServico = ({ grupoServico, setCurrentGrupoServico }) => {
  const [data, setData] = useState([]);
  const [valueSelect, setValueSelect] = useState('');

  const user = useSelector((state) => state.loginReducer.user);
  const origin_id = useSelector((state) => state.loginReducer.origin);
  const empresa_id = useSelector(
    (state) => state.loginReducer.empresaSelecionada.id
  );

  let isRendered = useRef(false);

  useEffect(() => {
    setValueSelect(grupoServico);
  }, [grupoServico]);

  useEffect(() => {
    isRendered = true;
    api(user.token)
      .get(`/origem/${origin_id}/empresa/51/grupo_servico`)
      .then((response) => {
        if (isRendered) {
          setData(response.data.result.data);
        }
        return null;
      })
      .catch((err) => console.log(err));
    return () => {
      isRendered = false;
    };
  }, []);

  useEffect(() => {
    setValueSelect(grupoServico);
  }, [grupoServico]);

  return (
    <>
      <Autocomplete
        options={data}
        value={valueSelect || null}
        onChange={(event, newValue) => {
          setValueSelect(newValue);
          setCurrentGrupoServico(newValue);
        }}
        getOptionLabel={(option) => option.id + " - " + option.descricao}
        style={{ width: 300, marginTop: 10}}
        renderInput={(params) => (
          <TextField {...params} label="Grupo de Serviço" variant="outlined" size="small" />
        )}
      />
    </>
  );
};

export default ComboGrupoServico;
