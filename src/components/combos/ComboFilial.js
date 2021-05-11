import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
// services
import api from "../../services/api";
import { Formik, Form } from "formik";

const ComboFilial = (props) => {
  const [data, setData] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [valueSelect, setValueSelect] = useState(props.filial);

  const initialValues = {
    filial: { id: '', descricao: '' }
  };

  const user = useSelector((state) => state.loginReducer.user);
  const origin_id = useSelector((state) => state.loginReducer.origin);
  const empresa_id = useSelector(
    (state) => state.loginReducer.empresaSelecionada.id
  );

  let isRendered = useRef(false); //variavel de estado para cancelar requisicao quando
  //a pagina for fechada
  useEffect(() => {
    isRendered = true;
    api(user.token)
      .get(`/origem/${origin_id}/empresa/51/filial`)
      .then((response) => {
        if (isRendered) {
          console.log(response.data.result.data);
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
    setValueSelect(props.filial);
  }, [props.filial]);

  const submit = values => {
    alert(`${JSON.stringify(values.filial_id)}`);
  };

  return (
    <Formik initialValues={valueSelect} onSubmit={submit}>
      {({ handleChange, values, setFieldValue }) => (
        <Form>
          <Autocomplete
            id='filial_id'
            options={data}
            onChange={(event, newValue) => {
              setValueSelect(
                "filial_id",
                newValue !== null ? newValue : valueSelect.filial_id
              );
              props.setCurrentFilial(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            getOptionSelected={(option, value) =>
              option.id === value.id || option.id === valueSelect.id
            }
            getOptionLabel={(option) => `${option.id} - ${option.nome_fantasia}`}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Filial" variant="outlined" size="small" />
            )}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ComboFilial;
