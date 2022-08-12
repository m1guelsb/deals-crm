import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import Router from "next/router";
import { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { api } from "@/services/axios";
import { useQueryPost } from "@/hooks/api/useQueryPost";
import { useToast } from "@/hooks/helpers/useToast";
import { signOut } from "@/utils/functions/signOut";
import type { User } from "@/types";

type SignInCredentials = {
  username: string;
  password: string;
};

interface AuthContextType {
  signIn(credentials: SignInCredentials): void;
  loading: boolean;
  error: AxiosError<unknown, any> | null;
  user?: User;
}
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const { newToast } = useToast();

  const {
    post: postCredentials,
    isLoading,
    error,
  } = useQueryPost<SignInCredentials, { access_token: string }>({
    url: "/auth/login",
  });

  //signin fn
  const signIn = useCallback(
    ({ username, password }: SignInCredentials) => {
      postCredentials(
        { password, username },
        {
          onSuccess({ data: { access_token } }) {
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
                  title: "Error on get user info.",
                  duration: 3000,
                })
              );
          },
          onError(error) {
            if (error?.response?.status === 401) {
              newToast({
                styleType: "error",
                title: "Wrong credentials!",
                duration: 3000,
              });
            } else
              newToast({
                styleType: "error",
                title: "Unexpected error, try again.",
                duration: 3000,
              });
          },
        }
      );
    },
    [newToast, postCredentials]
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
        loading: isLoading,
        error: error,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
