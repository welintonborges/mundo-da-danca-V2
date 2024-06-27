import HttpService from "./htttp.service";
import APP_API_URL from "Api/api";

const API_URL = APP_API_URL;

class CadastroService {
  getAlunos = () => {
    const getAlunos = '/dashboardShowProfessor';
    return  API_URL.get(getAlunos)
        .then(response => response.data)
        .catch(error => error);
  }
  //
  // login = async (payload) => {
  //   const loginEndpoint = 'login';
  //   return await HttpService.post(loginEndpoint, payload);
  // };
  //
  register = async (credentials) => {
    const registerEndpoint = 'register';
    return await HttpService.post(registerEndpoint, credentials);
  };
  //
  // logout = async () => {
  //   const logoutEndpoint = 'logout';
  //   return await HttpService.post(logoutEndpoint);
  // };
  //
  // forgotPassword = async (payload) => {
  //   const forgotPassword = 'password-forgot';
  //   return await HttpService.post(forgotPassword, payload);
  // }
  //
  // resetPassword = async (credentials) => {
  //   const resetPassword = 'password-reset';
  //   return await HttpService.post(resetPassword, credentials);
  // }
  //
  //
  //
  // updateProfile = async (newInfo) => {
  //   const updateProfile = "me";
  //   return await HttpService.patch(updateProfile, newInfo);
  // }
}

export default new CadastroService();
