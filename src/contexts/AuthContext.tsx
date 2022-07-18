import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { api } from "@/services/axios";
import { User } from "@/types/User";
import { AxiosError } from "axios";

type SignInCredentials = {
  username: string;
  password: string;
};

interface AuthContextType {
  signIn(credentials: SignInCredentials): Promise<void>;
  loading: boolean;
  error: AxiosError<unknown, any> | undefined;
  user?: User;
}
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function signOut() {
  destroyCookie(undefined, "next.access_token", { path: "/" });
  Router.reload();
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();

  const getUser = useCallback(() => {
    const { "next.access_token": access_token } = parseCookies();

    //get user info
    if (access_token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      api
        .get<User>("/user")
        .then((response) => {
          setUser(response?.data);
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  //sign function
  async function signIn({ username, password }: SignInCredentials) {
    try {
      setLoading(true);
      setError(undefined);

      const response = await api.post("/auth/login", {
        username,
        password,
      });
      const { access_token } = response?.data;

      setCookie(undefined, "next.access_token", access_token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: "/",
      });
      // setCookie(undefined, "next.refreshToken", refreshToken, {
      //   maxAge: 60 * 60 * 24 * 30, //30 days
      //   path: "/",
      // });

      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      getUser();

      Router.push("/dashboard");
    } catch (error) {
      const err = error as AxiosError;
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        loading,
        error,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
