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
import {toFormData} from "axios";

const DadosFormulario = ({ formDataAtual, setFormDataAtual }) => {
    const [isDemo, setIsDemo] = useState(false);

    const [errors, setErrors] = useState({
        nameError: false,
        emailError: false,
        newPassError: false,
        confirmPassError: false,
    });

    const dados = formDataAtual.dados;
    console.log(dados);
    return (
        <section>
            <form formDataAtual={formDataAtual}>
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
                                valor={formDataAtual.dados.nome}
                                aoAlterado={(valor) => setFormDataAtual({...formDataAtual, dados: {...formDataAtual.dados, nome: valor } })}
                                placeholder="Digite seu nome ..."
                                />
                                <BotaoTelefone
                                    title="Telefone"
                                    type="tel"
                                    valor={formDataAtual.dados.telefone}
                                    aoAlterado={(valor) => setFormDataAtual({...formDataAtual, dados: {...formDataAtual.dados, telefone: valor } })}
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
                                        valor={formDataAtual.dados.email}
                                        aoAlterado={(valor) => setFormDataAtual({...formDataAtual, dados: {...formDataAtual.dados, email: valor } })}
                                        placeholder="Digite seu e-mail ..."
                                    />

                                    <BotaoTexto
                                        title="Data de nascimento"
                                        type="date"
                                        valor={formDataAtual.dados.dataNascimento}
                                        aoAlterado={(valor) => setFormDataAtual({...formDataAtual, dados: {...formDataAtual.dados, dataNascimento: valor } })}
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