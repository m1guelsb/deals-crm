import { createContext, ReactNode, useCallback, useEffect } from "react";
import Router from "next/router";
import { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { useToast } from "@/hooks/helpers/useToast";
import { signOut } from "@/utils/functions";
import type { User } from "@/types";
import { useQueryGet } from "@/hooks/react-query/useQueryGet";
import { useQueryPost } from "@/hooks/react-query";

type SignInCredentials = {
  email: string;
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
  const { newToast } = useToast();

  const {
    post: postCredentials,
    isLoading,
    error,
  } = useQueryPost<SignInCredentials, { access_token: string }>({
    url: "/auth/signin",
  });

  const { data: user, refetch: getUser } = useQueryGet<User>({
    url: "/users/me",
    queryKeys: ["user-data"],
    queryConfigs: { enabled: false },
  });

  //signin fn
  const signIn = useCallback(
    ({ email, password }: SignInCredentials) => {
      postCredentials(
        { data: { email, password } },
        {
          onSuccess({ data: { access_token } }) {
            setCookie(undefined, "deals.access_token", access_token, {
              maxAge: 60 * 60 * 24 * 30, //30 days
              path: "/",
            });

            Router.push("/app");

            getUser().catch(() =>
              newToast({
                styleType: "error",
                title: "Error on get user info.",
                duration: 3000,
              })
            );
          },
          onError(error) {
            if (error?.response?.status === 403) {
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
    [getUser, newToast, postCredentials]
  );

  //handle get user
  useEffect(() => {
    const { "deals.access_token": access_token } = parseCookies();

    if (access_token) {
      getUser().catch(() => signOut());
    }
  }, [getUser]);

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
