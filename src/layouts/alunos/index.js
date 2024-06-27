// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import SendIcon from "@mui/icons-material/Add";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import alunosTableData from "layouts/alunos/data/alunosTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import CabecalhoTabela from "../../components/CabecalhoTabela";


function Alunos() {
    const {columns, rows} = alunosTableData();
    // const {columns: pColumns, rows: pRows} = projectsTableData();

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <CabecalhoTabela
                                title="Aluno"
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
                </Grid>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default Alunos;
