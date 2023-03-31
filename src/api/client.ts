import axios, { AxiosRequestConfig } from "axios";
import cookie from "react-cookies";

const client = axios.create({
  baseURL: API_DOMAIN,
});

client.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = cookie.load("x-access-token");

    const Config = config;
    if (token) {
      Config.headers["x-access-token"] = token;
    }
    return Config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default client;
