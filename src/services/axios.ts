import axios from "axios";
import { parseCookies } from "nookies";

const { "deals.access_token": access_token } = parseCookies();

export const api = axios.create({
  baseURL: "https://deals-cms-server.herokuapp.com/api",
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});
