import {Typography} from "@mui/material";
import MDBox from "../../../components/MDBox";
import * as React from "react";
import {useMemo, useState} from "react";
import Stack from '@mui/material/Stack';
import BotaoTexto from "../../../components/BotaoTexto";
import MDButton from "../../../components/MDButton";
import SearchIcon from '@mui/icons-material/Search';
import BotaoUploadImagem from "../../../components/BotoaUplodImagem";
import MDTypography from "../../../components/MDTypography";
import MDInput from "../../../components/MDInput";


const FotoFormulario = () => {
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
                                <BotaoUploadImagem
                                title="Selecione uma imagen"
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
                                        title="Bairro"
                                        type="text"
                                        placeholder="Digite seu Bairro ..."
                                        width="150px"
                                    />
                                    <BotaoTexto
                                        title="UF"
                                        type="text"
                                        placeholder="Digite seu UF ..."
                                        width="100px"
                                    />

                                    <BotaoTexto
                                        title="CEP"
                                        type="text"
                                        placeholder="Digite seu CEP ..."
                                        width="150px"
                                    />

                                    <MDButton
                                        type="button"
                                        size="lg"
                                    >
                                        <SearchIcon sx={{fontSize: 40}}/>
                                    </MDButton>
                                </Stack>
                            </MDBox>
                        </MDBox>
                    </Typography>
                </React.Fragment>
            </form>
        </section>
    )
}

export default FotoFormulario;