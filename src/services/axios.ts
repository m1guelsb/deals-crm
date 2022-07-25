import axios from "axios";

export const api = axios.create({
  baseURL: "https://deals-cms-server.herokuapp.com/api",
});
