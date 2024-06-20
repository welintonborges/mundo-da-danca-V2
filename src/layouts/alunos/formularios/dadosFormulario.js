import {Typography} from "@mui/material";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDInput from "../../../components/MDInput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import Stack from '@mui/material/Stack';

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
                    <MDBox display="flex" flexDirection="row">
                        <Stack width="100%"
                               direction={{xs: 'column', sm: 'row'}}
                               spacing={{xs: 1, sm: 1, md: 1}}
                        >
                            <MDBox
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                width="100%"
                                mr={2}
                            >

                                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                    Endereço
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
                                mr={2}
                            >
                                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                    Cidade
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
                        </Stack>
                    </MDBox>

                    <MDBox display="flex" flexDirection="column" mb={3}>
                        <MDBox display="flex" flexDirection="row">
                            <Stack width="100%"
                                   direction={{xs: 'column', sm: 'row'}}
                                   spacing={{xs: 1, sm: 1, md: 1}}
                            >
                                <MDBox
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-start"
                                    width="100%"
                                    mr={2}
                                >
                                    <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                                        Estado
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
                                        CEP
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
                            </Stack>
                        </MDBox>
                    </MDBox>
                </React.Fragment>
            </form>
        </section>
    )
}

export default DadosFormulario;