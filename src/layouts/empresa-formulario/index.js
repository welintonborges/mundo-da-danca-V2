import { useState, useEffect } from "react";
import * as React from 'react';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/user-profile/Header";

import AuthService from "../../services/auth-service";
import Box from "@mui/material/Box";
import {Step, StepLabel, Stepper, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import HeaderEmpresa from "./Header";

const steps = ['Dados', 'Endereço', 'outros'];

const EmpresaFormulario = () => {
  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
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

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // validation
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (user.name.trim().length === 0) {
      setErrors({ ...errors, nameError: true });
      return;
    }

    if (user.email.trim().length === 0 || !user.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (user.confirmPassword || user.newPassword) {
      // in the api the confirmed password should be the same with the current password, not the new one
      if (user.confirmPassword.trim() !== user.newPassword.trim()) {
        setErrors({ ...errors, confirmPassError: true });
        return;
      }
      if (user.newPassword.trim().length < 8) {
        setErrors({ ...errors, newPassError: true });
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
      <DashboardNavbar />
      {/*<MDBox mb={2} />*/}
      <HeaderEmpresa >
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
              <Box

                  sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}

                >
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    // if (isStepOptional(index)) {
                    //   labelProps.optional = (
                    //     <Typography variant="caption">Optional</Typography>
                    //   );
                    // }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                  })}
                </Stepper>
                {activeStep == 0 ? (
                    <React.Fragment>
                      <Typography sx={{ mt: 2, mb: 2 }}>
                        <>
                          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
                            <MDBox
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                width="100%"
                                mr={2}
                            >
                              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                Name teste
                              </MDTypography>
                              <MDBox mb={2} width="100%">
                                <MDInput
                                    type="name"
                                    fullWidth
                                    name="name"
                                    value={user.name}
                                    onChange={changeHandler}
                                    error={errors.nameError}
                                />
                                {errors.nameError && (
                                    <MDTypography variant="caption" color="error" fontWeight="light">
                                      The name can not be null
                                    </MDTypography>
                                )}
                              </MDBox>
                            </MDBox>
                            <MDBox
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                width="100%"
                                ml={2}
                            >
                              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                Email
                              </MDTypography>
                              <MDBox mb={1} width="100%">
                                <MDInput
                                    type="email"
                                    fullWidth
                                    name="email"
                                    value={user.email}
                                    onChange={changeHandler}
                                    error={errors.emailError}
                                    disabled={isDemo}
                                />
                                {errors.emailError && (
                                    <MDTypography variant="caption" color="error" fontWeight="light">
                                      The email must be valid
                                    </MDTypography>
                                )}
                              </MDBox>
                              {isDemo && (
                                  <MDTypography variant="caption" color="text" fontWeight="light">
                                    In the demo version the email can not be updated
                                  </MDTypography>
                              )}
                            </MDBox>
                          </MDBox>

                          <MDBox display="flex" flexDirection="column" mb={3}>
                            <MDBox display="flex" flexDirection="row">
                              <MDBox
                                  display="flex"
                                  flexDirection="column"
                                  alignItems="flex-start"
                                  width="100%"
                                  mr={2}
                              >
                                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                  New Password
                                </MDTypography>
                                <MDBox mb={2} width="100%">
                                  <MDInput
                                      type="password"
                                      fullWidth
                                      name="newPassword"
                                      placeholder="New Password"
                                      value={user.newPassword}
                                      onChange={changeHandler}
                                      error={errors.newPassError}
                                      disabled={isDemo}
                                      inputProps={{
                                        autoComplete: "new-password",
                                        form: {
                                          autoComplete: "off",
                                        },
                                      }}
                                  />
                                  {errors.newPassError && (
                                      <MDTypography variant="caption" color="error" fontWeight="light">
                                        The password must be of at least 8 characters
                                      </MDTypography>
                                  )}
                                </MDBox>
                              </MDBox>
                              <MDBox
                                  display="flex"
                                  flexDirection="column"
                                  alignItems="flex-start"
                                  width="100%"
                                  ml={2}
                              >
                                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                  Password Confirmation
                                </MDTypography>
                                <MDBox mb={1} width="100%">
                                  <MDInput
                                      type="password"
                                      fullWidth
                                      name="confirmPassword"
                                      placeholder="Confirm Password"
                                      value={user.confirmPassword}
                                      onChange={changeHandler}
                                      error={errors.confirmPassError}
                                      disabled={isDemo}
                                      inputProps={{
                                        autoComplete: "confirmPassword",
                                        form: {
                                          autoComplete: "off",
                                        },
                                      }}
                                  />
                                  {errors.confirmPassError && (
                                      <MDTypography variant="caption" color="error" fontWeight="light">
                                        The password confirmation must match the current password
                                      </MDTypography>
                                  )}
                                </MDBox>
                                {isDemo && (
                                    <MDTypography variant="caption" color="text" ml={1} fontWeight="light">
                                      In the demo version the password can not be updated
                                    </MDTypography>
                                )}
                              </MDBox>
                            </MDBox>
                            {/*<MDBox mt={4} display="flex" justifyContent="end">*/}
                            {/*  <MDButton variant="gradient" color="info" type="submit">*/}
                            {/*    Save changes*/}
                            {/*  </MDButton>*/}
                            {/*</MDBox>*/}
                          </MDBox>

                        </>

                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {/* <Button onClick={handleReset}>Reset</Button> */}

                        <Button onClick={handleNext}>
                          {activeStep === steps.length - 1 ? 'Finish' : 'Proximar'}
                        </Button>
                      </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                      {activeStep == 1 ? (
                          <>
                          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
                            <MDBox
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                width="100%"
                                mr={2}
                            >
                              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                Name teste
                              </MDTypography>
                              <MDBox mb={2} width="100%">
                                <MDInput
                                    type="name"
                                    fullWidth
                                    name="name"
                                    value={user.name}
                                    onChange={changeHandler}
                                    error={errors.nameError}
                                />
                                {errors.nameError && (
                                    <MDTypography variant="caption" color="error" fontWeight="light">
                                      The name can not be null
                                    </MDTypography>
                                )}
                              </MDBox>
                            </MDBox>
                            <MDBox
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                width="100%"
                                ml={2}
                            >
                              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                Email
                              </MDTypography>
                              <MDBox mb={1} width="100%">
                                <MDInput
                                    type="email"
                                    fullWidth
                                    name="email"
                                    value={user.email}
                                    onChange={changeHandler}
                                    error={errors.emailError}
                                    disabled={isDemo}
                                />
                                {errors.emailError && (
                                    <MDTypography variant="caption" color="error" fontWeight="light">
                                      The email must be valid
                                    </MDTypography>
                                )}
                              </MDBox>
                              {isDemo && (
                                  <MDTypography variant="caption" color="text" fontWeight="light">
                                    In the demo version the email can not be updated
                                  </MDTypography>
                              )}
                            </MDBox>
                          </MDBox>

                          <MDBox display="flex" flexDirection="column" mb={3}>
                            <MDBox display="flex" flexDirection="row">
                              <MDBox
                                  display="flex"
                                  flexDirection="column"
                                  alignItems="flex-start"
                                  width="100%"
                                  mr={2}
                              >
                                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                  New Password
                                </MDTypography>
                                <MDBox mb={2} width="100%">
                                  <MDInput
                                      type="password"
                                      fullWidth
                                      name="newPassword"
                                      placeholder="New Password"
                                      value={user.newPassword}
                                      onChange={changeHandler}
                                      error={errors.newPassError}
                                      disabled={isDemo}
                                      inputProps={{
                                        autoComplete: "new-password",
                                        form: {
                                          autoComplete: "off",
                                        },
                                      }}
                                  />
                                  {errors.newPassError && (
                                      <MDTypography variant="caption" color="error" fontWeight="light">
                                        The password must be of at least 8 characters
                                      </MDTypography>
                                  )}
                                </MDBox>
                              </MDBox>
                              <MDBox
                                  display="flex"
                                  flexDirection="column"
                                  alignItems="flex-start"
                                  width="100%"
                                  ml={2}
                              >
                                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                  Password Confirmation
                                </MDTypography>
                                <MDBox mb={1} width="100%">
                                  <MDInput
                                      type="password"
                                      fullWidth
                                      name="confirmPassword"
                                      placeholder="Confirm Password"
                                      value={user.confirmPassword}
                                      onChange={changeHandler}
                                      error={errors.confirmPassError}
                                      disabled={isDemo}
                                      inputProps={{
                                        autoComplete: "confirmPassword",
                                        form: {
                                          autoComplete: "off",
                                        },
                                      }}
                                  />
                                  {errors.confirmPassError && (
                                      <MDTypography variant="caption" color="error" fontWeight="light">
                                        The password confirmation must match the current password
                                      </MDTypography>
                                  )}
                                </MDBox>
                                {isDemo && (
                                    <MDTypography variant="caption" color="text" ml={1} fontWeight="light">
                                      In the demo version the password can not be updated
                                    </MDTypography>
                                )}
                              </MDBox>
                            </MDBox>
                            {/*<MDBox mt={4} display="flex" justifyContent="end">*/}
                            {/*  <MDButton variant="gradient" color="info" type="submit">*/}
                            {/*    Save changes*/}
                            {/*  </MDButton>*/}
                            {/*</MDBox>*/}
                          </MDBox>

                          </>
                          // <Typography sx={{ mt: 2, mb: 1 }}>oi a {activeStep + 1}</Typography>
                      ) : (
                          <Typography sx={{ mt: 2, mb: 1 }}>oi b {activeStep + 1}</Typography>
                      )}

                      {activeStep == 3 ? (
                          <Typography sx={{ mt: 2, mb: 1 }}>oi c {activeStep + 1}</Typography>
                      ) : (
                          ''
                      )}
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                          Canselar
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                              voltar
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                          {activeStep === steps.length - 1 ? 'Finish' : 'Proximar'}
                        </Button>
                      </Box>
                    </React.Fragment>
                )}
              </Box>
              {/*<MDTypography variant="body2" color="text" ml={1} fontWeight="regular">*/}
              {/*  Name teste*/}
              {/*</MDTypography>*/}
              {/*<MDBox mb={2} width="100%">*/}
              {/*  <MDInput*/}
              {/*    type="name"*/}
              {/*    fullWidth*/}
              {/*    name="name"*/}
              {/*    value={user.name}*/}
              {/*    onChange={changeHandler}*/}
              {/*    error={errors.nameError}*/}
              {/*  />*/}
              {/*  {errors.nameError && (*/}
              {/*    <MDTypography variant="caption" color="error" fontWeight="light">*/}
              {/*      The name can not be null*/}
              {/*    </MDTypography>*/}
              {/*  )}*/}
              {/*</MDBox>*/}
            {/*</MDBox>*/}
            {/*<MDBox*/}
            {/*  display="flex"*/}
            {/*  flexDirection="column"*/}
            {/*  alignItems="flex-start"*/}
            {/*  width="100%"*/}
            {/*  ml={2}*/}
            {/*>*/}
              {/*<MDTypography variant="body2" color="text" ml={1} fontWeight="regular">*/}
              {/*  Email*/}
              {/*</MDTypography>*/}
              {/*<MDBox mb={1} width="100%">*/}
              {/*  <MDInput*/}
              {/*    type="email"*/}
              {/*    fullWidth*/}
              {/*    name="email"*/}
              {/*    value={user.email}*/}
              {/*    onChange={changeHandler}*/}
              {/*    error={errors.emailError}*/}
              {/*    disabled={isDemo}*/}
              {/*  />*/}
              {/*  {errors.emailError && (*/}
              {/*    <MDTypography variant="caption" color="error" fontWeight="light">*/}
              {/*      The email must be valid*/}
              {/*    </MDTypography>*/}
              {/*  )}*/}
              {/*</MDBox>*/}
              {isDemo && (
                <MDTypography variant="caption" color="text" fontWeight="light">
                  In the demo version the email can not be updated
                </MDTypography>
              )}
            </MDBox>
          </MDBox>

          {/*<MDBox display="flex" flexDirection="column" mb={3}>*/}
          {/*  <MDBox display="flex" flexDirection="row">*/}
          {/*    <MDBox*/}
          {/*      display="flex"*/}
          {/*      flexDirection="column"*/}
          {/*      alignItems="flex-start"*/}
          {/*      width="100%"*/}
          {/*      mr={2}*/}
          {/*    >*/}
          {/*      <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">*/}
          {/*        New Password*/}
          {/*      </MDTypography>*/}
          {/*      <MDBox mb={2} width="100%">*/}
          {/*        <MDInput*/}
          {/*          type="password"*/}
          {/*          fullWidth*/}
          {/*          name="newPassword"*/}
          {/*          placeholder="New Password"*/}
          {/*          value={user.newPassword}*/}
          {/*          onChange={changeHandler}*/}
          {/*          error={errors.newPassError}*/}
          {/*          disabled={isDemo}*/}
          {/*          inputProps={{*/}
          {/*            autoComplete: "new-password",*/}
          {/*            form: {*/}
          {/*              autoComplete: "off",*/}
          {/*            },*/}
          {/*          }}*/}
          {/*        />*/}
          {/*        {errors.newPassError && (*/}
          {/*          <MDTypography variant="caption" color="error" fontWeight="light">*/}
          {/*            The password must be of at least 8 characters*/}
          {/*          </MDTypography>*/}
          {/*        )}*/}
          {/*      </MDBox>*/}
          {/*    </MDBox>*/}
          {/*    <MDBox*/}
          {/*      display="flex"*/}
          {/*      flexDirection="column"*/}
          {/*      alignItems="flex-start"*/}
          {/*      width="100%"*/}
          {/*      ml={2}*/}
          {/*    >*/}
          {/*      <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">*/}
          {/*        Password Confirmation*/}
          {/*      </MDTypography>*/}
          {/*      <MDBox mb={1} width="100%">*/}
          {/*        <MDInput*/}
          {/*          type="password"*/}
          {/*          fullWidth*/}
          {/*          name="confirmPassword"*/}
          {/*          placeholder="Confirm Password"*/}
          {/*          value={user.confirmPassword}*/}
          {/*          onChange={changeHandler}*/}
          {/*          error={errors.confirmPassError}*/}
          {/*          disabled={isDemo}*/}
          {/*          inputProps={{*/}
          {/*            autoComplete: "confirmPassword",*/}
          {/*            form: {*/}
          {/*              autoComplete: "off",*/}
          {/*            },*/}
          {/*          }}*/}
          {/*        />*/}
          {/*        {errors.confirmPassError && (*/}
          {/*          <MDTypography variant="caption" color="error" fontWeight="light">*/}
          {/*            The password confirmation must match the current password*/}
          {/*          </MDTypography>*/}
          {/*        )}*/}
          {/*      </MDBox>*/}
          {/*      {isDemo && (*/}
          {/*        <MDTypography variant="caption" color="text" ml={1} fontWeight="light">*/}
          {/*          In the demo version the password can not be updated*/}
          {/*        </MDTypography>*/}
          {/*      )}*/}
          {/*    </MDBox>*/}
          {/*  </MDBox>*/}
          {/*  <MDBox mt={4} display="flex" justifyContent="end">*/}
          {/*    <MDButton variant="gradient" color="info" type="submit">*/}
          {/*      Save changes*/}
          {/*    </MDButton>*/}
          {/*  </MDBox>*/}
          {/*</MDBox>*/}
        </MDBox>
      </HeaderEmpresa>
      <Footer />
    </DashboardLayout>
  );
};

export default EmpresaFormulario;
