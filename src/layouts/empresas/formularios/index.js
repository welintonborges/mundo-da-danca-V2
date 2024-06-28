import {useState, useEffect} from "react";
import * as React from 'react';
// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import MDAlert from "../../../components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import Footer from "../../../examples/Footer";
import AuthService from "../../../services/auth-service";
import Box from "@mui/material/Box";
import {Step, StepButton, StepLabel, Stepper, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import HeaderEmpresa from "./Header";
import DadosFormulario from "./dadosFormulario";
import EnderecoFormulario from "./enderecoFormulario";
import FotoFormulario from "../../alunos/formularios/fotoFormulario";
import ResumoFormulario from "../../alunos/formularios/resumoFormulario";
import Botao from "../../../components/Botao";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CadastroService from "../../../services/cadastro-service";


const steps = ['Dados Gerais', 'Dados Contato', 'Logo', 'Resumo'];

const EmpresaFormulario = () => {
    const [isDemo, setIsDemo] = useState(false);
    const [notification, setNotification] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [completed, setCompleted] = React.useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [data_gravacao, setdata_gravacao] = useState(new Date());
    const isStepOptional = (step) => {
        return step <= 2;
    };
    const [formDataAtual, setFormDataAtual] = useState({
        dados: {
            razao_social: '',
            nome_fantasia: '',
            numero_documento: '',
            telefone: '',
            email: '',
        },
        endereco: {
            logradouro: '',
            complemento: '',
            localidade: '',
            bairro: '',
            cep: '',
            uf: '',
            id_pai:'',
            data_gravacao:''
        },
        foto: {
            thumbnail: '',
            id_pai:'',
            data_gravacao:''
        },
    });

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <DadosFormulario formDataAtual={formDataAtual} setFormDataAtual={setFormDataAtual}/>;
            case 1:
                return <EnderecoFormulario formDataAtual={formDataAtual} setFormDataAtual={setFormDataAtual}/>;
            case 2:
                return <FotoFormulario formDataAtual={formDataAtual} setFormDataAtual={setFormDataAtual}/>;
            case 3:
                return <ResumoFormulario formDataAtual={formDataAtual} setFormDataAtual={setFormDataAtual}/>;
            default:
                throw new Error('Unknown steps');
        }
    }

    const handleNext = () => {
        if(activeStep === 3){
            let id_usuario = "bde45a49"
            const resposta =  CadastroService.postEmpresa(formDataAtual.dados, id_usuario);
            resposta.then(id => {
                console.log("postEmpresa salvo ==>", id);
                if(id){
                    formDataAtual.foto.id_pai = id;
                    formDataAtual.endereco.id_pai = id;
                    formDataAtual.foto.data_gravacao = data_gravacao;
                    formDataAtual.endereco.data_gravacao = data_gravacao;
                    console.log("foto ==>: ", formDataAtual.foto )
                    CadastroService.postFoto(formDataAtual.foto);
                    CadastroService.posEndereco(formDataAtual.endereco)
                    setNotification(true)
                    setMensagem("Empressa salva com sucesso!!")
                }
            });

        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const getUserData = async () => {
         AuthService.getProfile();
    };

    useEffect(() => {
        getUserData();
    }, []);



    return (
        <DashboardLayout>
            {/*<DashboardNavbar/>*/}
            {/*<CssBaseline />*/}
            {/*<MDBox mb={2} />*/}
            <HeaderEmpresa>
                {notification && (
                    <MDAlert color="info" mt="20px">
                        <MDTypography variant="body2" color="white">
                            {mensagem}
                        </MDTypography>
                    </MDAlert>
                )}
                <MDBox
                    component="form"
                    role="form"
                    display="flex"
                    flexDirection="column"
                >
                    <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
                        <MDBox
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            width="100%"
                            mr={2}
                        >
                            <Box sx={{width: '100%'}}>
                                <Typography component="h1" variant="h4" align="center">
                                    Cadastro de Empresa
                                </Typography>{activeStep} - {notification}
                                <Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => (
                                        <Step key={label} completed={completed[index]}>
                                            <StepButton color="inherit" onClick={handleStep(index)}>
                                                {label}
                                            </StepButton>
                                        </Step>
                                    ))}
                                </Stepper>
                                <React.Fragment>
                                    {activeStep === steps.length ? (
                                        <React.Fragment>
                                            <Typography variant="h5" gutterBottom>
                                                Obrigado
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                mensagem
                                            </Typography>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            {getStepContent(activeStep)}
                                            {activeStep !== 0 ? (
                                                <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                                    {isStepOptional(activeStep) && (
                                                        <Botao
                                                            ml={2}
                                                            color="info"
                                                            onClick={handleBack}
                                                            nome_botao="Voltar"
                                                            startIcon={<ArrowBackIosIcon/>}
                                                        />
                                                    )}
                                                    <Box sx={{flex: '1 1 auto'}}/>
                                                    <Botao
                                                        color="info"
                                                        onClick={handleNext}
                                                        nome_botao={activeStep === steps.length - 1 ? 'Enviar' : 'Proxima'}
                                                        endIcon={<ArrowForwardIosIcon/>}
                                                    />
                                                </Box>

                                            ) : (
                                                <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                                    <Box sx={{flex: '1 1 auto'}}/>
                                                    <Botao
                                                        color="info"
                                                        onClick={handleNext}
                                                        nome_botao={activeStep === steps.length - 1 ? '' : 'Proxima'}
                                                        endIcon={<ArrowForwardIosIcon/>}
                                                    />
                                                </Box>
                                            )}
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            </Box>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </HeaderEmpresa>
            <Footer/>
        </DashboardLayout>
    );
};

export default EmpresaFormulario;
