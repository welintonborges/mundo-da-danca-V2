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


const FotoFormulario = ({ formDataAtual, setFormDataAtual }) => {
    const [isDemo, setIsDemo] = useState(false);
    console.log("form ==> ",formDataAtual)

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
                                    valor={formDataAtual.foto.thumbnail}
                                    aoAlterado={(valor) => setFormDataAtual({...formDataAtual,
                                        foto: {...formDataAtual.foto, thumbnail: valor } })}
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

                                    <div className="descricao-foto" id="descicao-foto">
                                        A dimensão recomendada é de 1600 x 838
                                        (mesma proporção do formato utilizado nas páginas de evento no Facebook).
                                        Formato JPEG, GIF ou PNG de no máximo 2MB.
                                        Imagens com dimensões diferentes serão redimensionadas.

                                    </div>

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