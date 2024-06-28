import Grid from "@mui/material/Grid";
import MDTypography from "../MDTypography";
import MDButton from "../MDButton";

import MDBox from "../MDBox";
import Botao from "../Botao";
import SendIcon from "@mui/icons-material/Add";


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
            <Botao
                color="info"
                nome_botao="novo"
                url={props.url}
                endIcon={<SendIcon />}
            />
        </Grid>
    </MDBox>
    )
}

export  default CabecalhoTabela;