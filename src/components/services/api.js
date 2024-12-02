import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  /// teste

  //baseURL: "http://192.168.18.11:8080/api/",
  baseURL: "localhost/api/",

});

api.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user && user.token) {
        config.headers["Authorization"] = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

 api.interceptors.response.use(
 
  (response) => response,
  async (error) => {
    if (error.response) {
      if (error.response.status === 401 ) {
        localStorage.removeItem("user");

        toast.error("Sessão expirada. Faça login novamente.");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
