import {Typography} from "@mui/material";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDInput from "../../../components/MDInput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import Stack from '@mui/material/Stack';
import BotaoTexto from "../../../components/BotaoTexto";
import MDButton from "../../../components/MDButton";
import SearchIcon from '@mui/icons-material/Search';

const EnderecoFormulario = ({ formDataAtual, setFormDataAtual }) => {

    console.log("form ==> ",formDataAtual)

    const [isDemo, setIsDemo] = useState(false);

    const [errors, setErrors] = useState({
        nameError: false,
        emailError: false,
        newPassError: false,
        confirmPassError: false,
    });
    const endereco = formDataAtual.endereco;
    console.log(endereco);
    return (
        <section>
            <form  >
                <React.Fragment>
                    <Typography sx={{mt: 2, mb: 2}}>
                        <MDBox display="flex" flexDirection="row" mt={5} mb={3}>

                            <Stack width="100%"
                                   direction={{xs: 'column', sm: 'row'}}
                                   spacing={{xs: 1, sm: 1, md: 1}}
                            >

                                <BotaoTexto
                                    title="Endereço"
                                    type="text"
                                    type="text"valor={formDataAtual.endereco.endereco}
                                    aoAlterado={(valor) => setFormDataAtual({...formDataAtual, endereco: {...formDataAtual.endereco, endereco: valor } })}
                                    placeholder="Digite seu endereço ..."
                                />
                                <BotaoTexto
                                    title="Complemento"
                                    type="text"
                                    type="text"valor={formDataAtual.endereco.complemento}
                                    aoAlterado={(valor) => setFormDataAtual({...formDataAtual, endereco: {...formDataAtual.endereco, complemento: valor } })}
                                    placeholder="Digite seu numero ..."
                                />
                                <BotaoTexto
                                    title="Cidade"
                                    type="text"
                                    type="text"
                                    valor={formDataAtual.endereco.cidade}
                                    aoAlterado={(valor) => setFormDataAtual({...formDataAtual, endereco: {...formDataAtual.endereco, cidade: valor } })}
                                    placeholder="Digite seu cidade ..."
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
                                        type="text"valor={formDataAtual.endereco.bairro}
                                        aoAlterado={(valor) => setFormDataAtual({...formDataAtual, endereco: {...formDataAtual.endereco, bairro: valor } })}
                                        placeholder="Digite seu Bairro ..."
                                        width="150px"
                                    />
                                    <BotaoTexto
                                        title="UF"
                                        type="text"
                                        type="text"valor={formDataAtual.endereco.uf}
                                        aoAlterado={(valor) => setFormDataAtual({...formDataAtual, endereco: {...formDataAtual.endereco, uf: valor } })}
                                        placeholder="Digite seu UF ..."
                                        width="100px"
                                    />

                                    <BotaoTexto
                                        title="CEP"
                                        type="text"valor={formDataAtual.endereco.cep}
                                        aoAlterado={(valor) => setFormDataAtual({...formDataAtual, endereco: {...formDataAtual.endereco, cep: valor } })}
                                        placeholder="Digite seu CEP ..."
                                        width="150px"
                                    />

                                    <MDButton
                                        type="button"
                                        size="lg"
                                    >
                                        <SearchIcon sx={{ fontSize: 40 }} />
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

export default EnderecoFormulario;