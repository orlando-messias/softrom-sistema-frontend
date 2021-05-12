// react
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// material-ui
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// services
import api from "../../services/api";

// COMBOPARTICIPANTE COMPONENT
const ComboFilial = ({ onChange, value, helperText, error }) => {
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
      .get(`/origem/${origin_id}/empresa/51/filial`)
      .then((response) => {
        if (isRendered) {
          const part = response.data.result.data.map((p) => ({
            id: p.id,
            nome_fantasia: p.nome_fantasia,
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
        name="filial"
        options={data}
        getOptionLabel={(option) => option.nome_fantasia}
        onChange={onChange}
        value={value}
        style={{ width: 300, marginBottom: 20 }}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={helperText}
            error={error}
            name="filial"
            label="Filial"
            variant="outlined"
            size="small"
          />
        )}
      />
    </>
  );
};

export default ComboFilial;
