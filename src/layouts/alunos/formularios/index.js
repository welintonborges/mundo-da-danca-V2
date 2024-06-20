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
import HeaderAluno from "./Header";
import DadosFormulario from "./dadosFormulario";
import EnderecoFormulario from "./enderecoFormulario";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Botao from "../../../components/Botao";
import Grid from "@mui/material/Grid";


const steps = ['Dados Gerais', 'Dados Contato', 'Logo', 'Resumo'];

function getStepContent(step) {
    console.log("step ==> ", step)
    switch (step) {
        case 0:
            return <DadosFormulario/>;
        case 1:
            return <EnderecoFormulario/>;
        case 2:
            return <EnderecoFormulario/>;
        default:
        // throw new Error('Unknown steps');
    }
}

const AlunoFormulario = () => {
    const [isDemo, setIsDemo] = useState(false);
    const [notification, setNotification] = useState(false);
    const [completed, setCompleted] = React.useState({});
    const [user, setUser] = useState({
        name: "",
        email: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    // const isStepOptional = (step) => {
    //   return step === 1;
    // };

    const isStepOptional = (step) => {
        return step != 0;
    };

    const handleNext = () => {
        console.log("aqui")
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };


    const [errors, setErrors] = useState({
        nameError: false,
        emailError: false,
        newPassError: false,
        confirmPassError: false,
    });

    const getUserData = async () => {
        const response = await AuthService.getProfile();
        if (response.data.id == 1) {
            setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
        }
        setUser((prevUser) => ({
            ...prevUser,
            ...response.data.attributes,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }));
    };

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (notification === true) {
            setTimeout(() => {
                setNotification(false);
            }, 5000);
        }
    }, [notification]);


    const submitHandler = async (e) => {
        e.preventDefault();

        // validation
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (user.name.trim().length === 0) {
            setErrors({...errors, nameError: true});
            return;
        }

        if (user.email.trim().length === 0 || !user.email.trim().match(mailFormat)) {
            setErrors({...errors, emailError: true});
            return;
        }

        if (user.confirmPassword || user.newPassword) {
            // in the api the confirmed password should be the same with the current password, not the new one
            if (user.confirmPassword.trim() !== user.newPassword.trim()) {
                setErrors({...errors, confirmPassError: true});
                return;
            }
            if (user.newPassword.trim().length < 8) {
                setErrors({...errors, newPassError: true});
                return;
            }
        }

        let userData = {
            data: {
                type: "profile",
                attributes: {
                    name: user.name,
                    email: user.email,
                    profile_image: null,
                },
            },
        };
        // set new user data for call
        if (user.newPassword.length > 0) {
            userData = {
                data: {
                    type: "profile",
                    attributes: {
                        ...user,
                        profile_image: null,
                        password: user.newPassword,
                        password_new: user.newPassword,
                        password_confirmation: user.confirmPassword,
                    },
                },
            };
        }

        // call api for update
        const response = await AuthService.updateProfile(JSON.stringify(userData));

        // reset errors
        setErrors({
            nameError: false,
            emailError: false,
            passwordError: false,
            newPassError: false,
            confirmPassError: false,
        });

        setNotification(true);
    };


    return (
        <DashboardLayout>
            <DashboardNavbar/>
            {/*<CssBaseline />*/}
            {/*<MDBox mb={2} />*/}
            <HeaderAluno>
                {notification && (
                    <MDAlert color="info" mt="20px">
                        <MDTypography variant="body2" color="white">
                            Your profile has been updated
                        </MDTypography>
                    </MDAlert>
                )}
                <MDBox
                    component="form"
                    role="form"
                    onSubmit={submitHandler}
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
                                    Cadastro de Aluno
                                </Typography>
                                    <Stepper nonLinear activeStep={activeStep}>
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
                                                Thank you for your order.
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                Your order number is #2001539. We have emailed your order confirmation,
                                                and will
                                                send you an update when your order has shipped.
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
            </HeaderAluno>
        </DashboardLayout>
    );
};

export default AlunoFormulario;
