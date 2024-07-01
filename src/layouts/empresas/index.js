// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import empresasTableData from "layouts/empresas/data/empresasTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import MDButton from "../../components/MDButton";
import SendIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import CabecalhoTabela from "../../components/CabecalhoTabela";
import * as React from "react";
import MDAlert from "../../components/MDAlert";
import {useState} from "react";

function Empresas(props) {
    const {columns, rows, validar} = empresasTableData();
    const [notification, setNotification] = useState(false);
    const exluido = JSON.parse(localStorage.getItem('exluido'));

    if(exluido != null){
        setNotification(true);
        localStorage.clear();
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            {notification && (
                <MDAlert color="info" dismissible mt="20px">
                    <MDTypography variant="body2" color="white">
                        Empresa excluida com sucesso!!
                    </MDTypography>
                </MDAlert>
            )}
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <CabecalhoTabela
                                title="Empresas"
                                url="/formulario-empresa"
                            />
                            <MDBox pt={3}>
                                <DataTable validar={validar}
                                           table={{columns, rows}}
                                           isSorted={false}
                                           entriesPerPage={false}
                                           showTotalEntries={false}
                                           noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default Empresas;
