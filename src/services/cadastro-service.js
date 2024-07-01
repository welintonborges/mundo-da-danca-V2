import HttpService from "./htttp.service";
import APP_API_URL from "Api/api";

const API_URL = APP_API_URL;

class CadastroService {
  getAlunos = () => {
    const getAlunos = '/dashboardShowProfessor';
    return  API_URL.get(getAlunos)
        .then(response => response.data)
        .catch(error => error);
  };
  getEmpresas = () => {
    const getEmpresas = '/dashboardShowEscola';
    return  API_URL.get(getEmpresas)
        .then(response =>  response.data)
        .catch(error => error);
  }
  getCep = (cep) => {
     return fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          return data;
    })
  }
  postEmpresa =  (empresa, id_usuario) => {
    const postEmpresa = '/escola';
    return API_URL.post(postEmpresa, empresa, {
      headers: {
        id_usuario: id_usuario
      }
    })
        .then(response =>  response.data.id)
        .catch(error => error)
  }
  putEmpresa =  (empresa) => {
    console.log("putEmpresa ==> ", empresa)
    const putEmpresa = '/escola';
    return API_URL.put(putEmpresa, empresa)
        .then(response =>  response.data)
        .catch(error => error)
  }
  deleteEmpresa =  (id_empresa) => {
    console.log("putEmpresa ==> ", id_empresa)
    const deleteEmpresa = '/escola';
    return API_URL.delete(deleteEmpresa, {
      headers: {
        id: id_empresa
      }
    })
        .then(response =>  response.data.id)
        .catch(error => error)
  }
  postFoto =  (foto) => {
    const imagem = new FormData();
    imagem.append('thumbnail', foto.thumbnail);
    imagem.append('id_pai', foto.id_pai);
    imagem.append('data_gravacao', foto.data_gravacao,)
    const postImage = '/imagem';
    return API_URL.post(postImage, imagem)
        .then(response => response.data)
        .catch(error => error)
  }
  posEndereco =  (endereco) => {
    const postImage = '/endereco';
    return API_URL.post(postImage, endereco)
        .then(response => response.data)
        .catch(error => error)
  }
  putEndereco =  (endereco) => {
    console.log("putEndereco ==> ", endereco)
    const putEndereco = '/endereco';
    return API_URL.put(putEndereco, endereco)
        .then(response =>  response)
        .catch(error => error)
  }
}

export default new CadastroService();
