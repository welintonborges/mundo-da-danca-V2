import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDInput from "../MDInput";
import * as React from "react";
import {useState} from "react";


const BotaoTexto = (props) => {
    const [statusError, setStatusError] = useState(false);
    const [statusSucess, setStatusSucess] = useState(false);
    const [nomeError, setNomeError] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const aoDigitado = (evento) => {
        props.aoAlterado(evento.target.value)
    }
    const handleBlur = (evento) => {
            validarCampo(evento.target.value)

    };

    const validarCampo =(campo) => {
        if (campo.length === 0) {
            setStatusSucess(false)
            setStatusError(true)
            setNomeError(true)
            setMensagem( `o campo ${props.title} e obrigatorio`)
        } else {
            setNomeError(false)
            setStatusError(false)
            setStatusSucess(true)
        }
    }

    return (

        <MDBox
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="100%"
            mr={2}
        >
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                {props.title}
            </MDTypography>
            <MDBox mb={2} width="100%">
                <MDInput
                    type={props.type}
                    fullWidth
                    name={props.name}
                    value={props.valor}
                    onBlur={props.required == true ? handleBlur : ''}
                    onChange={aoDigitado}
                    error={statusError}
                    success={statusSucess}
                    placeholder={props.placeholder}

                    // success
                />
                {nomeError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                        {mensagem}
                    </MDTypography>
                )}
            </MDBox>
        </MDBox>
    )
}

export default BotaoTexto;