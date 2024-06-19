import {Typography} from "@mui/material";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDInput from "../../components/MDInput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";

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
                    <Typography variant="h6" gutterBottom>
                    </Typography>
                    <Typography sx={{mt: 2, mb: 2}}>
                        <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
                            <MDBox
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                width="100%"
                                mr={2}
                            >
                                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                    Nome
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
                                    Telefone
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
                                        E-mail
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
                                        Razão social
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

                    </Typography>
                    {/*<Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>*/}
                    {/*    <Box sx={{flex: '1 1 auto'}}/>*/}
                    {/*    /!* <Button onClick={handleReset}>Reset</Button> *!/*/}

                    {/*    <Button onClick={handleNext}>*/}
                    {/*        {activeStep === steps.length - 1 ? 'Finish' : 'Proximar'}*/}
                    {/*    </Button>*/}
                    {/*</Box>*/}
                </React.Fragment>
            </form>
        </section>
    )
}

export default DadosFormulario;