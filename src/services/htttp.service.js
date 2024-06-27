import Axios from "axios";
import APP_API_URL from "Api/api"


const API_URL = APP_API_URL;
Axios.defaults.baseURL = API_URL;

export class HttpService {
  _axios = Axios.create();

  addRequestInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.request.use(onFulfilled, onRejected);
  };

  addResponseInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.response.use(onFulfilled, onRejected);
  };


  get = async (url, data) => await this.request(this.getOptionsConfig("get", url, data));

  post = async (url) => await this.request(this.getOptionsConfig("post", url));

  put = async (url, data) => await this.request(this.getOptionsConfig("put", url, data));

  patch = async (url, data) => await this.request(this.getOptionsConfig("patch", url, data));

  delete = async (url) => await this.request(this.getOptionsConfig("delete", url));

  getOptionsConfig = (method, url, data) => {
    console.log("url==> ", url)
    console.log("data==> ", data)
    return {
      method,
      url,
      data,
      headers: { "Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json", 'Access-Control-Allow-Credentials': true },
    };
  };

  request(options) {
    return new Promise((resolve, reject) => {
      this._axios
        .request(options)
        .then((res) => resolve(res))
        .catch((ex) => reject(ex.response));
    });
  }
}

export default new HttpService();
