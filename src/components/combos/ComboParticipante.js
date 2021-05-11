// react
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// material-ui
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// services
import api from "../../services/api";

// COMBOPARTICIPANTE COMPONENT
const ComboParticipante = ({ participante, setCurrentParticipante }) => {
  const [data, setData] = useState([]);
  const [valueSelect, setValueSelect] = useState(participante);

  const user = useSelector((state) => state.loginReducer.user);
  const origin_id = useSelector((state) => state.loginReducer.origin);
  const empresa_id = useSelector(
    (state) => state.loginReducer.empresaSelecionada.id
  );

  let isRendered = useRef(false);

  useEffect(() => {
    isRendered = true;
    api(user.token)
      .get(`/origem/${origin_id}/empresa/51/participante`)
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
    setValueSelect(participante);
  }, [participante]);

  return (
    <>
      <Autocomplete
        options={data}
        value={valueSelect || null}
        onChange={(event, newValue) => {
          setValueSelect(newValue);
          setCurrentParticipante(newValue);
        }}
        getOptionLabel={(option) => option.id + "-" + option.nome}
        style={{ width: 300, marginBottom: 20 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Participante"
            variant="outlined"
            size="small"
          />
        )}
      />
    </>
  );
};

export default ComboParticipante;
