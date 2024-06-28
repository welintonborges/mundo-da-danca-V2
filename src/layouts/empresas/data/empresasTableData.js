
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import {useEffect, useState} from "react";
import CadastroService from "../../../services/cadastro-service";
import * as React from "react";

export default function data() {
  // listargem
  const [empresas, setEmpresas] = useState([]);

  const getEmpresas = async () => {
      console.log("getEmpresas")
    const response = await CadastroService.getEmpresas();
    console.log(response)
    setEmpresas(response);

  };


  useEffect(() => {
      getEmpresas();
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

  const rows = empresas.map((empresas) => ({
    nome: <Author image={empresas.thumbnail_url != null ? empresas.thumbnail_url : team3} name={empresas.razao_social} sobrenome={empresas.nome_fantasia} email={empresas.email} />,
      telefone: <Job title={empresas.id} description="" />,
    status: (
        <MDBox ml={-1}>
          <MDBadge  badgeContent="teste" color="success" variant="gradient" size="sm" />
        </MDBox>
    ),
      cnpjcpf: (
        <MDTypography  component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {empresas.numero_Documento}
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
      { Header: "Telefone", accessor: "telefone", align: "left" },
      { Header: "CNPJ/CPF", accessor: "cnpjcpf", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Ação", accessor: "acao", align: "center" },
    ],
    rows,
  };
}