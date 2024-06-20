import {Typography} from "@mui/material";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDInput from "../../../components/MDInput";
import * as React from "react";
import {useState} from "react";
import Stack from '@mui/material/Stack';
import BotaoTexto from "../../../components/BotaoTexto";
import BotaoTelefone from "../../../components/BotaoTelefone";
import InputMask from "react-input-mask";

const DadosFormulario = () => {
    const [isDemo, setIsDemo] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        newPassword: "",
        confirmPassword: "",
    });

    const changeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const [errors, setErrors] = useState({
        nameError: false,
        emailError: false,
        newPassError: false,
        confirmPassError: false,
    });

    return (
        <section>
            <form>
                <React.Fragment>
                    <Typography sx={{mt: 2, mb: 2}}>
                        <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
                            <Stack width="100%"
                                   direction={{xs: 'column', sm: 'row'}}
                                   spacing={{xs: 1, sm: 1, md: 1}}
                            >
                                <BotaoTexto
                                title="Nome"
                                type="text"
                                placeholder="Digite seu nome ..."
                                />
                                <BotaoTelefone
                                    title="Telefone"
                                    type="tel"
                                    placeholder="Digite seu telefone ..."
                                />
                            </Stack>
                        </MDBox>
                        <MDBox display="flex" flexDirection="column" mb={3}>
                            <MDBox display="flex" flexDirection="row">
                                <Stack width="100%"
                                       direction={{xs: 'column', sm: 'row'}}
                                       spacing={{xs: 1, sm: 1, md: 1}}
                                >
                                    <BotaoTexto
                                        title="E-mail"
                                        type="email"
                                        placeholder="Digite seu e-mail ..."
                                    />

                                    <BotaoTexto
                                        title="Data de nascimento"
                                        type="date"
                                        placeholder="Digite sua data de nascimento ..."
                                    />
                                </Stack>
                            </MDBox>
                        </MDBox>
                    </Typography>
                </React.Fragment>
            </form>
        </section>
    )
}

export default DadosFormulario;