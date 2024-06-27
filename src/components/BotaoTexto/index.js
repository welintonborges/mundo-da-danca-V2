import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDInput from "../MDInput";
import * as React from "react";


const BotaoTexto = (props) => {
    const aoDigitado = (evento) => {
       props.aoAlterado(evento.target.value)
    }
    return(

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
                    onChange={aoDigitado}
                    error={props.error}
                    placeholder={props.placeholder}
                    required={props.obrigatorio}

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

export default BotaoTexto;