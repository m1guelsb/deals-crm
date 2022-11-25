import axios, { AxiosError } from "axios";
import { signOut } from "@/utils/functions";
import { parseCookies } from "nookies";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

//handle set token in every request
api.interceptors.request.use((reqConfig) => {
  const { "deals.access_token": access_token } = parseCookies();
  if (reqConfig.headers && access_token) {
    reqConfig.headers.Authorization = `Bearer ${access_token}`;
    return reqConfig;
  }
  return reqConfig;
});

//handle unauthorized error and logout
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (responseError: AxiosError) => {
    if (responseError.response?.status === 401) {
      signOut();
      return Promise.reject(responseError);
    }
    return Promise.reject(responseError);
  }
);
