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
import { AxiosError, HeadersDefaults } from "axios";
import { usePOST } from "@/hooks/api/usePOST";
import { useToast } from "@/hooks/helpers/useToast";
import type { User } from "@/types/User";

type SignInCredentials = {
  username: string;
  password: string;
};

interface AuthContextType {
  signIn(credentials: SignInCredentials): void;
  loading: boolean;
  error: AxiosError<unknown, any> | undefined;
  user?: User;
}
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export const signOut = () => {
  destroyCookie(undefined, "deals.access_token", { path: "/" });
  Router.push("/");
};
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const { newToast } = useToast();

  //handle signin post
  const { loading, error, POST } = usePOST<
    { access_token: string },
    SignInCredentials
  >({
    onSuccess: async ({ data: { access_token } }) => {
      setCookie(undefined, "deals.access_token", access_token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: "/",
      });

      Router.push("/app");

      api
        .get<User>("/user")
        .then(({ data: User }) => setUser(User))
        .catch(() =>
          newToast({
            styleType: "error",
            title: "An unknown error has occurred",
            duration: 3000,
          })
        );
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        newToast({
          styleType: "error",
          title: "Wrong credentials!",
          duration: 3000,
        });
      } else
        newToast({
          styleType: "error",
          title: "An unknown error has occurred",
          duration: 3000,
        });
    },
  });

  //signin fn
  const signIn = useCallback(
    ({ username, password }: SignInCredentials) =>
      POST("/auth/login", { username, password }),
    [POST]
  );

  //handle get user
  useEffect(() => {
    const { "deals.access_token": access_token } = parseCookies();

    if (access_token) {
      api
        .get<User>("/user")
        .then(({ data: User }) => setUser(User))
        .catch(() => signOut());
    }
  }, []);

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
