import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDInput from "../MDInput";
import * as React from "react";
import {useState} from "react";


const BotaoEmail = (props) => {
    const [statusError, setStatusError] = useState(false);
    const [statusSucess, setStatusSucess] = useState(false);
    const [nomeError, setNomeError] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const aoDigitado = (evento) => {
        props.aoAlterado(evento.target.value)
    }
    const handleBlur = (evento) => {
            validarEmail(evento.target.value)
    };

    const validarEmail = (email) => {
        let validado = email.trim().match(mailFormat)
        if (validado == null) {
            console.log("passamdo")
            setStatusError(true)
            setNomeError(true)
            setMensagem(`o campo ${props.title} e invalido!`)
        }else{
            console.log("validou")
            setNomeError(false)
            setStatusError(false)
            setStatusSucess(true)
        }
    }
    console.log("suce ==> ", statusSucess)
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

export default BotaoEmail;