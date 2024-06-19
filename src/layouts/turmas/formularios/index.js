import {useState, useEffect} from "react";
import * as React from 'react';
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import MDAlert from "../../../components/MDAlert";

import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import Footer from "../../../examples/Footer";
import AuthService from "../../../services/auth-service";
import Box from "@mui/material/Box";
import {Step, StepButton, StepLabel, Stepper, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import EnderecoFormulario from "./enderecoFormulario";
import DadosFormulario from "./dadosFormulario";
import HeaderFuncionario from "./Header";
import HeaderTurma from "./Header";


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

const TurmaFormulario = () => {
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
            <HeaderTurma>
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
                                    Cadastro de Turma
                                </Typography>
                                <Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => (
                                        <Step key={label} completed={completed[index]}>
                                            {/*<StepLabel>{label}</StepLabel>*/}
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
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            // disabled={activeStep === 0}
                                                            onClick={handleBack}
                                                            sx={{ mr: 1 }}
                                                        >
                                                            Voltar
                                                        </Button>
                                                    )}
                                                    <Box sx={{flex: '1 1 auto'}}/>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleNext}
                                                        // className={classes.button}
                                                    >
                                                        {activeStep === steps.length - 1 ? 'Enviar' : 'Proxima 01'}
                                                    </Button>
                                                </Box>

                                                // <Box    >
                                                //     <Button
                                                //         variant="contained"
                                                //         color="primary"
                                                //         onClick={handleBack}>
                                                //         Voltar
                                                //     </Button>
                                                // </Box>
                                            ):(
                                                <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>

                                                    <Box sx={{flex: '1 1 auto'}}/>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleNext}
                                                        // className={classes.button}
                                                    >
                                                        {activeStep === steps.length - 1 ? '' : 'Proxima'}
                                                    </Button>
                                                </Box>
                                            )}

                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                                {/*{activeStep == 0 ? (*/}
                                {/*    <React.Fragment>*/}
                                {/*      <Typography sx={{ mt: 2, mb: 2 }}>*/}
                                {/*        <>*/}
                                {/*          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>*/}
                                {/*            <MDBox*/}
                                {/*                display="flex"*/}
                                {/*                flexDirection="column"*/}
                                {/*                alignItems="flex-start"*/}
                                {/*                width="100%"*/}
                                {/*                mr={2}*/}
                                {/*            >*/}
                                {/*              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">*/}
                                {/*                Name teste*/}
                                {/*              </MDTypography>*/}
                                {/*              <MDBox mb={2} width="100%">*/}
                                {/*                <MDInput*/}
                                {/*                    type="name"*/}
                                {/*                    fullWidth*/}
                                {/*                    name="name"*/}
                                {/*                    value={user.name}*/}
                                {/*                    onChange={changeHandler}*/}
                                {/*                    error={errors.nameError}*/}
                                {/*                />*/}
                                {/*                {errors.nameError && (*/}
                                {/*                    <MDTypography variant="caption" color="error" fontWeight="light">*/}
                                {/*                      The name can not be null*/}
                                {/*                    </MDTypography>*/}
                                {/*                )}*/}
                                {/*              </MDBox>*/}
                                {/*            </MDBox>*/}
                                {/*            <MDBox*/}
                                {/*                display="flex"*/}
                                {/*                flexDirection="column"*/}
                                {/*                alignItems="flex-start"*/}
                                {/*                width="100%"*/}
                                {/*                ml={2}*/}
                                {/*            >*/}
                                {/*              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">*/}
                                {/*                Email*/}
                                {/*              </MDTypography>*/}
                                {/*              <MDBox mb={1} width="100%">*/}
                                {/*                <MDInput*/}
                                {/*                    type="email"*/}
                                {/*                    fullWidth*/}
                                {/*                    name="email"*/}
                                {/*                    value={user.email}*/}
                                {/*                    onChange={changeHandler}*/}
                                {/*                    error={errors.emailError}*/}
                                {/*                    disabled={isDemo}*/}
                                {/*                />*/}
                                {/*                {errors.emailError && (*/}
                                {/*                    <MDTypography variant="caption" color="error" fontWeight="light">*/}
                                {/*                      The email must be valid*/}
                                {/*                    </MDTypography>*/}
                                {/*                )}*/}
                                {/*              </MDBox>*/}
                                {/*              {isDemo && (*/}
                                {/*                  <MDTypography variant="caption" color="text" fontWeight="light">*/}
                                {/*                    In the demo version the email can not be updated*/}
                                {/*                  </MDTypography>*/}
                                {/*              )}*/}
                                {/*            </MDBox>*/}
                                {/*          </MDBox>*/}

                                {/*          <MDBox display="flex" flexDirection="column" mb={3}>*/}
                                {/*            <MDBox display="flex" flexDirection="row">*/}
                                {/*              <MDBox*/}
                                {/*                  display="flex"*/}
                                {/*                  flexDirection="column"*/}
                                {/*                  alignItems="flex-start"*/}
                                {/*                  width="100%"*/}
                                {/*                  mr={2}*/}
                                {/*              >*/}
                                {/*                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">*/}
                                {/*                  New Password*/}
                                {/*                </MDTypography>*/}
                                {/*                <MDBox mb={2} width="100%">*/}
                                {/*                  <MDInput*/}
                                {/*                      type="password"*/}
                                {/*                      fullWidth*/}
                                {/*                      name="newPassword"*/}
                                {/*                      placeholder="New Password"*/}
                                {/*                      value={user.newPassword}*/}
                                {/*                      onChange={changeHandler}*/}
                                {/*                      error={errors.newPassError}*/}
                                {/*                      disabled={isDemo}*/}
                                {/*                      inputProps={{*/}
                                {/*                        autoComplete: "new-password",*/}
                                {/*                        form: {*/}
                                {/*                          autoComplete: "off",*/}
                                {/*                        },*/}
                                {/*                      }}*/}
                                {/*                  />*/}
                                {/*                  {errors.newPassError && (*/}
                                {/*                      <MDTypography variant="caption" color="error" fontWeight="light">*/}
                                {/*                        The password must be of at least 8 characters*/}
                                {/*                      </MDTypography>*/}
                                {/*                  )}*/}
                                {/*                </MDBox>*/}
                                {/*              </MDBox>*/}
                                {/*              <MDBox*/}
                                {/*                  display="flex"*/}
                                {/*                  flexDirection="column"*/}
                                {/*                  alignItems="flex-start"*/}
                                {/*                  width="100%"*/}
                                {/*                  ml={2}*/}
                                {/*              >*/}
                                {/*                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">*/}
                                {/*                  Password Confirmation*/}
                                {/*                </MDTypography>*/}
                                {/*                <MDBox mb={1} width="100%">*/}
                                {/*                  <MDInput*/}
                                {/*                      type="password"*/}
                                {/*                      fullWidth*/}
                                {/*                      name="confirmPassword"*/}
                                {/*                      placeholder="Confirm Password"*/}
                                {/*                      value={user.confirmPassword}*/}
                                {/*                      onChange={changeHandler}*/}
                                {/*                      error={errors.confirmPassError}*/}
                                {/*                      disabled={isDemo}*/}
                                {/*                      inputProps={{*/}
                                {/*                        autoComplete: "confirmPassword",*/}
                                {/*                        form: {*/}
                                {/*                          autoComplete: "off",*/}
                                {/*                        },*/}
                                {/*                      }}*/}
                                {/*                  />*/}
                                {/*                  {errors.confirmPassError && (*/}
                                {/*                      <MDTypography variant="caption" color="error" fontWeight="light">*/}
                                {/*                        The password confirmation must match the current password*/}
                                {/*                      </MDTypography>*/}
                                {/*                  )}*/}
                                {/*                </MDBox>*/}
                                {/*                {isDemo && (*/}
                                {/*                    <MDTypography variant="caption" color="text" ml={1} fontWeight="light">*/}
                                {/*                      In the demo version the password can not be updated*/}
                                {/*                    </MDTypography>*/}
                                {/*                )}*/}
                                {/*              </MDBox>*/}
                                {/*            </MDBox>*/}
                                {/*            /!*<MDBox mt={4} display="flex" justifyContent="end">*!/*/}
                                {/*            /!*  <MDButton variant="gradient" color="info" type="submit">*!/*/}
                                {/*            /!*    Save changes*!/*/}
                                {/*            /!*  </MDButton>*!/*/}
                                {/*            /!*</MDBox>*!/*/}
                                {/*          </MDBox>*/}

                                {/*        </>*/}

                                {/*      </Typography>*/}
                                {/*      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>*/}
                                {/*        <Box sx={{ flex: '1 1 auto' }} />*/}
                                {/*        /!* <Button onClick={handleReset}>Reset</Button> *!/*/}

                                {/*        <Button onClick={handleNext}>*/}
                                {/*          {activeStep === steps.length - 1 ? 'Finish' : 'Proximar'}*/}
                                {/*        </Button>*/}
                                {/*      </Box>*/}
                                {/*    </React.Fragment>*/}
                                {/*) : (*/}
                                {/*    <React.Fragment>*/}
                                {/*      {activeStep == 1 ? (*/}
                                {/*          <>*/}
                                {/*          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>*/}
                                {/*            <MDBox*/}
                                {/*                display="flex"*/}
                                {/*                flexDirection="column"*/}
                                {/*                alignItems="flex-start"*/}
                                {/*                width="100%"*/}
                                {/*                mr={2}*/}
                                {/*            >*/}
                                {/*              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">*/}
                                {/*                Name teste*/}
                                {/*              </MDTypography>*/}
                                {/*              <MDBox mb={2} width="100%">*/}
                                {/*                <MDInput*/}
                                {/*                    type="name"*/}
                                {/*                    fullWidth*/}
                                {/*                    name="name"*/}
                                {/*                    value={user.name}*/}
                                {/*                    onChange={changeHandler}*/}
                                {/*                    error={errors.nameError}*/}
                                {/*                />*/}
                                {/*                {errors.nameError && (*/}
                                {/*                    <MDTypography variant="caption" color="error" fontWeight="light">*/}
                                {/*                      The name can not be null*/}
                                {/*                    </MDTypography>*/}
                                {/*                )}*/}
                                {/*              </MDBox>*/}
                                {/*            </MDBox>*/}
                                {/*            <MDBox*/}
                                {/*                display="flex"*/}
                                {/*                flexDirection="column"*/}
                                {/*                alignItems="flex-start"*/}
                                {/*                width="100%"*/}
                                {/*                ml={2}*/}
                                {/*            >*/}
                                {/*              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">*/}
                                {/*                Email*/}
                                {/*              </MDTypography>*/}
                                {/*              <MDBox mb={1} width="100%">*/}
                                {/*                <MDInput*/}
                                {/*                    type="email"*/}
                                {/*                    fullWidth*/}
                                {/*                    name="email"*/}
                                {/*                    value={user.email}*/}
                                {/*                    onChange={changeHandler}*/}
                                {/*                    error={errors.emailError}*/}
                                {/*                    disabled={isDemo}*/}
                                {/*                />*/}
                                {/*                {errors.emailError && (*/}
                                {/*                    <MDTypography variant="caption" color="error" fontWeight="light">*/}
                                {/*                      The email must be valid*/}
                                {/*                    </MDTypography>*/}
                                {/*                )}*/}
                                {/*              </MDBox>*/}
                                {/*              {isDemo && (*/}
                                {/*                  <MDTypography variant="caption" color="text" fontWeight="light">*/}
                                {/*                    In the demo version the email can not be updated*/}
                                {/*                  </MDTypography>*/}
                                {/*              )}*/}
                                {/*            </MDBox>*/}
                                {/*          </MDBox>*/}

                                {/*          <MDBox display="flex" flexDirection="column" mb={3}>*/}
                                {/*            <MDBox display="flex" flexDirection="row">*/}
                                {/*              <MDBox*/}
                                {/*                  display="flex"*/}
                                {/*                  flexDirection="column"*/}
                                {/*                  alignItems="flex-start"*/}
                                {/*                  width="100%"*/}
                                {/*                  mr={2}*/}
                                {/*              >*/}
                                {/*                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">*/}
                                {/*                  New Password*/}
                                {/*                </MDTypography>*/}
                                {/*                <MDBox mb={2} width="100%">*/}
                                {/*                  <MDInput*/}
                                {/*                      type="password"*/}
                                {/*                      fullWidth*/}
                                {/*                      name="newPassword"*/}
                                {/*                      placeholder="New Password"*/}
                                {/*                      value={user.newPassword}*/}
                                {/*                      onChange={changeHandler}*/}
                                {/*                      error={errors.newPassError}*/}
                                {/*                      disabled={isDemo}*/}
                                {/*                      inputProps={{*/}
                                {/*                        autoComplete: "new-password",*/}
                                {/*                        form: {*/}
                                {/*                          autoComplete: "off",*/}
                                {/*                        },*/}
                                {/*                      }}*/}
                                {/*                  />*/}
                                {/*                  {errors.newPassError && (*/}
                                {/*                      <MDTypography variant="caption" color="error" fontWeight="light">*/}
                                {/*                        The password must be of at least 8 characters*/}
                                {/*                      </MDTypography>*/}
                                {/*                  )}*/}
                                {/*                </MDBox>*/}
                                {/*              </MDBox>*/}
                                {/*              <MDBox*/}
                                {/*                  display="flex"*/}
                                {/*                  flexDirection="column"*/}
                                {/*                  alignItems="flex-start"*/}
                                {/*                  width="100%"*/}
                                {/*                  ml={2}*/}
                                {/*              >*/}
                                {/*                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">*/}
                                {/*                  Password Confirmation*/}
                                {/*                </MDTypography>*/}
                                {/*                <MDBox mb={1} width="100%">*/}
                                {/*                  <MDInput*/}
                                {/*                      type="password"*/}
                                {/*                      fullWidth*/}
                                {/*                      name="confirmPassword"*/}
                                {/*                      placeholder="Confirm Password"*/}
                                {/*                      value={user.confirmPassword}*/}
                                {/*                      onChange={changeHandler}*/}
                                {/*                      error={errors.confirmPassError}*/}
                                {/*                      disabled={isDemo}*/}
                                {/*                      inputProps={{*/}
                                {/*                        autoComplete: "confirmPassword",*/}
                                {/*                        form: {*/}
                                {/*                          autoComplete: "off",*/}
                                {/*                        },*/}
                                {/*                      }}*/}
                                {/*                  />*/}
                                {/*                  {errors.confirmPassError && (*/}
                                {/*                      <MDTypography variant="caption" color="error" fontWeight="light">*/}
                                {/*                        The password confirmation must match the current password*/}
                                {/*                      </MDTypography>*/}
                                {/*                  )}*/}
                                {/*                </MDBox>*/}
                                {/*                {isDemo && (*/}
                                {/*                    <MDTypography variant="caption" color="text" ml={1} fontWeight="light">*/}
                                {/*                      In the demo version the password can not be updated*/}
                                {/*                    </MDTypography>*/}
                                {/*                )}*/}
                                {/*              </MDBox>*/}
                                {/*            </MDBox>*/}
                                {/*            /!*<MDBox mt={4} display="flex" justifyContent="end">*!/*/}
                                {/*            /!*  <MDButton variant="gradient" color="info" type="submit">*!/*/}
                                {/*            /!*    Save changes*!/*/}
                                {/*            /!*  </MDButton>*!/*/}
                                {/*            /!*</MDBox>*!/*/}
                                {/*          </MDBox>*/}

                                {/*          </>*/}
                                {/*          // <Typography sx={{ mt: 2, mb: 1 }}>oi a {activeStep + 1}</Typography>*/}
                                {/*      ) : (*/}
                                {/*          <Typography sx={{ mt: 2, mb: 1 }}>oi b {activeStep + 1}</Typography>*/}
                                {/*      )}*/}

                                {/*      {activeStep == 3 ? (*/}
                                {/*          <Typography sx={{ mt: 2, mb: 1 }}>oi c {activeStep + 1}</Typography>*/}
                                {/*      ) : (*/}
                                {/*          ''*/}
                                {/*      )}*/}

                                {/*      <React.Fragment>*/}
                                {/*        {getStepContent(activeStep)}*/}
                                {/*        <div className={classes.buttons}>*/}
                                {/*          {activeStep !== 0 && (*/}
                                {/*              <Button onClick={handleBack} className={classes.button}>*/}
                                {/*                Back*/}
                                {/*              </Button>*/}
                                {/*          )}*/}
                                {/*          <Button*/}
                                {/*              variant="contained"*/}
                                {/*              color="primary"*/}
                                {/*              onClick={handleNext}*/}
                                {/*              className={classes.button}*/}
                                {/*          >*/}
                                {/*            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}*/}
                                {/*          </Button>*/}
                                {/*        </div>*/}
                                {/*      </React.Fragment>*/}

                                {/*      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>*/}
                                {/*        <Button*/}
                                {/*            color="inherit"*/}
                                {/*            disabled={activeStep === 0}*/}
                                {/*            onClick={handleBack}*/}
                                {/*            sx={{ mr: 1 }}*/}
                                {/*        >*/}
                                {/*          Canselar*/}
                                {/*        </Button>*/}
                                {/*        <Box sx={{ flex: '1 1 auto' }} />*/}
                                {/*        {isStepOptional(activeStep) && (*/}
                                {/*            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>*/}
                                {/*              voltar*/}
                                {/*            </Button>*/}
                                {/*        )}*/}

                                {/*        <Button onClick={handleNext}>*/}
                                {/*          {activeStep === steps.length - 1 ? 'Finish' : 'Proximar'}*/}
                                {/*        </Button>*/}
                                {/*      </Box>*/}
                                {/*    </React.Fragment>*/}
                                {/*)}*/}
                            </Box>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </HeaderTurma>
        </DashboardLayout>
    );
};

export default TurmaFormulario;
