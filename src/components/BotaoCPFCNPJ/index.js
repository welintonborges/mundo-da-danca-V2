import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDInput from "../MDInput";
import * as React from "react";
import InputMask from 'react-input-mask';
import {useState} from "react";


const BotaoCPFCNPJ = (props) => {
    const [formattedPhone, setFormattedPhone] = useState('');
    const [statusError, setStatusError] = useState(false);
    const [statusSucess, setStatusSucess] = useState(false);
    const [nomeError, setNomeError] = useState(false);

    const CNPJMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
        value = value.replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
        value = value.replace(/(\d{3})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
        value = value.replace(/(\d{4})(\d)/, '$1-$2')
        value = value.replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números

        return value
    }

    const cpfMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        value = value.replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        value = value.replace(/(\d{3})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2')
        value = value.replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada

        return value
    }

    const mask = '(99) 999-9999';
    const formatChars = {
        '9': '[0-9]',
    };

    const handleInputChange = (evento) => {
        const inputValue = evento.target.value;
        if (inputValue.length <= 14) {
            console.log("cpf")
            const formattedValue = cpfMask(inputValue);
            setFormattedPhone(formattedValue);
        } else {
            console.log("cnpj")
            const formattedValue = CNPJMask(inputValue);
            setFormattedPhone(formattedValue);
        }
        props.aoAlterado(evento.target.value)
    };
    const handleBlur = (evento) => {
        if (evento.target.value.length === 0) {
            setStatusSucess(false)
            setStatusError(true)
            setNomeError(true)
        } else {
            setNomeError(false)
            setStatusError(false)
            setStatusSucess(true)
        }
    };

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
                    mask={mask}
                    formatChars={formatChars}
                    onBlur={props.required == true ? handleBlur : ''}
                    error={statusError}
                    success={statusSucess}
                    onChange={handleInputChange}
                    name={props.name}
                    value={formattedPhone}
                    placeholder={props.placeholder}
                />
                {nomeError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                        o campo {props.title} e obrigatorio
                    </MDTypography>
                )}
            </MDBox>
        </MDBox>
    )
}

export default BotaoCPFCNPJ;