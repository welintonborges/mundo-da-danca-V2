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
import CabecalhoTabela from "../../components/CabecalhoTabela";


function Funcionarios() {
    const {columns, rows} = empresasTableData();
    const {columns: pColumns, rows: pRows} = projectsTableData();

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <CabecalhoTabela
                                title="Funcionarios"
                                nome_botao="novo"
                                url="/formulario-funcionario"
                                endIcon={<SendIcon />}
                            />
                            <MDBox pt={3}>
                                <DataTable
                                    table={{columns, rows}}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*  <Card>*/}
                    {/*    <MDBox*/}
                    {/*      mx={2}*/}
                    {/*      mt={-3}*/}
                    {/*      py={3}*/}
                    {/*      px={2}*/}
                    {/*      variant="gradient"*/}
                    {/*      bgColor="info"*/}
                    {/*      borderRadius="lg"*/}
                    {/*      coloredShadow="info"*/}
                    {/*    >*/}
                    {/*      <MDTypography variant="h6" color="white">*/}
                    {/*        Projects Table*/}
                    {/*      </MDTypography>*/}
                    {/*    </MDBox>*/}
                    {/*    <MDBox pt={3}>*/}
                    {/*      <DataTable*/}
                    {/*        table={{ columns: pColumns, rows: pRows }}*/}
                    {/*        isSorted={false}*/}
                    {/*        entriesPerPage={false}*/}
                    {/*        showTotalEntries={false}*/}
                    {/*        noEndBorder*/}
                    {/*      />*/}
                    {/*    </MDBox>*/}
                    {/*  </Card>*/}
                    {/*</Grid>*/}
                </Grid>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default Funcionarios;
