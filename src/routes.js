

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import UserProfile from "layouts/user-profile";
import UserManagement from "layouts/user-management";

import Login from "auth/login";
import Register from "auth/register";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";

// @mui icons
import Icon from "@mui/material/Icon";
import Empresas from "./layouts/empresas";
import EmpresaFormulario from "./layouts/empresas/formularios";
import Alunos from "./layouts/alunos";
import AlunoFormulario from "./layouts/alunos/formularios";
import Funcionarios from "./layouts/funcionarios";
import FuncionarioFormulario from "./layouts/funcionarios/formularios";
import Turmas from "./layouts/turmas";
import Turma from "./layouts/turmas";
import TurmaFormulario from "./layouts/turmas/formularios";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,

  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  {
    type: "collapse",
    name: "Aluno",
    key: "aluno",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/aluno",
    component: <Alunos />,
  },
  {
    name: "Cadastro de aluno",
    key: "formulario-aluno",
    route: "/formulario-aluno",
    component: <AlunoFormulario />,
  },
  {
    type: "collapse",
    name: "Funcionario",
    key: "funcionario",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/funcionario",
    component: <Funcionarios />,
  },
  {
    name: "Cadastro de funcionario",
    key: "formulario-funcionario",
    route: "/formulario-funcionario",
    component: <FuncionarioFormulario />,
  },
  {
    type: "collapse",
    name: "Empresa",
    key: "empresa",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/empresa",
    component: <Empresas/>,
  },
  {
    name: "Cadastro de empresa",
    key: "formularios",
    route: "/formulario-empresa",
    component: <EmpresaFormulario />,
  },
  {
    type: "collapse",
    name: "Turma",
    key: "turma",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/turma",
    component: <Turma/>,
  },
  {
    name: "Cadastro de turma",
    key: "formularios",
    route: "/formulario-turma",
    component: <TurmaFormulario />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "examples",
    name: "Perfil",
    key: "user-profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/user-profile",
    component: <UserProfile />,
  },
  {
    type: "examples",
    name: "User Management",
    key: "user-management",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/user-management",
    component: <UserManagement />,
    submenu: [
      {
        title: "submenu 1",
        route: "/submenu1",
      },
      {
        title: "submenu 2",
        route: "/submenu2",
      },
    ],
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "auth",
    name: "Login",
    key: "login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/auth/login",
    component: <Login />,
  },
  {
    type: "auth",
    name: "Register",
    key: "register",
    icon: <Icon fontSize="small">reigster</Icon>,
    route: "/auth/register",
    component: <Register />,
  },
  {
    type: "auth",
    name: "Forgot Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/forgot-password",
    component: <ForgotPassword />,
  },
  {
    type: "auth",
    name: "Reset Password",
    key: "reset-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/reset-password",
    component: <ResetPassword />,
  },
];

export default routes;
