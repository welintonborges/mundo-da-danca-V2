import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDInput from "../MDInput";
import * as React from "react";
import InputMask from 'react-input-mask';
import {useState} from "react";


const BotaoTelefone = (props) => {
    const [formattedPhone, setFormattedPhone] = useState('');
    const [statusError, setStatusError] = useState(false);
    const [statusSucess, setStatusSucess] = useState(false);
    const [nomeError, setNomeError] = useState(false);

    const phoneMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")
        return value
    }

    const mask = '(99) 999-9999';
    const formatChars = {
        '9': '[0-9]',
    };

    const handleInputChange = (evento) => {
        const inputValue = evento.target.value;
        const formattedValue = phoneMask(inputValue);
        if (formattedValue.length <= 15) {
            setFormattedPhone(formattedValue);
        }
        props.aoAlterado(evento.target.value)
    };
    const handleBlur = (evento) => {
        if(evento.target.value.length === 0){
            setStatusSucess(false)
            setStatusError(true)
            setNomeError(true)
        }else{
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
                {nomeError  && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                        o campo {props.title} e obrigatorio
                    </MDTypography>
                )}
            </MDBox>
        </MDBox>
    )
}

export default BotaoTelefone;