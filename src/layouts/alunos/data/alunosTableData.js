
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import camera from "assets/images/camera.svg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import {useEffect, useState} from "react";
import AuthService from "../../../services/auth-service";
import CadastroService from "../../../services/cadastro-service";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import * as React from "react";

export default function data() {
    // listargem
    const [alunos, setAlunos] = useState([]);

    const getAlunos = async () => {
        const response = await CadastroService.getAlunos();
        console.log(response)
        setAlunos(response);

    };


    useEffect(() => {
        getAlunos();
    },[]);

  const Author = ({ image, name, sobrenome, email }) => (

    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name} {sobrenome}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

    const rows = alunos.map((aluno) => ({
        nome: <Author image={aluno.thumbnail_url != null ? aluno.thumbnail_url : team3} name={aluno.nome} sobrenome={aluno.sobrenome}  email={aluno.email} />,
        function: <Job title={aluno.funcao} description={aluno.descricao} />,
        status: (
            <MDBox ml={-1}>
                <MDBadge badgeContent={aluno.status} color="success" variant="gradient" size="sm" />
            </MDBox>
        ),
        employed: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                {aluno.dataAdmissao}
            </MDTypography>
        ),
        acao: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                Edit
            </MDTypography>
        ),
    }));

    return {
        columns: [
            { Header: "Nome", accessor: "nome", width: "45%", align: "left" },
            { Header: "function", accessor: "function", align: "left" },
            { Header: "status", accessor: "status", align: "center" },
            { Header: "employed", accessor: "employed", align: "center" },
            { Header: "Ação", accessor: "acao", align: "center" },
        ],
        rows,
    };
}