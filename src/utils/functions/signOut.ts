import Router from "next/router";
import { destroyCookie } from "nookies";

export const signOut = () => {
  destroyCookie(undefined, "deals.access_token", { path: "/" });
  Router.push("/");
};
