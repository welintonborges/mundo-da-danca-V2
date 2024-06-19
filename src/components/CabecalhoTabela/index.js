import Grid from "@mui/material/Grid";
import MDTypography from "../MDTypography";
import MDButton from "../MDButton";
import SendIcon from "@mui/icons-material/Add";
import MDBox from "../MDBox";


const  CabecalhoTabela = (props) =>{
    return (
    <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
    >
        <Grid container spacing={3} justifyContent="left" >
            <Grid variant="h6" color="white" item xs={10}>
                <MDTypography  color="white">
                    {props.title}
                </MDTypography>
            </Grid>
            <Grid item >
                <MDButton
                    placement="right"
                    variant="gradient"
                    color="info"
                    type="button"
                    endIcon={<SendIcon />}
                    // to="/empresa-formulario"
                    href={props.url}
                    // onClick={handleLogOut}
                >
                    {props.nome_botao}
                </MDButton>
            </Grid>
        </Grid>
    </MDBox>
    )
}

export  default CabecalhoTabela;