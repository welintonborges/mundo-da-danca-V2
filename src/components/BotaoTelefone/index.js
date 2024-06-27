import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDInput from "../MDInput";
import * as React from "react";
import InputMask from 'react-input-mask';
import {useState} from "react";


const BotaoTelefone = (props) => {
    const [formattedPhone, setFormattedPhone] = useState('');

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
                    onChange={handleInputChange}
                    name={props.name}
                    value={formattedPhone}
                    error={props.error}
                    placeholder={props.placeholder}
                />
                {props.nameError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                        The name can not be null
                    </MDTypography>
                )}
            </MDBox>
        </MDBox>
    )
}

export default BotaoTelefone;