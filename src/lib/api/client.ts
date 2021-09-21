import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/dist/client/router";
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
    // const router = useRouter();
    // if(!config.headers){
    //   router.push()
    // }
    // console.log(config.headers);
    // return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default client;
