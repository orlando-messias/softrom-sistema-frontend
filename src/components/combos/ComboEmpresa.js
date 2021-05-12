// react
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// material-ui
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// services
import api from "../../services/api";

// COMBOPARTICIPANTE COMPONENT
const ComboEmpresa = ({ onChange, value, helperText, error }) => {
  const [data, setData] = useState([]);

  const user = useSelector((state) => state.loginReducer.user);
  const origin_id = useSelector((state) => state.loginReducer.origin);

  let isRendered = useRef(false);

  useEffect(() => {
    isRendered = true;
    api(user.token)
      .get(`/origem/${origin_id}/empresa`)
      .then((response) => {
        if (isRendered) {
          const emp = response.data.result.data.map((p) => ({
            id: p.id,
            nome: p.nome,
          }));
          console.log(emp);
          setData(emp);
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
        name="empresa"
        options={data}
        getOptionLabel={(option) => option.nome}
        onChange={onChange}
        value={value}
        style={{ width: 300, marginBottom: 20 }}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={helperText}
            error={error}
            name="empresa"
            label="Empresa"
            variant="outlined"
            size="small"
          />
        )}
      />
    </>
  );
};

export default ComboEmpresa;
