
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
import CheckIcon from "@mui/icons-material/Check";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Botao from "../../../components/Botao";
import MDButton from "../../../components/MDButton";
import IconButton from "@mui/material/IconButton";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Dialog} from "@mui/material";
import cadastroService from "../../../services/cadastro-service";
import MDAlert from "../../../components/MDAlert";



export default function data(props) {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState([]);
  const [open, setOpen] = React.useState(false);

  const getEmpresas = async () => {
    const response = await CadastroService.getEmpresas();
    setEmpresas(response);
  };

    const editar = (empresa) => {
        var empresaSelecionada = JSON.stringify(empresa);
        localStorage.setItem('empresaSelecionada', empresaSelecionada);
        navigate('/formulario-empresa', { replace: true });
    }

    const deletar = (id_empresa) => {
        cadastroService.deleteEmpresa(id_empresa);
        var excluir = JSON.stringify("excluido");
        localStorage.setItem('exluido', excluir);
        getEmpresas();
    }

  useEffect(() => {
      getEmpresas();
  },[]);

  const Author = ({ image, name, sobrenome, email}) => (
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

  const rows = empresas?.map((empresa) => ({
    nome: <Author image={empresa.thumbnail_url != null ? empresa.thumbnail_url : team3}
                  name={empresa.razao_social}
                  sobrenome={empresa.nome_fantasia}
                  email={empresa.email} />,
      telefone: <Job title={empresa.id} description="" />,
    status: (
        <MDBox ml={-1}>
          <MDBadge  badgeContent="teste" color="success" variant="gradient" size="sm" />
        </MDBox>
    ),
      cnpjcpf: (
        <MDTypography  component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {empresa.numero_Documento}
        </MDTypography>
    ),
    acao: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <IconButton
                color="info"
                aria-label="editar"
                onClick={() => editar(empresa)}

            >
                <CreateIcon />
            </IconButton>
            <IconButton
                color="primary"
                aria-label="delete"
                onClick={() => deletar(empresa.id_escola)}
            >
                <DeleteIcon />
            </IconButton>
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