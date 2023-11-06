import { createContext, ReactNode, useCallback, useEffect } from "react";
import Router from "next/router";
import { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { useToast } from "@/hooks/helpers/useToast";
import { signOut } from "@/utils/functions";
import type { User } from "@/types";
import { useQueryGet } from "@/hooks/react-query/useQueryGet";
import { useQueryPost } from "@/hooks/react-query";

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

interface AuthContextType {
  signIn(credentials: SignInCredentials): void;
  signinLoading: boolean;
  signinError: AxiosError<unknown, any> | null;
  signUp(credentials: SignUpCredentials): void;
  signupLoading: boolean;
  signupError: AxiosError<unknown, any> | null;

  user?: User;
}
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const { newToast } = useToast();

  const {
    post: signinPost,
    isLoading: signinLoading,
    error: signinError,
  } = useQueryPost<SignInCredentials, { access_token: string }>({
    url: "/auth/signin",
  });

  const {
    post: signupPost,
    isLoading: signupLoading,
    error: signupError,
  } = useQueryPost<SignUpCredentials, { access_token: string }>({
    url: "/auth/signup",
  });

  const { data: user, refetch: getUser } = useQueryGet<User>({
    url: "/users/me",
    queryKeys: ["user-data"],
    queryConfigs: { enabled: false },
  });

  //signin fn
  const signIn = useCallback(
    ({ email, password }: SignInCredentials) => {
      signinPost(
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
    [getUser, newToast, signinPost]
  );

  //signup fn
  const signUp = useCallback(
    ({ name, email, password }: SignUpCredentials) => {
      signupPost(
        { data: { name, email, password } },
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
                title: "Error on retrieving user account",
                duration: 3000,
              })
            );
          },
          onError(error) {
            if (error?.response?.status === 403) {
              newToast({
                styleType: "error",
                title: "Email already registered",
                duration: 3000,
              });
            }

            newToast({
              styleType: "error",
              title: "Unexpected error, try again.",
              duration: 3000,
            });
          },
        }
      );
    },
    [getUser, newToast, signupPost]
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
        signinLoading,
        signinError,
        signUp,
        signupLoading,
        signupError,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
