import MDButton from "../MDButton";
import Grid from "@mui/material/Grid";


const Botao =(props) =>{
    return(
        <Grid item >
            <MDButton
                startIcon={props.startIcon}
                variant="gradient"
                color={props.color}
                type="button"
                endIcon={props.endIcon}
                // to="/empresa-formulario"
                href={props.url}
                onClick={props.onClick}
            >
                {props.nome_botao}
            </MDButton>
        </Grid>
    )
}
export default Botao;