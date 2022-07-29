import { signOut } from "@/contexts/AuthContext";
import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";

export const api = axios.create({
  baseURL: "https://deals-cms-server.herokuapp.com/api",
});

//handle set token in every request
api.interceptors.request.use((config) => {
  const { "deals.access_token": access_token } = parseCookies();
  if (config.headers) {
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  }
});

//handle unauthorized error and logout
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (responseError: AxiosError) => {
    if (responseError.response?.status === 401) {
      signOut();
    }
  }
);
