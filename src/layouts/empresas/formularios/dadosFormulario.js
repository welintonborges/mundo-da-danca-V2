import {Typography} from "@mui/material";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDInput from "../../../components/MDInput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import BotaoTexto from "../../../components/BotaoTexto";
import BotaoTelefone from "../../../components/BotaoTelefone";
import Stack from "@mui/material/Stack";

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
            <form>
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                    </Typography>
                    <Typography sx={{mt: 2, mb: 2}}>
                        <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
                            <Stack width="100%"
                                   direction={{xs: 'column', sm: 'row'}}
                                   spacing={{xs: 1, sm: 1, md: 1}}
                            >
                                <BotaoTexto
                                    title="Nome"
                                    type="text"
                                    valor={formDataAtual.dados.razao_social}
                                    aoAlterado={(valor) => setFormDataAtual({...formDataAtual, dados: {...formDataAtual.dados, razao_social: valor } })}
                                    placeholder="Digite seu nome ..."
                                />
                                <BotaoTexto
                                    title="Nome fantasia"
                                    type="tex"
                                    valor={formDataAtual.dados.nome_fantasia}
                                    aoAlterado={(valor) => setFormDataAtual({...formDataAtual, dados: {...formDataAtual.dados, nome_fantasia: valor } })}
                                    placeholder="Digite o Nome fantasia ..."
                                />
                            </Stack>
                        </MDBox>

                        <MDBox display="flex" flexDirection="column" mb={3}>
                            <MDBox display="flex" flexDirection="row">
                                <BotaoTelefone
                                    title="Telefone"
                                    type="tel"
                                    valor={formDataAtual.dados.telefone}
                                    aoAlterado={(valor) => setFormDataAtual({...formDataAtual, dados: {...formDataAtual.dados, telefone: valor } })}
                                    placeholder="Digite seu telefone ..."
                                />
                                <BotaoTexto
                                    title="E-mail"
                                    type="email"
                                    valor={formDataAtual.dados.email}
                                    aoAlterado={(valor) => setFormDataAtual({...formDataAtual, dados: {...formDataAtual.dados, email: valor } })}
                                    placeholder="Digite seu e-mail ..."
                                />

                                <BotaoTexto
                                    title="CNPJ/CPF"
                                    type="text"
                                    valor={formDataAtual.dados.numero_documento}
                                    aoAlterado={(valor) => setFormDataAtual({...formDataAtual, dados: {...formDataAtual.dados, numero_documento: valor } })}
                                    placeholder="Digite sua Razão social ..."
                                />
                            </MDBox>
                        </MDBox>
                    </Typography>
                </React.Fragment>
            </form>
        </section>
    )
}

export default DadosFormulario;