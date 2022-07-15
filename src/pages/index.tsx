import { useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { AuthContext, signOut } from "@/contexts/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "@/utils/validations/yup";

interface SignInFormInputs {
  username: string;
  password: string;
}
const SignIn: NextPage = () => {
  const { signIn, user, loading, error } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormInputs>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldUseNativeValidation: false,
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormInputs> = async ({
    username,
    password,
  }) => {
    await signIn({ username, password });
    reset();
  };

  return (
    <div>
      <Head>
        <title>Title</title>
      </Head>
      <h1>Hello Word! :) </h1>

      <div>
        <h1>Signin Form {loading && "[LOADING]"}</h1>
        {user && (
          <>
            <span>Welcome</span> <b>{user?.username}</b>
          </>
        )}
        <form className="login-form" onSubmit={handleSubmit(handleSignIn)}>
          <input placeholder="Username" {...register("username")} />
          <input placeholder="Password" {...register("password")} />
          <button className="signin-btn" type="submit">
            Sign In
          </button>
        </form>
        {user && (
          <button className="signout-btn" onClick={signOut}>
            Sign Out
          </button>
        )}
        {error?.response?.status === 401 && (
          <span>Incorrect username or password</span>
        )}
      </div>
    </div>
  );
};

export default SignIn;
