// react
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// material-ui
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// services
import api from "../../services/api";


// COMBO MOTIVO TERMINO CONTRATO COMPONENT
const ComboMotivoTerminoContrato = ({ motivoTerminoContrato, setCurrentMotivoTerminoContrato }) => {
  const [data, setData] = useState([]);
  const [valueSelect, setValueSelect] = useState('');

  const user = useSelector((state) => state.loginReducer.user);
  const origin_id = useSelector((state) => state.loginReducer.origin);
  const empresa_id = useSelector(
    (state) => state.loginReducer.empresaSelecionada.id
  );

  let isRendered = useRef(false);

  useEffect(() => {
    setValueSelect(motivoTerminoContrato);
  }, [motivoTerminoContrato]);

  useEffect(() => {
    isRendered = true;
    api(user.token)
      .get(`/origem/${origin_id}/empresa/51/contrato_motivo_termino`)
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
    setValueSelect(motivoTerminoContrato);
  }, [motivoTerminoContrato]);

  return (
    <>
      <Autocomplete
        options={data}
        value={valueSelect || null}
        onChange={(event, newValue) => {
          setValueSelect(newValue);
          setCurrentMotivoTerminoContrato(newValue);
        }}
        getOptionLabel={(option) => option.id + " - " + option.descricao}
        style={{ width: 300, marginTop: 10}}
        renderInput={(params) => (
          <TextField {...params} label="Motivo Término Contrato" variant="outlined" size="small" />
        )}
      />
    </>
  );
};

export default ComboMotivoTerminoContrato;
