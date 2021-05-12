// react
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// material-ui
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// services
import api from "../../services/api";


// COMBO GRUPO DE SERVICO COMPONENT
const ComboGrupoServico = ({ onChange, value, helperText, error }) => {
  const [data, setData] = useState([]);

  const user = useSelector((state) => state.loginReducer.user);
  const origin_id = useSelector((state) => state.loginReducer.origin);
  const empresa_id = useSelector(
    (state) => state.loginReducer.empresaSelecionada.id
  );

  let isRendered = useRef(false);

  useEffect(() => {
    isRendered = true;
    api(user.token)
      .get(`/origem/${origin_id}/empresa/51/grupo_servico`)
      .then((response) => {
        if (isRendered) {
          const part = response.data.result.data.map((p) => ({
            id: p.id,
            descricao: p.descricao,
          }));

          setData(part);
        }
        return null;
      })
      .catch((err) => console.log(err));
    return () => {
      isRendered = false;
    };
  }, []);


  return (
    <>
      <Autocomplete
        name="grupoServico"
        options={data}
        getOptionLabel={(option) => option.descricao}
        onChange={onChange}
        value={value}
        style={{ width: 300, marginBottom: 20 }}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={helperText}
            error={error}
            name="grupoServico"
            label="Grupo Serviço"
            variant="outlined"
            size="small"
          />
        )}
      />
    </>
  );
};

export default ComboGrupoServico;
